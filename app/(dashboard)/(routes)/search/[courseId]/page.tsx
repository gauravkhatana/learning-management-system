import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const CourseIdPage = async ({
  
  params,
}: {
  params: { courseId: string; };
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
            select: {
              id: true,
            }
          },
        },
      }
    }
  });

  const userProgresses = await db.userProgress.findMany({
    where: {
      userId,
    },
    orderBy: {
      updatedAt: "desc", // Sort by updatedAt in descending order
    },
    take: 1,
  });
  

  if (!course) {
    return redirect("/");
  }
  else if (userProgresses.length === 0) {
    return redirect(`/search/${course.id}/chapters/${course.chapters[0].id}/activities/${(course.chapters[0]).activities?.[0]?.id}`);
  }
  else {
    const latestProgress = userProgresses[0];
    return redirect(`/search/${course.id}/chapters/${latestProgress.chapterId}/activities/${latestProgress.activityId}`);
  }
};
export default CourseIdPage;
