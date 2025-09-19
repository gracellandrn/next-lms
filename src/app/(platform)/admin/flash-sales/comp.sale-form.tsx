"use client";

import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { useActionState } from "react";

import { Course } from "@/generated/prisma";

import { createSaleAction } from "./action.create-sale";

interface Props {
  courses: Course[];
}

export const SaleForm = ({ courses }: Props) => {
  const [_, formAction, pending] = useActionState(createSaleAction, null);
  return (
    <form action={formAction} className="space-y-2">
      <Input name="amount" type="number" placeholder="New Amount" />
      <Select name="courseId" className="w-full" label="Select course">
        {courses.map((course) => (
          <SelectItem key={course.id}>{course.title}</SelectItem>
        ))}
      </Select>
      <Button color="primary" type="submit" disabled={pending}>
        Create Sale
      </Button>
    </form>
  );
};
