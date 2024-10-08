"use client";

import * as z from "zod";
import axios from "axios";
import toast from "react-hot-toast";
// import MuxPlayer from "@mux/mux-player-react";

import { Pencil, PlusCircle, VideoIcon } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Activity, Chapter } from "@prisma/client";

import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/file-upload";

interface ChapterVideoFormProps {
  initialData: Chapter & {activities : Activity[]};
  courseId: string;
  chapterId: string;
}

const formSchema = z.object({
  videoUrl: z.string().min(1),
});

export const ChapterVideoForm = ({
  initialData,
  courseId,
  chapterId,
}: ChapterVideoFormProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("onSubmit", values);
    try {
      await axios.patch(
        `/api/courses/${courseId}/chapters/${chapterId}`,
        values
      );
      toast.success("Chapter updated");
      setIsEditing((current) => !current);
      router.refresh();
    } catch {
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Chapter video
        <Button
          variant="ghost"
          onClick={() => setIsEditing((current) => !current)}
        >
          {isEditing && <>Cancel</>}
          {!isEditing && !initialData?.activities[0].videoUrl && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add an video
            </>
          )}
          {!isEditing && initialData?.activities[0].videoUrl && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit video
            </>
          )}
        </Button>
      </div>
      {!isEditing &&
        (!initialData?.activities[0].videoUrl ? (
          <div className="flex items-center justify-center h-60 bg-slate-100 rounded-md">
            <VideoIcon className="h-10 w-10 text-slate-500" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            {/* <MuxPlayer playbackId={''} /> */}
          </div>
        ))}
      {isEditing && (
        <div>
          <FileUpload
            endPoint="chapterVideo"
            onChange={(url) => {
              if (url) {
                console.log(url);
                onSubmit({ videoUrl: url });
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
            Upload this chapter&apos;s video
          </div>
        </div>
      )}
      {initialData?.activities[0].videoUrl && (
        <div className="text-xs text-muted-foreground mt-2">
          Video can take a few minutes to process. Please refresh the page once if video does not appear.
        </div>
      )}
    </div>
  );
};
