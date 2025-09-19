"use client";

import { Draggable } from "@hello-pangea/dnd";
import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import { useSetAtom } from "jotai";

import { openSectionEditModalAtom, sectionDetailAtom } from "@/context/atom";
import { Lesson, Section } from "@/generated/prisma";

import { deleteSectionAction } from "./action.delete-section";
import { AddLessonBtn } from "./comp.add-lesson";
import { Lessons } from "./comp.lesson-dnd";

interface Props {
  section: Section & { lessons: Lesson[] };
  index: number;
}

export const SectionCard = ({ section, index }: Props) => {
  const setOpenModal = useSetAtom(openSectionEditModalAtom);
  const setSectionDetail = useSetAtom(sectionDetailAtom);

  return (
    <Draggable draggableId={section.id} index={index}>
      {(draggableProvider) => {
        return (
          <div
            key={section.id}
            {...draggableProvider.draggableProps}
            ref={draggableProvider.innerRef}
          >
            <Card shadow="sm">
              <CardBody className="overflow-visible">
                <section className="flex justify-between items-center">
                  <div className="flex gap-2 items-center">
                    <div {...draggableProvider.dragHandleProps}>
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
                    <div>{section.title}</div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onPress={() => {
                        setOpenModal(true);
                        setSectionDetail(section);
                      }}
                    >
                      Edit
                    </Button>
                    <form action={deleteSectionAction}>
                      <input
                        name="sectionId"
                        value={section.id}
                        type="hidden"
                      />
                      <Button
                        type="submit"
                        isDisabled={section.lessons.length > 0}
                        color="danger"
                      >
                        Delete
                      </Button>
                    </form>
                    <AddLessonBtn sectionId={section.id} />
                  </div>
                </section>
                <div className="overflow-visible">
                  <Lessons section={section} />
                </div>
              </CardBody>
            </Card>
          </div>
        );
      }}
    </Draggable>
  );
};
