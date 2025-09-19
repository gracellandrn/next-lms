import { Button } from "@heroui/button";
import Image from "next/image";

import { currencyFormat } from "@/libs/currency-format";
import { CourseServices } from "@/services/course.services";
import { FlashSaleService } from "@/services/flashsale.services";

import { deleteSaleAction } from "./action.delete-sale";
import { SaleForm } from "./comp.sale-form";

export default async function Page() {
  const courses = await CourseServices.getAllCourse();
  const flashSales = await FlashSaleService.getAllFlashSale();

  return (
    <main className="m-auto max-w-xl space-y-4 py-12">
      <h3>Flash Sale</h3>
      <SaleForm courses={courses} />
      <section>
        {flashSales.map((flashSale) => {
          return (
            <div
              key={flashSale.id}
              className="flex items-center gap-6 rounded-xl border bg-white p-4"
            >
              <div>
                <Image
                  alt={flashSale.course.title}
                  src={`${process.env.R2_PUBLIC_URL}/next-lms/courses/${flashSale.course.id}/${flashSale.course.coverImage}`}
                  width={160}
                  height={100}
                  className="rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <h4>{flashSale.course.title}</h4>
                <p>{currencyFormat(flashSale.newAmount)}</p>
                <form action={deleteSaleAction}>
                  <input name="saleId" value={flashSale.id} type="hidden" />
                  <Button type="submit" color="danger" size="sm">
                    Delete Sale
                  </Button>
                </form>
              </div>
            </div>
          );
        })}
      </section>
    </main>
  );
}
