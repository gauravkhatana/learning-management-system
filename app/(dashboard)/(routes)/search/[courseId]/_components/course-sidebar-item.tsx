"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Activity, Chapter, UserProgress } from "@prisma/client";
import { CheckCircle, PlayCircle } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Preview } from "@/components/preview";
import { useEffect, useState } from "react";

interface CourseSidebarItemProps {
  id: string;
  label: string;
  courseId: string;
  index: number;
  chapter: Chapter & {
    activities: Activity[];
  };
  isCompleted: boolean;
}

export const CourseSidebarItem = ({
  id,
  label,
  courseId,
  index,
  chapter,
  isCompleted,
}: CourseSidebarItemProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const [activityId, setActivityId] = useState("");
  const isActiveActivity = pathname?.includes(activityId);

  const Icon = isCompleted ? CheckCircle : PlayCircle;

  const isActive = pathname?.includes(id);

  // Extract activityId from the URL (assuming its part of the path)
  useEffect(() => {
    const pathParts = pathname.split("/");

    setActivityId(pathParts[pathParts.length - 1]);
  }, [pathname]);

  const onActivityClick = (activityId: string) => {
    setActivityId(activityId);
    router.push(`/search/${courseId}/chapters/${id}/activities/${activityId}`);
  };

  const onChapterClick = () => {
    router.push(`/search/${courseId}/chapters/${id}/activities/${chapter.activities[0].id}`);
  };

  return (
    <div className="flex flex-col gap-x-2 text-slate-500 transition-all hover:text-slate-600 hover:bg-slate-300/20">
      {/* <button
        type="button"
        onClick={onChapterClick}
        className={cn(
          "flex items-center gap-x-2 text-slate-500 text-sm font-[500] px-3 py-4 transition-all hover:text-slate-600 hover:bg-slate-300/20",
          isActive &&
            "text-slate-700 bg-violet-200/20 hover:bg-violet-200/20 hover:text-slate-700",
          isCompleted && "text-emerald-700 hover:text-emerald-700"
        )}
      >
        <div
          className={cn(
            "ml-0 opacity-0 border-2 border-slate-700 h-full transition-all",
            isActive && "opacity-100",
            isCompleted && "border-emerald-700"
          )}
        />
        <div className="flex items-center gap-x-2 pr-4 ">
          {label}
          {chapter.activities.length}
        </div>
      </button> */}

      <AccordionItem value={chapter.id}>
        <div
          // type="button"
          onClick={onChapterClick}
          className={cn(
            "flex items-center gap-2 gap-y-2 w-full text-slate-500 text-sm font-[500] px-3 p2-4 transition-all hover:text-slate-600 hover:bg-slate-300/20",
            isActive &&
              "text-slate-700 bg-violet-200/20 hover:bg-violet-200/20 hover:text-slate-700",
            isCompleted && "text-emerald-700 hover:text-emerald-700"
          )}
        >
          <div className="flex items-center text-zinc-950 gap-x-2 ps-1 w-full ">
            {/* <Icon
                size={22}
                className={cn(
                  "text-slate-500",
                  isActive && "text-slate-700 ",
                  isCompleted && "text-emerald-700"
                )}
              /> */}
            <span
              className={cn(
                "text-slate-500",
                isActive && "text-slate-700 ",
                isCompleted && "text-emerald-700"
              )}
            >
              Unit-0{index + 1}
            </span>
            <AccordionTrigger className="w-48 hover:no-underline">
              {label}
            </AccordionTrigger>
          </div>
        </div>

        <AccordionContent className="flex flex-col ">
          {chapter.activities.map((activity, aIndex) => {
            return (
              <div key={activity.id} className="activity-item">
                <div
                  // key={activity.id}
                  onClick={() => onActivityClick(activity.id)}
                  className={cn(
                    "flex flex-col w-full py-2 gap-2.5 pl-8 text-stone-950 text-sm font-[500] transition-all hover:bg-slate-300/20 cursor-pointer ",
                    activity.id === activityId && "bg-slate-300/20"
                  )}
                >
                  <div className="title text-sm font-medium">
                    {index + 1}.{aIndex + 1}: {activity.title}
                  </div>
                  <div className="desc font-normal text-sm">
                    {/* {activity.description} Description about activity */}
                    <Preview value={activity?.description!} />
                  </div>
                  <div className="duration flex gap-1 text-xs font-light">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="17"
                      viewBox="0 0 16 17"
                      fill="none"
                    >
                      <mask
                        id="mask0_111_7178"
                        maskUnits="userSpaceOnUse"
                        x="0"
                        y="0"
                        width="16"
                        height="17"
                        mask="luminance"
                      >
                        <path d="M16 0.5H0V16.5H16V0.5Z" fill="white" />
                      </mask>

                      <g mask="url(#mask0_111_7178)">
                        <path
                          d="M8.02422 0.5C4.79809 0.5 1.88929 2.44347 0.654625 5.4248C-0.580575 8.4056 0.102091 11.8365 2.38369 14.1181C4.66529 16.3997 8.09622 17.0824 11.077 15.8472C14.0578 14.6125 16.0018 11.7037 16.0018 8.47707C15.9965 4.07387 12.428 0.505333 8.02422 0.5ZM8.02422 15.004C5.38422 15.004 3.00449 13.4136 1.99436 10.9747C0.984225 8.53573 1.54262 5.72827 3.40929 3.8616C5.27596 1.99493 8.08342 1.43653 10.5224 2.44667C12.9613 3.4568 14.5517 5.83707 14.5517 8.47653C14.5474 12.0792 11.6274 14.9992 8.02476 15.0035L8.02422 15.004Z"
                          fill="#11031B"
                        />
                      </g>
                    </svg>
                    <p>45 min</p>
                  </div>
                </div>
              </div>
            );
          })}
        </AccordionContent>
      </AccordionItem>
    </div>
  );
};
