"use client";

import { Button } from "@heroui/button";
import { useActionState } from "react";

import { unbanUserAction } from "./action.unban";

export const UnbanUser = ({ userId }: { userId: string }) => {
  const [_, formAction, pending] = useActionState(unbanUserAction, null);

  return (
    <form action={formAction}>
      <input name="userId" value={userId} type="hidden" />
      <Button
        color="success"
        type="submit"
        disabled={pending}
        size="sm"
        className="w-fit"
      >
        Unban
      </Button>
    </form>
  );
};
