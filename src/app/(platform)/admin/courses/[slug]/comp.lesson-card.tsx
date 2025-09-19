"use client";

import { Draggable } from "@hello-pangea/dnd";
import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import { useSetAtom } from "jotai";

import { lessonDetailAtom, openLessonEditModalAtom } from "@/context/atom";
import { Lesson } from "@/generated/prisma";

import { deleteLessonAction } from "./action.delete-lesson";
import { markAsPreview, unmarkAsPreview } from "./action.mark-free";

interface Props {
  lesson: Lesson;
  index: number;
}
export const LessonCard = ({ lesson, index }: Props) => {
  const setOpenModal = useSetAtom(openLessonEditModalAtom);
  const setLessonDetail = useSetAtom(lessonDetailAtom);

  return (
    <Draggable draggableId={lesson.id} index={index}>
      {(draggableProvider) => {
        return (
          <div
            key={lesson.id}
            {...draggableProvider.draggableProps}
            ref={draggableProvider.innerRef}
          >
            <Card shadow="sm" className="mt-2">
              <CardBody>
                <section className="flex items-center justify-between">
                  <div className="flex gap-2">
                    <div
                      {...draggableProvider.dragHandleProps}
                      className="cursor-grab"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="M7 19v-2h2v2zm4 0v-2h2v2zm4 0v-2h2v2zm-8-4v-2h2v2zm4 0v-2h2v2zm4 0v-2h2v2zm-8-4V9h2v2zm4 0V9h2v2zm4 0V9h2v2zM7 7V5h2v2zm4 0V5h2v2zm4 0V5h2v2z"
                        />
                      </svg>
                    </div>
                    {lesson.title}
                  </div>
                  <div className="flex gap-2">
                    {!lesson.isPreview ? (
                      <form action={markAsPreview}>
                        <input
                          type="hidden"
                          name="lessonId"
                          value={lesson.id}
                        />
                        <Button type="submit" size="sm" className="w-fit">
                          Mark as preview
                        </Button>
                      </form>
                    ) : (
                      <form action={unmarkAsPreview}>
                        <input
                          type="hidden"
                          name="lessonId"
                          value={lesson.id}
                        />
                        <Button type="submit" size="sm" className="w-fit">
                          Unmark as preview
                        </Button>
                      </form>
                    )}
                    <Button
                      onPress={() => {
                        setOpenModal(true);
                        setLessonDetail(lesson);
                      }}
                    >
                      Edit
                    </Button>
                    <form action={deleteLessonAction}>
                      <input name="lessonId" value={lesson.id} type="hidden" />
                      <Button type="submit">Delete</Button>
                    </form>
                  </div>
                </section>
              </CardBody>
            </Card>
          </div>
        );
      }}
    </Draggable>
  );
};
