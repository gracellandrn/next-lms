"use server";
import { redirect } from "next/navigation";
import z from "zod";

import { CourseServices } from "@/services/course.services";
import { uploadFile } from "@/utils/aws";

const courseSchema = z.object({
  title: z.string().min(8),
  description: z.string().min(1),
  price: z.number(),
  coverImage: z.instanceof(File),
});

export async function createCourseAction(_: unknown, formData: FormData) {
  const title = formData.get("title");
  const description = formData.get("description");
  const price = Number(formData.get("price"));
  const coverImage = formData.get("coverImage");

  const validation = courseSchema.safeParse({
    title,
    description,
    price,
    coverImage,
  });

  if (!validation.success) {
    const flatten = z.flattenError(validation.error);
    return {
      status: "error",
      errors: flatten.fieldErrors,
      data: { title, description, price, coverImage },
    };
  }

  const newCourse = await CourseServices.createCourse({
    title: validation.data.title,
    description: validation.data.description,
    price: validation.data.price,
    coverImage: validation.data.coverImage.name,
  });

  if (!newCourse) {
    return {
      status: "error",
      message: "Error creating course",
    };
  }

  // upload file
  await uploadFile({
    key: newCourse.coverImage,
    folder: `courses/${newCourse.id}`,
    body: validation.data.coverImage,
  });

  redirect(`/admin/courses/${newCourse.slug}`);
}
