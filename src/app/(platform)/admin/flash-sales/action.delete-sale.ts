"use server";

import { revalidatePath } from "next/cache";

import { FlashSaleService } from "@/services/flashsale.services";

export async function deleteSaleAction(formData: FormData) {
  const saleId = formData.get("saleId") as string;

  await FlashSaleService.deleteSale(saleId);

  revalidatePath("/admin/flash-sales");
}
