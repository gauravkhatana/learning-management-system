import { getProgress } from "@/actions/get-progress";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { CourseSidebar } from "./_components/course-sidebar";
import { CourseNavbar } from "./_components/course-navbar";

const CourseLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { courseId: string };
}) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
    include: {
      chapters: {
        include: {
          activities: {
            where: {
              isPublished: true,
            },
            // select: {
            //   id: true,
            //   title: true,
            //   description: true,
              
            // },
            orderBy: {
              order: "asc",
            },
          },
        },
      },
    },
  });

  if (!course) {
    return redirect("/");
  }

  const progressCount = await getProgress(userId, course.chapters[0].id!);

  return (
    <div className="h-full flex ">
      {/* <div className=" h-[80px] md:pl-80 fixed inset-y-0 w-full z-50">
        <CourseNavbar course={course} 
         progressCount={progressCount}
         />
      </div> */}
      <main className="w-full h-full">{children}</main>
      <div className="hidden md:flex h-full w-96 flex-col justify-self-end rounded-sm mt-6  border-slate-800"> 
        <CourseSidebar course={course} 
          progressCount={progressCount} 
         />
      </div>
    </div>
  );
};

export default CourseLayout;
