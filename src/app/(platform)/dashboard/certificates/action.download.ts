"use server";

import fontkit from "@pdf-lib/fontkit";
import fs from "fs/promises";
import { redirect } from "next/navigation";
import path from "path";
import { PDFDocument, PDFFont, rgb, StandardFonts } from "pdf-lib";

import { uploadFile } from "@/utils/aws";
import { prisma } from "@/utils/prisma";

export async function downloadCertificateAction(
  _: unknown,
  formData: FormData
) {
  const certificateId = formData.get("certificateId") as string;

  const certificate = await prisma.certificate.findFirst({
    where: {
      id: certificateId,
    },
    include: {
      user: true,
      course: true,
    },
  });

  if (!certificate) {
    redirect("/dashboard/certificates");
  }

  //! reading file template
  const certificateTemplatePath = path.resolve(
    "public",
    "CertificateTemplate.pdf"
  );
  const certificateTemplate = await fs.readFile(certificateTemplatePath);
  const fontPath = path.resolve("public", "EBGaramond-SemiBold.ttf");
  const font = await fs.readFile(fontPath);
  const pdfDoc = await PDFDocument.load(certificateTemplate);

  //! first page of PDF
  const page = pdfDoc.getPage(0);
  pdfDoc.registerFontkit(fontkit);
  const customFont = await pdfDoc.embedFont(font);
  const letterSpacing = 1.2;

  //! embed font bawaan
  // const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  //atur ke tengah
  const textName = certificate.user.name;
  const textCourse = certificate.course.title;
  const fontSize = 25;
  // const textWidthName = customFont.widthOfTextAtSize(textName, fontSize);
  const textWidthName = getTextWidthWithSpacing(
    textName,
    customFont,
    fontSize,
    letterSpacing
  );
  const textWidthCourse = getTextWidthWithSpacing(
    textCourse,
    customFont,
    fontSize,
    letterSpacing
  );
  const pageWidth = page.getWidth();
  let xName = (pageWidth - textWidthName) / 2;
  let xCourse = (pageWidth - textWidthCourse) / 2;

  //! modify template
  for (const char of textName) {
    page.drawText(char, {
      x: xName,
      y: 340,
      size: fontSize,
      font: customFont,
      color: rgb(0, 0, 0),
    });
    xName += customFont.widthOfTextAtSize(char, fontSize) + letterSpacing;
  }

  for (const char of textCourse) {
    page.drawText(char, {
      x: xCourse,
      y: 250,
      size: fontSize,
      font: customFont,
      color: rgb(0, 0, 0),
    });
    xCourse += customFont.widthOfTextAtSize(char, fontSize) + letterSpacing;
  }

  //! upload file ke S3
  const pdfBytes = await pdfDoc.save();
  // const certPath = path.resolve("public", "cert.pdf");
  // await fs.writeFile(certPath, pdfBytes);
  await uploadFile({
    key: `${certificate.userId}/${certificate.id}.pdf`,
    folder: "certificates",
    body: pdfBytes,
  });

  //! redirect ke URL S3
  redirect(
    `${process.env.R2_PUBLIC_URL}/next-lms/certificates/${certificate.userId}/${certificate.id}.pdf`
  );
}

function getTextWidthWithSpacing(
  text: string,
  customFont: PDFFont,
  fontSize: number,
  letterSpacing: number
) {
  let width = 0;
  for (const char of text) {
    width += customFont.widthOfTextAtSize(char, fontSize) + letterSpacing;
  }
  return width - letterSpacing;
}
