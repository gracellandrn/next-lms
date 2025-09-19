"use client";

import { Button } from "@heroui/button";
import { Input, Textarea } from "@heroui/input";
import Image from "next/image";
import { ChangeEvent, useActionState, useState } from "react";

import { createCourseAction } from "./action";

export default function Page() {
  const [preview, setPreview] = useState("");
  const [state, action, pending] = useActionState(createCourseAction, null);

  function handleCreatePreview(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) return;
    const file = event.target.files[0];
    setPreview(URL.createObjectURL(file));
  }
  return (
    <main className="max-w-xl m-auto space-y-6">
      <section>
        <h3>Create New Course</h3>
      </section>
      <section>
        {preview ? (
          <Image
            src={preview}
            width={800}
            height={300}
            alt="Course cover"
            className="rounded-lg"
          />
        ) : null}
        <form action={action} className="space-y-2">
          <Input
            className="file:text-indigo-500"
            type="file"
            accept="image/*"
            name="coverImage"
            placeholder="Choose the course cover"
            onChange={handleCreatePreview}
          />
          <Input name="title" placeholder="Course title" />
          {state?.status === "error" && state.errors?.title ? (
            <div className="msg msg-error">{state.errors.title}</div>
          ) : null}
          <Textarea name="description" placeholder="Course description" />
          {state?.status === "error" && state.errors?.description ? (
            <div className="msg msg-error">{state.errors.description}</div>
          ) : null}
          <Input name="price" placeholder="Course prices" />
          {state?.status === "error" && state.errors?.price ? (
            <div className="msg msg-error">{state.errors.price}</div>
          ) : null}
          <Button
            disabled={pending}
            className="w-full"
            type="submit"
            color="primary"
          >
            {" "}
            Save Draft
          </Button>
          {state?.status === "error" && state.message ? (
            <div className="msg msg-error">{state.message}</div>
          ) : null}
        </form>
      </section>
    </main>
  );
}
