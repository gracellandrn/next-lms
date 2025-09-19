"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/utils/prisma";

export async function updateSectionIndex(formData: FormData) {
  const courseId = formData.get("courseId") as string;
  const sourceIndex = Number(formData.get("sourceIndex"));
  const destinationIndex = Number(formData.get("destinationIndex"));

  const allSection = await prisma.section.findMany({
    where: {
      courseId,
    },
    orderBy: {
      index: "asc",
    },
  });

  const newSection = [...allSection];
  const [movedSection] = newSection.splice(sourceIndex, 1);
  newSection.splice(destinationIndex, 0, movedSection);

  const updatedSections = newSection.map((section, index) => ({
    ...section,
    index,
  }));

  const updatePromises = updatedSections.map((section) => {
    return prisma.section.update({
      where: {
        id: section.id,
      },
      data: {
        index: section.index,
      },
    });
  });

  await Promise.all(updatePromises);

  revalidatePath("/admin/courses/[slug]", "page");
}
