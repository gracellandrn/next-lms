import { redirect } from "next/navigation";

import { CourseServices } from "@/services/course.services";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const course = await CourseServices.getCourseDetail(slug);

  if (!course) {
    redirect("/dashboard/my-course");
  }

  const firstLesson = course.sections[0].lessons[0].slug;
  redirect(`/dashboard/my-courses/${course.slug}/${firstLesson}`);
}
