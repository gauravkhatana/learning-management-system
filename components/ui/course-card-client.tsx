// course-card-client.tsx (Client Component)
"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { IconBadge } from "@/components/icon-badge";
import { BookOpen } from "lucide-react";
import { Button } from "./button";
import { CourseProgress } from "../course-progress";
// import { CourseProgress } from "./course-progress";
// import { Button } from "./ui/button";

interface CourseCardClientProps {
  id: string;
  title: string;
  imageUrl: string;
  chapterLength: number;
  progress: number | null;
  category: string | null;
  userProgress: {
    courseId: string;
    chapterId: string;
    activityId: string;
  } | null;
}

export const CourseCardClient = ({
  id,
  title,
  imageUrl,
  chapterLength,
  progress,
  category,
  userProgress,
}: CourseCardClientProps) => {
  const router = useRouter();
  
  // console.log("USER PROGRESS::::::::::::",userProgress);

  const courseProgress = () => {
    if (userProgress) {
      router.push(
        `/search/${userProgress.courseId}/chapters/${userProgress.chapterId}/activities/${userProgress.activityId}`
      );
    }
  };

  const startCourse = () => {
    if (userProgress) {
      router.push(
        `/search/${id}`
      );
    }
  };

  return (
    <Link href={`/search/${id}`}>
      <div className="group transition border rounded-lg p-3 h-full hover:shadow-lm overflow-hidden">
        <div className="relative w-full aspect-video rounded-md overflow-hidden">
          <Image fill className="object-cover" src={imageUrl} alt={title} />
        </div>
        <div className="flex flex-col pt-2">
          <div className="text-md md:text-base font-medium group-hover:text-sky-700 transition line-clamp-2">
            {title}
          </div>
          <p className="text-xs text-muted-foreground">{category}</p>
          <div className="my-3 flex item-center gap-x-2 test-sm md:text-xs">
            <div className="flex items-center gap-x-1 text-slate-500">
              <IconBadge size="sm" icon={BookOpen} />
              <span>
                {chapterLength} {chapterLength == 1 ? "chapter" : "chapters"}
              </span>
            </div>
          </div>
          {progress !== null && (
            <div className="progress flex align--items-center justify-between gap-x-2 text-sm md:text-xs">
              <CourseProgress
                size="sm"
                progress={progress}
                variant={progress === 100 ? "success" : "default"}
              />
              {userProgress ? (
                <Button
                  onClick={courseProgress}
                  className="resume"
                  variant="default"
                >
                  
                  Resume
                </Button>
              ) : (
                <Button
                  onClick={startCourse}
                  className="resume"
                  variant="default"
                >
                  Start Course
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};
