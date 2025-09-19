import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import { redirect } from "next/navigation";

import serverAuth from "@/libs/server-auth";
import { CourseServices } from "@/services/course.services";

import { requestCertificateAction } from "./action.request";
import { DownloadBtn } from "./form.download";

export default async function Page() {
  const auth = await serverAuth();

  if (!auth) {
    redirect("/login");
  }

  const userCourse = await CourseServices.getUserCourse(auth.id);

  return (
    <main className="max-w-2xl m-auto space-y-6 py-12">
      <section className="space-y-1">
        <h3>Certificates</h3>
        <p>Here is your all available certificates</p>
      </section>
      <section className="space-y-6">
        {userCourse.map(({ course }) => {
          return (
            <Card
              key={course.id}
              className="flex items-center gap-6 rounded-xl p-4"
            >
              <CardBody>
                <section></section>
                <section>
                  <h5>{course.title}</h5>
                  <div>
                    {course.certificates.map((certificate) => {
                      return (
                        <div key={certificate.id}>
                          {certificate.status === "APPROVED" && (
                            <DownloadBtn certificateId={certificate.id} />
                          )}
                          {certificate.status === "NO_REQUEST" && (
                            <form action={requestCertificateAction}>
                              <input
                                name="certId"
                                value={certificate.id}
                                type="hidden"
                                required
                              />
                              <Button
                                color="primary"
                                type="submit"
                                size="sm"
                                className="w-fit"
                              >
                                Request Certificate
                              </Button>
                            </form>
                          )}
                          {certificate.status === "UNDER_REVIEW" && (
                            <div>Certificate request under review</div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </section>
              </CardBody>
            </Card>
          );
        })}
        {userCourse.length === 0 && (
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
