import { getActivity } from "@/actions/get-activities";
import { Banner } from "@/components/banner";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { VideoPlayer } from "./_components/video-player";
import { Separator } from "@/components/ui/separator";
import { Preview } from "@/components/preview";
import { CourseProgressButton } from "./_components/course-progress-button";
import { File } from "lucide-react";
import { db } from "@/lib/db";

const ActivityIdPage = async ({
  params,
}: {
  params: { courseId: string; chapterId: string; activityId: string };
}) => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }

  const { courseId, chapterId, activityId } = params;

  const {
    activity,
    // muxData,
    attachments,
    userProgress,
    nextActivity,
  } = await getActivity({
    userId,
    courseId,
    chapterId,
    activityId,
  });

  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
    
        select: {
          id: true,
          title: true,
        },
  });

  return (
    <div className="p-2 bg-slate-100">
      {userProgress?.isCompleted && (
        <Banner variant="success" label="You have completed this activity" />
      )}
      <div className="flex flex-col mx-auto pb-20">
        <div className="pathway">
          course / {course?.title}
        </div>
        <div className="p-4">
        <div className="header m-2 text-2xl font-medium"> {activity?.title}</div>

          <VideoPlayer
            activityId={activityId}
            videoUrl={activity?.videoUrl!}
            userId={userId}
            courseId={courseId}
            title={activity?.title!}
            chapterId={chapterId}
            nextActivityId={nextActivity?.id}
            // playbackId={muxData?.playbackId!}
          />
          
        </div>
        <div>
          {/* <div className="p-4 flex flex-col md:flex-row items-center justify-between">
            <h2 className="text-2xl font-semibold mb-2">{activity?.title}</h2>
            <CourseProgressButton
              chapterId={params.chapterId}
              activityId={params.activityId}
              nextActivityId={nextActivity?.id!}
              isCompleted={!!userProgress?.isCompleted}
            />
          </div> */}
          <Separator />
          <div>
            <Preview value={activity?.description!} />
            {/* <p>{activity?.description}</p> */}
          </div>
          {!!attachments.length && (
            <>
              <Separator />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">Attachments</h3>
                <ul className="flex flex-col gap-y-2">
                  {attachments.map((attachment) => (
                    <li key={attachment.id}>
                      <a
                        href={attachment.url!}
                        className="flex items-center gap-x-2 p-3 w-full bg-sky-100 border text-sky-600 rounded-md transition-all hover:text-slate-600 underline"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <File />
                        <span className="line-clamp-1">{attachment.name}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default ActivityIdPage;
