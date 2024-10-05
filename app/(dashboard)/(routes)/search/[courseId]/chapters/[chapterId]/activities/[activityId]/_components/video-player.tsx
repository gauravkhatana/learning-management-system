"use client";

import axios from "axios";
// import MuxPlayer from "@mux/mux-player-react";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Loader2, Lock } from "lucide-react";

import { cn } from "@/lib/utils";
import { useConfettiStore } from "@/hooks/use-confetti-store";

interface VideoPlayerProps {
  activityId: string;
  chapterId: string;
  nextActivityId?: string;
  userId: string;
  courseId: string;
  videoUrl: string;
  title: string;
  playbackId?: string;
}

export const VideoPlayer = ({
  activityId,
  chapterId,
  courseId,
  videoUrl,
  userId,
  nextActivityId,
  title,
  playbackId,
}: VideoPlayerProps) => {
  const router = useRouter();
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLocked, setIsLocked] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [lastKnownTime, setLastKnownTime] = useState(0);

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const res = await axios.get(
          `/api/video-progress?userId=${userId}&activityId=${courseId}`
        );
        setLastKnownTime(res.data.progress || 0);
        if (videoRef.current) {
          videoRef.current.currentTime = res.data.progress || 0;
        }
      } catch (error) {
        console.error("Failed to load video progress", error);
      }
    };
    fetchProgress();
  }, [userId, courseId]);

  // Save the current playback time to the database via API
  const handleTimeUpdate = async () => {
    const currentTime = videoRef.current?.currentTime || 0;

    try {
      await axios.post("/api/video-progress", {
        userId,
        activityId,
        courseId,
        chapterId,
        progress: currentTime,
      });
    } catch (error) {
      console.error("Failed to update video progress", error);
    }
  };

  const handlePause = () => {setIsPaused(true);};
  const handlePlay = () => setIsPaused(false);

  const handleEnd = async () => {
    try {
      await axios.post("/api/video-progress", {
        userId,
        activityId,
        courseId,
        chapterId,
        progress: 0, // Reset progress on video end
        activityCompleted: true, // Reset activity progress
        
      });
    } catch (error) {
      console.error("Failed to reset video progress", error);
    }
  };

  // const handleResume = () => {
  //   if (videoRef.current) {
  //     videoRef.current.currentTime = lastKnownTime;
  //     videoRef.current.play();
  //   }
  // };

  // const handleRestart = () => {
  //   if (videoRef.current) {
  //     videoRef.current.currentTime = 0;
  //     videoRef.current.play();
  //   }
  // };

  return (
    <div className="relative aspect-video">
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
          <Loader2 className="w-8 h-8 animate-spin text-secondary" />
        </div>
      )}
      {isPlaying && (
        <video
          ref={videoRef}
          className={cn("w-full h-full", !isPlaying && "hidden")}
          src={videoUrl}
          controls
          onCanPlay={() => setIsPlaying(true)}
          onEnded={handleEnd}
          onPause={handlePause}
          onPlay={handlePlay}
          onTimeUpdate={handleTimeUpdate}
        ></video>)
      }
      
    </div>
  );
};
