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

import { lessonDetailAtom, openLessonEditModalAtom } from "@/context/atom";

import { updateLessonAction } from "./action.update-lesson";

export const LessonEditForm = () => {
  const [openModal, setOpenModal] = useAtom(openLessonEditModalAtom);
  const [lessonDetail] = useAtom(lessonDetailAtom);

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
              Edit Lesson
            </ModalHeader>
            <form
              action={async (formData) => {
                await updateLessonAction(formData);
                setOpenModal(false);
              }}
              className="space-y-2"
            >
              <ModalBody className="space-y-2">
                <input
                  name="lessonId"
                  defaultValue={lessonDetail?.id}
                  type="hidden"
                  required
                />
                <Input
                  name="lessonTitle"
                  defaultValue={lessonDetail?.title}
                  required
                  label="Title"
                  labelPlacement="outside"
                  isRequired
                  placeholder="Enter title"
                />
                <Input
                  name="videoUrl"
                  defaultValue={lessonDetail?.videoUrl}
                  required
                  label="Video Url"
                  labelPlacement="outside"
                  isRequired
                  placeholder="Enter video Url"
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
