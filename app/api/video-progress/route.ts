import { db } from "@/lib/db";

export async function GET(req: Request) {
  try {
    // Extract the search parameters from the URL
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const activityId = searchParams.get("activityId");

    if (!userId || !activityId) {
      return new Response(
        JSON.stringify({ error: "Missing userId or activityId" }),
        {
          status: 400,
        }
      );
    }

    const progress = await db.userProgress.findUnique({
      where: {
        userId_activityId: {
          userId: userId as string,
          activityId: activityId as string,
        },
      },
    });

    return new Response(
      JSON.stringify({
        progress: progress?.progress || 0,
        activityCompleted: progress?.activityCompleted || 0,

      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to fetch video progress" }),
      {
        status: 500,
      }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { userId, activityId, courseId, chapterId, progress,activityCompleted } =
      await req.json(); // Parse JSON body

    if (!userId || !activityId || typeof progress !== "number") {
      return new Response(JSON.stringify({ error: "Invalid data" }), {
        status: 400,
      });
    }

    const updatedProgress = await db.userProgress.upsert({
      where: {
        userId_activityId: {
          userId: userId as string,
          activityId: activityId as string,
        },
      },
      update: { progress, activityId, chapterId, courseId },
      create: {
        userId,   
        activityId,
        chapterId,
        courseId,
        progress,
        activityCompleted : activityCompleted || false,
      },
    });

    return new Response(
      JSON.stringify({ success: true, progress: updatedProgress.progress }),
      {
        status: 200,
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to save video progress" }),
      {
        status: 500,
      }
    );
  }
}

// import { db } from "@/lib/db";
// import { NextApiRequest, NextApiResponse } from "next";

// export  async function GET(req: Request, res: NextApiResponse) {
//   const { userId, activityId } = req.body;

//   if (!userId || !activityId) {
//     return res.status(400).json({ error: "Missing userId or videoId" });
//   }

//   try {
//     const progress = await db.userProgress.findUnique({
//       where: {
//         userId_activityId: {
//           userId: userId as string,
//           activityId: activityId as string,
//         },
//       },
//     });

//     res.status(200).json({ progress: progress?.progress || 0 });
//   } catch (error) {
//     res.status(500).json({ error: "Failed to fetch video progress" });
//   }
// }

// export async function POST(req: NextApiRequest, res: NextApiResponse) {
//   const { userId, activityId, progress } = req.body;

//   if (!userId || !activityId || typeof progress !== "number") {
//     return res.status(400).json({ error: "Invalid data" });
//   }

//   try {
//     const updatedProgress = await db.userProgress.upsert({
//       where: {
//         userId_activityId: {
//           userId: userId as string,
//           activityId: activityId as string,
//         },
//       },
//       update: { progress },
//       create: {
//         userId,
//         activityId,
//         progress,
//       },
//     });

//     res.status(200).json({ success: true, progress: updatedProgress.progress });
//   } catch (error) {
//     res.status(500).json({ error: "Failed to save video progress" });
//   }
// }
