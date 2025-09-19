"use server";

import { revalidatePath } from "next/cache";

import { CertificateServices } from "@/services/certificate.services";

export async function requestCertificateAction(formData: FormData) {
  const certId = formData.get("certId") as string;

  await CertificateServices.requestCertificate(certId);

  revalidatePath("/dashboard/certificates");
}
