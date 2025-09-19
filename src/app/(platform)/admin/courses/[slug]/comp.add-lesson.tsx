import { Button } from "@heroui/button";

import { addLessonAction } from "./action.add-lesson";

export const AddLessonBtn = ({ sectionId }: { sectionId: string }) => {
  return (
    <form action={addLessonAction}>
      <input name="sectionId" value={sectionId} type="hidden" />
      <Button type="submit" color="primary">
        Add Lesson
      </Button>
    </form>
  );
};
