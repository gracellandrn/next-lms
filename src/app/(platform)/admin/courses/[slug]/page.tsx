import { Button } from "@heroui/button";
import { redirect } from "next/navigation";

import { CourseServices } from "@/services/course.services";

import { AddSectionBtn } from "./comp.add-section";
import { LessonEditForm } from "./comp.lesson-edit-form";
import { Sections } from "./comp.section-dnd";
import { SectionEditForm } from "./comp.section-edit-form";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const course = await CourseServices.getCourseDetail(slug);

  if (!course) {
    redirect("/admin/courses");
  }

  return (
    <main className="max-w-2xl m-auto space-y-8">
      <section>
        <h3>{course.title}</h3>
        <p>{course.description}</p>
        <Button variant="bordered">Publish Course</Button>
      </section>
      <section className="space-y-4">
        <AddSectionBtn courseId={course.id} />
        <Sections course={course} />
      </section>
      <LessonEditForm />
      <SectionEditForm />
    </main>
  );
}
