import { db } from "@/lib/db";

export const getProgress = async (
  userId: string,
  courseId: string
): Promise<number> => {
  try {
    const chapters = await db.chapter.findMany({
      where: {
        courseId,
      },
      select: {
        id: true,
      },
    });

    const chapterIds = chapters.map((chapter) => chapter.id);

    const validCompletedChapters:any = await db.userProgress.count({
      where: {
        userId,
        chapterId: {
          in: chapterIds,
        },
      },
      select: {
        chapterId: true,
      },
    });


    const progressPercentage = (validCompletedChapters.chapterId  / chapterIds.length|| 0) * 100;

    return progressPercentage;
  } catch (error) {
    console.log("[GET_PROGRESS]",error); 
    return 0;
  }
};
