"use server";

import { revalidatePath } from "next/cache";

import { FlashSaleService } from "@/services/flashsale.services";

export async function createSaleAction(_: unknown, formData: FormData) {
  const amount = Number(formData.get("amount"));
  const courseId = formData.get("courseId") as string;

  await FlashSaleService.createSale(amount, courseId);

  revalidatePath("/admin/flash-sales");
}
