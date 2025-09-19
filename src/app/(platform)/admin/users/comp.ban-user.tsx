"use client";

import { Button } from "@heroui/button";
import { useActionState } from "react";

import { banUserAction } from "./action.ban";

export const BanUser = ({ userId }: { userId: string }) => {
  const [_, formAction, pending] = useActionState(banUserAction, null);

  return (
    <form action={formAction}>
      <input name="userId" value={userId} type="hidden" />
      <Button
        color="danger"
        type="submit"
        disabled={pending}
        size="sm"
        className="w-fit"
      >
        Ban
      </Button>
    </form>
  );
};
