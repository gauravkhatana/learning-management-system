import Mux from "@mux/mux-node";
// const Mux = require("@mux/mux-node");
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Initialize Mux client with the correct configuration object
const muxClient = new Mux();

const { video } = muxClient;

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
    const courseOwner = await db.course.findUnique({
      where: { id: courseId, userId },
    });
    if (!courseOwner) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const chapter = await db.chapter.findUnique({
      where: { id: chapterId, courseId },
    });
    if (!chapter) {
      return new NextResponse("Not Found", { status: 404 });
    }
    // if (chapter.videoUrl) {
    //   const existingMuxData = await db.muxData.findFirst({
    //     where: { chapterId: chapterId },
    //   });
    //   if (existingMuxData) {
    //     await Assets.delete(existingMuxData.assetId);
    //     await db.muxData.delete({
    //       where: {
    //         id: existingMuxData.id,
    //       },
    //     });
    //   }
    // }
    const deletedChapter = await db.chapter.delete({
      where: {
        id: chapterId,
      },
    });

    const publishedChapterInCourse = await db.chapter.findMany({
      where: {
        courseId: courseId,
      },
    });
    if (!publishedChapterInCourse.length) {
      await db.course.update({
        where: {
          id: courseId,
        },
        data: {
          isPublished: false,
        },
      });
    }
    return NextResponse.json(deletedChapter);
  } catch (error) {
    console.log("[CHAPTER_ID_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  try {
    const { userId } = auth();
    const { courseId, chapterId } = params;
    const { isPublished, ...values } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const courseOwner = await db.course.findUnique({
      where: { id: courseId, userId },
    });

    if (!courseOwner) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    //vdio upload handle

    const chapter = await db.chapter.update({
      where: { id: chapterId, courseId },
      data: { ...values },
    });

    // if (values.videoUrl) {
    //   const existingMuxData = await db.muxData.findFirst({
    //     where: { chapterId: params.chapterId },
    //   });

    //   if (existingMuxData) {
    //     await Assets.delete(existingMuxData.assetId);
    //     await db.muxData.delete({ where: { id: existingMuxData.id } });
    //   }

    //   const asset = await Assets.create({
    //     input: values.videoUrl,
    //     playback_policy: ["public"],
    //     mp4_support: "standard",
    //     test: false,
    //   });

    //   console.log("aasseett",asset,"[id],",asset.playback_ids?.[0].id);

    //   await db.muxData.create({
    //     data: {
    //       chapterId: params.chapterId,
    //       assetId: asset.id,
    //       playbackId: asset.playback_ids?.[0].id!,
    //     },
    //   });
    // }

    return NextResponse.json(chapter);
  } catch (err) {
    console.log("[COURSES_CHAPTERS]", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
