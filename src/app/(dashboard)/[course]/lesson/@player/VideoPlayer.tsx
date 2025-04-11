"use client";

import { cn } from "@/lib/utils";
import useGlobalStore from "@/store";
import MuxPlayer from "@mux/mux-player-react";
import React, { useEffect, useState } from "react";
import LessonNavigation from "../LessonNavigation";
import { Button } from "@/components/ui";
import { useRouter } from "next/navigation";

const VideoPlayer = ({
  linkPrevLesson,
  linkNextLesson,
}: {
  linkPrevLesson: string;
  linkNextLesson: string;
}) => {
  const duration = 5000;
  const { expandedPlayer, setExpandedPlayer } = useGlobalStore();
  const [isEndedVideo, setIsEndedVideo] = useState(false);

  const router = useRouter();
  useEffect(() => {
    if(!isEndedVideo) return;

    const timer = setTimeout(() => {
      router.push(linkNextLesson);
    }, duration);

    return () => clearTimeout(timer);
  },[isEndedVideo, linkNextLesson]);

  return (
    <div>
      <div className="relative mb-5 aspect-video">
        <div
          className={cn(
            "h-1.5 bg-gradient-to-r from-primary to-secondary absolute top-0 right-0 z-10",
            isEndedVideo ? "animate-bar" : ""
          )}
        ></div>
        <MuxPlayer
          streamType="on-demand"
          playbackId="a4nOgmxGWg6gULfcBbAa00gXyfcwPnAFldF8RdsNyk8M"
          primaryColor="#FFF"
          secondaryColor="#000"
          onEnded={() => setIsEndedVideo(true)}
          onPlay={() => setIsEndedVideo(false)}
        />
      </div>
      <div className="flex items-center justify-between mb-5">
        <LessonNavigation
          prevLessonIndex={!linkPrevLesson ? "" : linkPrevLesson}
          nextLessonIndex={!linkNextLesson ? "" : linkNextLesson}
        />
        <Button onClick={() => setExpandedPlayer(!expandedPlayer)}>
          {expandedPlayer ? "Mở rộng" : "Mặc định"}
        </Button>
      </div>
    </div>
  );
};

export default VideoPlayer;
