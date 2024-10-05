import { Menu } from "lucide-react";
import { Course, Chapter, UserProgress, Activity } from "@prisma/client";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { CourseSidebar } from "./course-sidebar";

interface CourseMobileSidebarProps {
  course: Course & {
    chapters: (Chapter & {
      activities: (Activity & {
        userProgress: UserProgress[] | null;
      })[];
    })[];
  };
  progressCount: number;
}

export const CourseMobileSidebar = ({ course, progressCount }: CourseMobileSidebarProps) => {
  return (
    <div>
      <Sheet>
        <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition" >
          <Menu />
        </SheetTrigger>
        <SheetContent side="left" className=" p-0 bg-white">
            <CourseSidebar course={course} progressCount={progressCount} ></CourseSidebar>
        </SheetContent>
      </Sheet>
    </div>
  );
};
