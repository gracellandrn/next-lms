"use server";

import { revalidatePath } from "next/cache";

import { CourseServices } from "@/services/course.services";

export async function addSectionAction(formData: FormData) {
  const courseId = formData.get("courseId") as string;

  await CourseServices.createSection(courseId);

  revalidatePath("/admin/courses/[slug]", "page");
}
