"use server";
import bcrypt from "bcrypt";
import z from "zod";

import { generateverificationCode } from "@/libs/generate-verification-code";
import { emailServices } from "@/services/email.services";
import { userService } from "@/services/user.services";

const registerSchema = z.object({
  name: z.string().min(4),
  email: z.email(),
  password: z.string().min(8),
});

export async function registerAction(prevState: unknown, formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const inputValidation = registerSchema.safeParse({ name, email, password });
  if (!inputValidation.success) {
    const flattened = z.flattenError(inputValidation.error);
    return {
      status: "error",
      // errors: inputValidation.error.flatten().fieldErrors,
      errors: flattened.fieldErrors,
      data: {
        name,
        email,
        password,
      },
    };
  }

  try {
    const hashPassword = await bcrypt.hash(password, 13);
    const user = await userService.createUser({
      name,
      email,
      password: hashPassword,
    });

    const code = generateverificationCode();

    await userService.createVerificationCode(user.id, code);
    await emailServices.sendVerificationCode(user.id, code);

    return {
      status: "success",
      message: "Register success!",
    };
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      message: "Register failed!",
    };
  }

  console.log(inputValidation);
}
