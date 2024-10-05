import { db } from "@/lib/db";

export const getProgress = async (
  userId: string,
  chapterId: string
): Promise<number> => {
  try {
    const activities = await db.activity.findMany({
      where: {
        chapterId: chapterId,
        
      },
      select: {
        id: true,
      },
    });

    const activityIds = activities.map((activity) => activity.id);

    const validCompletedChapters:any = await db.userProgress.count({
      where: {
        userId,
        activityId: {
          in: activityIds,
        },
        isCompleted: true,
      },
      select: {
        activityId: true,
      },
    });

    const progressPercentage = (validCompletedChapters.activityId / activityIds.length) * 100;

    console.log("COMPLETED CHAPTER",validCompletedChapters.activityId);
    console.log("ACTIVITY IDS",activityIds.length);
    console.log("PROGRESSPER",progressPercentage);

    return progressPercentage;
  } catch (error) {
    console.log("[GET_PROGRESS]",error); 
    return 0;
  }
};
