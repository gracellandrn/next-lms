"use client";

import { Modal, ModalContent } from "@heroui/modal";
import { useState } from "react";

export const Preview = ({ videoUrl }: { videoUrl: string }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => {
          setOpen(true);
        }}
        className="cursor-pointer font-semibold hover:text-blue-600"
      >
        Free Preview
      </div>
      <Modal
        isOpen={open}
        onClose={() => {
          setOpen(false);
        }}
        className=" bg-black/50 backdrop-blur-md"
      >
        <ModalContent>
          <div>
            <iframe
              width="100%"
              height="600px"
              src={`https://www.youtube.com/embed/${videoUrl}`}
              title="Youtube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            ></iframe>
          </div>
        </ModalContent>
      </Modal>
    </>
  );
};
