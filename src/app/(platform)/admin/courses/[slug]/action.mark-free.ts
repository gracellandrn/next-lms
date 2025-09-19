"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/utils/prisma";

export async function markAsPreview(formData: FormData) {
  const lessonId = formData.get("lessonId") as string;

  await prisma.lesson.update({
    where: {
      id: lessonId,
    },
    data: {
      isPreview: true,
    },
  });

  revalidatePath("/admin/courses/[slug]", "page");
}

export async function unmarkAsPreview(formData: FormData) {
  const lessonId = formData.get("lessonId") as string;

  await prisma.lesson.update({
    where: {
      id: lessonId,
    },
    data: {
      isPreview: false,
    },
  });

  revalidatePath("/admin/courses/[slug]", "page");
}
