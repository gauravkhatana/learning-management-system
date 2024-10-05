import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const courseOwner = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId,
      },
    });

    if (!courseOwner) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const chapter = await db.chapter.findUnique({
      where: {
        id: params.chapterId,
        courseId: params.courseId,
      },
    });
    if (!chapter) {
      return new NextResponse("Not Found", { status: 404 });
    }

    const unPublishedChapter = await db.chapter.update({
      where: {
        id: params.chapterId,
        courseId: params.courseId,
      },
      data: {
        isPublished: false,
      },
    });

    const publishedChapterInCourse = await db.chapter.findMany({
        where: {
          courseId: params.courseId,
          isPublished: true,
        },
      });

      if (!publishedChapterInCourse.length) {
        await db.course.update({
          where: {
            id: params.courseId,
          },
          data: {
            isPublished: false,
          },
        });
      }

    return new NextResponse(JSON.stringify(unPublishedChapter), { status: 200 });
  } catch (err) {
    console.log("[CHAPTER_UNPUBLISH]", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
