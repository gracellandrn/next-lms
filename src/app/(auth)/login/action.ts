"use server";

import bycrypt from "bcrypt";
import z from "zod";

import { userService } from "@/services/user.services";

const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(8, "Password must be at least 8 chars"),
});

export async function loginAction(prevState: unknown, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const validation = loginSchema.safeParse({ email, password });

  if (!validation.success) {
    const flatten = z.flattenError(validation.error);
    return {
      status: "error",
      errors: flatten.fieldErrors,
      data: {
        email,
        password,
      },
    };
  }

  const user = await userService.findUser(email);

  if (!user) {
    return {
      status: "error",
      message: "User not found",
      data: {
        email,
        password,
      },
    };
  }

  if (!user.isVerified) {
    return {
      status: "error",
      message: "Verify your account",
    };
  }

  if (!user.password) {
    return {
      status: "error",
      message:
        "You might create your account with google, please try continue with google",
    };
  }

  const isPasswordMatch = await bycrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    return {
      status: "error",
      message: "invalid Credentials",
      data: {
        email,
        password,
      },
    };
  }

  return {
    status: "success",
    message: "Login success",
  };
}
