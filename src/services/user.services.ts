import { User } from "@/generated/prisma";
import { prisma } from "@/utils/prisma";

export const userService = {
  createUser: async (user: Pick<User, "name" | "email" | "password">) => {
    const newUser = await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
      },
    });
    return newUser;
  },
  findUser: async (idOrEmail: string) => {
    const user = await prisma.user.findFirst({
      where: {
        OR: [{ id: idOrEmail }, { email: idOrEmail }],
      },
    });
    return user;
  },
  createVerificationCode: async (userId: string, code: string) => {
    await prisma.verificationCode.create({
      data: {
        userId,
        code,
      },
    });
  },
};
