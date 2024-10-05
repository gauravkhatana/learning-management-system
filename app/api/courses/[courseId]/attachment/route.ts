import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { split } from "postcss/lib/list";

export async function POST(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { userId } = auth();
    const { url } = await req.json();

    if (!userId) {
      return new NextResponse("unauthorised", { status: 401 });
    }
    const courseOwner = await db.course.findUnique({
      where: { id: params.courseId, userId },
    });
    if(!courseOwner){
        return new NextResponse("unauthorised", { status: 401 });
    }

    const attachment = await db.attachment.create({
        data:{
            url,
            name:url.split("/").pop(),
            courseId: params.courseId
        }
    })
    console.log(url.split("/").pop()),
    console.log("attachment route : ",attachment);
    return NextResponse.json(attachment);
  } catch (error) {
    console.log(`COURSE_ID_ATTACHMENT ${error} `);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
