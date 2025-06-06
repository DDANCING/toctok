"use client";

import { PostWithProfile } from "@/app/types";
import ClientOnly from "@/components/client-only";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { IoPause, IoPlay, IoVolumeHighOutline, IoVolumeMuteOutline } from "react-icons/io5";

interface VideoSectionProps {
  post: PostWithProfile;
  ownerId: string;
}

export default function VideoSection({ post, ownerId }: VideoSectionProps) {
  const [isMutedGlobal, setIsMutedGlobal] = useState(true);
  const [showPlayPauseIcon, setShowPlayPauseIcon] = useState<"play" | "pause" | null>(null);

  const loopThroughPostUp = () => {
    console.log("loopThroughPostUp");
  };

  const loopThroughPostDown = () => {
    console.log("loopThroughPostDown");
  };

  const handleVideoClick = () => {
    const video = document.getElementById(`video-${post.id}`) as HTMLVideoElement;
    if (video) {
      if (video.paused) {
        video.play();
        setShowPlayPauseIcon("play");
      } else {
        video.pause();
        setShowPlayPauseIcon("pause");
      }
      setTimeout(() => setShowPlayPauseIcon(null), 900);
    }
  };

  const handleToggleMuteGlobal = () => {
    const videos = document.querySelectorAll<HTMLVideoElement>("video");
    videos.forEach((video) => {
      video.muted = !isMutedGlobal;
    });
    setIsMutedGlobal(!isMutedGlobal);
  };

  return (
    <div className="lg:w-[calc(100%-540px)] h-full relative">
      <Link
        className="absolute flex items-center justify-center text-foreground z-20 m-5 w-14 h-14 rounded-full bg-muted p-1.5 hover:bg-muted/50 "
        href={`/profile/${ownerId}`}
      >
        <AiOutlineClose size={30} />
      </Link>
      <div className="relative h-full">
        <Button
          onClick={() => loopThroughPostUp()}
          className="absolute z-20 right-4 top-4 flex items-center justify-center rounded-full bg-muted p-1.5 hover:bg-muted/50 w-14 h-14"
        >
          <FaChevronUp size={30} className="text-foreground" />
        </Button>
        <Button
          onClick={() => loopThroughPostDown()}
          className="absolute z-20 right-4 top-20 flex items-center justify-center rounded-full bg-muted p-1.5 hover:bg-muted/50 w-14 h-14"
        >
          <FaChevronDown size={30} className="text-foreground" />
        </Button>

        <ClientOnly>
          {true ? (
            <div className="fixed inset-0 z-0">
              <video
                className="object-cover w-full h-full"
                src="https://utfs.io/f/k0NLSQp2ETZAnR2bQ6icZ4RlwNHdgQPci2MBtWFa73xO5qkb"
              />
            </div>
          ) : null}
          {true ? (
            <div className="relative z-10 bg-black bg-opacity-70 lg:min-w-[480px] backdrop-blur-md">
              <video
                onClick={handleVideoClick}
                id={`video-${post.id}`}
                src={post.video_url}
                muted={isMutedGlobal}
                loop
                className="h-screen mx-auto"
              />

              {showPlayPauseIcon && (
                <div className="absolute inset-0 flex items-center justify-center text-white text-6xl pointer-events-none animate-pulse">
                  {showPlayPauseIcon === "play" ? <IoPlay /> : <IoPause />}
                </div>
              )}

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleToggleMuteGlobal();
                }}
                className="absolute z-20 right-4 bottom-4 flex items-center justify-center rounded-full bg-muted p-1.5 hover:bg-muted/50 w-14 h-14"
              >
                {isMutedGlobal ? <IoVolumeMuteOutline size={24} /> : <IoVolumeHighOutline size={24} />}
              </button>
            </div>
          ) : null}
        </ClientOnly>
      </div>
    </div>
  );
}
