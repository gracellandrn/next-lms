import { atom } from "jotai";

import { Lesson, Section } from "@/generated/prisma";

export const openLessonEditModalAtom = atom(false);
export const lessonDetailAtom = atom<Lesson | null>(null);

export const openSectionEditModalAtom = atom(false);
export const sectionDetailAtom = atom<Section | null>(null);
