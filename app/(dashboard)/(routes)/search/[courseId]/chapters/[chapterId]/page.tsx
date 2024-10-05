import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const ChapterIdPage = async ({
  params,
}: {
  params: { chapterId: string; courseId: string };
}) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const chapter = await db.chapter.findUnique({
    where: {
      id: params.chapterId,
    },
    include: {
      activities: {
        where: {
          isPublished: true,
        },
        select: {
          id: true,
        },
      },
    },
  });

  if (!chapter) {
    return redirect("/");
  }
  if(chapter.activities?.length <= 0){
    return "No Activities yet"
  }
 
};

export default ChapterIdPage;
