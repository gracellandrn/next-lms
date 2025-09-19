import { Button } from "@heroui/button";

import { addSectionAction } from "./action.add-section";

export const AddSectionBtn = ({ courseId }: { courseId: string }) => {
  return (
    <form action={addSectionAction}>
      <input name="courseId" value={courseId} type="hidden" required />
      <Button color="primary" className="w-full" type="submit">
        Add Section
      </Button>
    </form>
  );
};
