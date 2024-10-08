import { db } from "@/lib/db";
import { Activity, Attachment, Chapter } from "@prisma/client";

interface GetActivityProps {
  userId: string;
  chapterId: string;
  activityId: string;
  courseId: string;
}
export const getActivity = async ({
  userId,
  activityId,
  chapterId,
  courseId,
}: GetActivityProps) => {
  try {
    const course = await db.course.findUnique({
      where: {
        isPublished: true,
        id: courseId,
      },
    });

    const chapter = await db.chapter.findUnique({
      where: {
        id: chapterId,
      },
    });

    const activity = await db.activity.findUnique({
      where: {
        id: activityId,
        isPublished: true,
      },
    });

    if (!course || !activity || !chapter) {
      throw new Error("Course, chapter or activity not found");
    }

    // let muxData = null;
    let attachments: Attachment[] = [];
    let nextActivity: Activity | null = null;
    if (course.isPublished) {
      attachments = await db.attachment.findMany({
        where: {
          courseId: course.id,
        },
      });

      // muxData = await db.muxData.findUnique({
      //   where: {
      //     activityId,
      //   },
      // });
    }

    nextActivity = await db.activity.findFirst({
      where: {
        chapterId: chapter.id,
        order: {
          gt: activity?.order!,
        },
      },
      orderBy: {
        order: "asc",
      },
    });

    const userProgress = await db.userProgress.findUnique({
      where: {
        userId_activityId: {
          userId,
          activityId,
        },
      },
    });

    return {
      
      activity,
      // muxData,
      attachments,
      nextActivity,
      userProgress,
    };
  } catch (err) {
    console.error("[GET_ACTIVITY]", err);
    return {
      activity: null,
      
      // muxData: null,
      attachments: [],
      nextActivity: null,
      userProgress: null,
    };
  }
};
