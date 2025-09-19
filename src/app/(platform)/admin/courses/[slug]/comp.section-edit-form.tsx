"use client";

import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/modal";
import { useAtom } from "jotai";

import { openSectionEditModalAtom, sectionDetailAtom } from "@/context/atom";

import { updateSectionAction } from "./action.update-section";

export const SectionEditForm = () => {
  const [openModal, setOpenModal] = useAtom(openSectionEditModalAtom);
  const [sectionDetail] = useAtom(sectionDetailAtom);

  return (
    <Modal
      isOpen={openModal}
      onClose={() => {
        setOpenModal(false);
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Edit Section
            </ModalHeader>
            <form
              action={async (formData) => {
                await updateSectionAction(formData);
                setOpenModal(false);
              }}
              className="space-y-2"
            >
              <ModalBody className="space-y-2">
                <input
                  name="sectionId"
                  defaultValue={sectionDetail?.id}
                  type="hidden"
                  required
                />
                <Input
                  name="sectionTitle"
                  defaultValue={sectionDetail?.title}
                  required
                  label="Title"
                  labelPlacement="outside"
                  isRequired
                  placeholder="Enter title"
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button type="submit" color="primary">
                  Save
                </Button>
              </ModalFooter>
            </form>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
