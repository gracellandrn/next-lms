import { Card, CardBody } from "@heroui/card";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

import serverAuth from "@/libs/server-auth";
import { CourseServices } from "@/services/course.services";

export default async function Page() {
  const auth = await serverAuth();

  if (!auth) {
    redirect("/login");
  }

  const userCourses = await CourseServices.getUserCourse(auth.id);

  return (
    <main className="m-auto max-w-2xl space-y-6 py-12">
      <section className="space-y-1">
        <h3>My Courses</h3>
        <p className="font-medium text-slate-400">All Courses you enrolled</p>
      </section>
      <section>
        {userCourses.map(({ course }) => {
          return (
            <Link
              key={course.id}
              href={`/dashboard/my-courses/${course.slug}`}
              className="block"
            >
              <Card>
                <CardBody>
                  <div>
                    <Image
                      src={`${process.env.R2_PUBLIC_URL}/next-lms/courses/${course.id}/${course.coverImage}`}
                      alt={course.title}
                      width={1000}
                      height={500}
                    />
                  </div>
                  <h4>{course.title}</h4>
                  <p>{course.description}</p>
                </CardBody>
              </Card>
            </Link>
          );
        })}

        {userCourses.length === 0 && (
          <Card className="text-balance bg-slate-50 text-center">
            <CardBody>
              <h5>You have no course</h5>
            </CardBody>
          </Card>
        )}
      </section>
    </main>
  );
}
