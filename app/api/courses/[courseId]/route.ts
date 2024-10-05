import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Mux from "@mux/mux-node";

const { video } = new Mux();

const Video = video;
const Assets = Video.assets;

export async function DELETE(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  try {
    const { userId } = auth();
    const { courseId, chapterId } = params;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const course = await db.course.findUnique({
      where: { id: courseId, userId },
      include: { chapters: { include: { muxData: true } } },
    });
    if (!course) {
      return new NextResponse("Not Found", { status: 404 });
    }

    for (const chapter of course.chapters) {
      if (chapter.muxData?.assetId) {
        await Assets.delete(chapter.muxData.assetId);
        // await db.muxData.delete({
        //   where: {
        //     id: chapter.muxData.id,
        //   },
        // });
        // THIS WILL BE HANDELED BECAUSE WE  HAVE USED CASCADE ON MUX DATA DELETE
      }
    }
    
    const deletedCourse = await db.course.delete({
      where: {
        id: params.courseId,
      },
    });

    return NextResponse.json(deletedCourse);
  } catch (error) {
    console.log("[COURSE_ID_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { userId } = auth();
    const { courseId } = params;

    const value = await req.json();
    if (!userId) {
      return new NextResponse("Unauthorised", { status: 401 });
    }
    const course = await db.course.update({
      where: { id: courseId, userId },
      data: { ...value },
    });

    return NextResponse.json(course);
  } catch (error) {
    console.log("COURSE_ID", error);
    return new NextResponse("Internal Server", { status: 500 });
  }
}
