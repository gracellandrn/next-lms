"use server";

import z from "zod";
import bcrypt from "bcrypt";
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
    return {
      status: "error",
      errors: inputValidation.error.flatten().fieldErrors,
      data: {
        name,
        email,
        password,
      },
    };
  }

  try {
    const hashPassword = await bcrypt.hash(password, 13);
    await userService.createUser({ name, email, password: hashPassword });
    return {
      status: "success",
      message: "Register success!",
    };
  } catch (error) {
    return {
      status: "error",
      message: "Register failed!",
    };
  }

  console.log(inputValidation);
}
