"use client";

import { Button } from "@heroui/button";
import { useActionState } from "react";

import { downloadCertificateAction } from "./action.download";

export const DownloadBtn = ({ certificateId }: { certificateId: string }) => {
  const [_, formAction, pending] = useActionState(
    downloadCertificateAction,
    null
  );

  return (
    <form action={formAction}>
      <input name="certificateId" value={certificateId} type="hidden" />
      <Button
        disabled={pending}
        type="submit"
        color="primary"
        size="sm"
        className="w-fit"
      >
        Download Certificate
      </Button>
    </form>
  );
};
