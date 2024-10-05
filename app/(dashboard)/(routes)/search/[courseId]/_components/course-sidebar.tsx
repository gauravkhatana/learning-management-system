import { auth } from "@clerk/nextjs/server";
import { Activity, Chapter, Course, UserProgress } from "@prisma/client";
import { redirect } from "next/navigation";
import { CourseSidebarItem } from "./course-sidebar-item";
import { getProgress } from "@/actions/get-progress";
import { CourseProgress } from "@/components/course-progress";
import { Accordion } from "@/components/ui/accordion";
import { db } from "@/lib/db";

interface CourseSidebarProps {
  course: Course & {
    chapters: (Chapter & {
      activities: Activity[];
    })[];
  };
  progressCount: number;
}

export const CourseSidebar = async ({
  course,
  progressCount,
}: CourseSidebarProps) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const userProgresses = await db.userProgress.findMany({
    where: {
      userId,
    },
    orderBy: {
      updatedAt: "desc", // Sort by updatedAt in descending order
    },
    take: 1,
  });
  const userProgress = userProgresses[0];

  return (
    <>
      <div className=" fixed w-full h-full justify-self-end border-r rounded-sm bg-white flex flex-col overflow-y-auto shadow-sm">
        <div className="px-2 py-4 flex flex-col border-b">
          <h1 className="font-semibold text-black">{course.title}</h1>
          {/* <CourseProgress
          variant="success"
          progress={progressCount}
          /> */}
        </div>
        <Accordion
          type="single"
          defaultValue={userProgress?.chapterId || course.chapters[0].id}
          collapsible
        >
          <div className="flex flex-col w-full">
            {course.chapters.map((chapter, index) => {
              const progressCount = getProgress(userId, chapter.id);
              console.log(chapter);

              return (
                <CourseSidebarItem
                  key={chapter.id}
                  id={chapter.id}
                  index={index}
                  label={chapter.title}
                  courseId={course.id}
                  chapter={chapter}
                  isCompleted={false}
                />
              );
            })}
          </div>
        </Accordion>
      </div>
    </>
  );
};
