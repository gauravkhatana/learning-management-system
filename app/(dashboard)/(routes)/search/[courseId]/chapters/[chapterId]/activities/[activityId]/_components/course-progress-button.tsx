"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle } from "lucide-react";

interface CourseProgressProps {
  chapterId: string;
  activityId: string;
  isCompleted: boolean;
  nextActivityId: string;
}

export const CourseProgressButton = ({
  chapterId,
  activityId,
  isCompleted,
  nextActivityId,
}: CourseProgressProps) => {
    const Icon = isCompleted? CheckCircle : XCircle
    return(
        <Button
            type="button"
            variant={isCompleted ? "outline" : "success"}
            className="w-full md:w-auto"
        >
            {isCompleted ? "Mark as incomplete" : "Mark as complete"}
            <Icon className="h-4 w-4 ml-2"/>
        </Button>
    )
}