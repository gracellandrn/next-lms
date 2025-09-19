import { Button } from "@heroui/button";
import Image from "next/image";
import Link from "next/link";

import { CourseServices } from "@/services/course.services";

export default async function Page() {
  const courses = await CourseServices.getAllCourse();
  return (
    <main className="space-y-8">
      <section className="flex items-center justify-between">
        <h3>Courses</h3>
        <Link href="/admin/courses/new">
          <Button>Create Course</Button>
        </Link>
      </section>
      <section className="grid lg:grid-cols-4 md:grid-cols-2 gap-6">
        {courses.map((course) => {
          return (
            <div
              key={course.id}
              className="relative overflow-hidden rounded-xl border bg-wh\ shadow-sm"
            >
              <Image
                src={`${process.env.R2_PUBLIC_URL}/next-lms/courses/${course.id}/${course.coverImage}`}
                alt={course.title}
                width={1000}
                height={500}
              />
              <section className="space-y-3 p-4">
                <div>{course.title}</div>
                <div className="grid grid-cols-2 gap-3">
                  <Link href={`/admin/courses/${course.slug}/stats`}>
                    <Button>Stats</Button>
                  </Link>
                  <Link href={`/admin/courses/${course.slug}`}>
                    <Button>Edit Content</Button>
                  </Link>
                </div>
              </section>
            </div>
          );
        })}
      </section>
    </main>
  );
}
