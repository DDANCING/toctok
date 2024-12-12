"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import {
  IoVolumeMuteOutline,
  IoVolumeHighOutline,
  IoPlay,
  IoPause,
} from "react-icons/io5";
import { Button } from "./ui/button";
import PostMainPinned from "./post-main-Pinned";

interface PostProps {
  userId: string;
  post: {
    id: string;
    video_url: string;
    text: string;
    created_at: Date;
    locale: string;
    profile: {
      user_id: string;
      name: string;
      image: string;
    };
  };
}

export default function PostMain({ post }: PostProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMutedGlobal, setIsMutedGlobal] = useState(true);
  const [showPlayPauseIcon, setShowPlayPauseIcon] = useState<"play" | "pause" | null>(null);
  const [isMobile, setIsMobile] = useState(false); // Variável para detectar dispositivos móveis

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 640);
    handleResize(); // Inicializa ao carregar
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const video = document.getElementById(`video-${post.id}`) as HTMLVideoElement;
    const postElement = document.getElementById(`PostMain-${post.id}`);
    if (postElement && video) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries[0].isIntersecting ? video.play() : video.pause();
        },
        { threshold: [0.6] }
      );
      observer.observe(postElement);

      return () => observer.disconnect();
    }
  }, [post.id]);

  const handleToggleText = () => {
    setIsExpanded(!isExpanded);
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

  const truncatedText = post.text.length > 88 ? post.text.slice(0, 88) : post.text;

  return (
    <div className="flex items-end relative justify-center md:ml-24">
      <div
        id={`PostMain-${post.id}`}
        className="flex flex-col items-center relative snap-start"
      >
        <div className="cursor-pointer relative bg-black max-w-screen-sm h-[80vh] rounded-lg overflow-hidden my-4">
          {/* Video Section */}
          <div
            onClick={handleVideoClick}
            className="relative cursor-pointer h-full flex items-center justify-center"
          >
            <video
              id={`video-${post.id}`}
              src={post.video_url}
              muted={isMutedGlobal}
              loop
              className="h-full object-cover"
            />
            {/* Play/Pause Animation */}
            {showPlayPauseIcon && (
              <div
                className={`absolute inset-0 flex items-center justify-center text-white text-6xl animate-ping  
                ${showPlayPauseIcon ? "opacity-100" : "opacity-0"} transition-opacity duration-1000`}
              >
                {showPlayPauseIcon === "play" ? <IoPlay /> : <IoPause />}
              </div>
            )}
            {/* Mute/Unmute Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleToggleMuteGlobal();
              }}
              className="absolute top-4 right-4 text-white rounded-full w-8 h-8 flex items-center justify-center"
            >
              {isMutedGlobal ? <IoVolumeMuteOutline /> : <IoVolumeHighOutline />}
            </button>
          </div>

          {/* Render `PostMainPinned` Condicionalmente */}
          {isMobile && (
            <div className="absolute top-[75%] right-4 z-10 m-4">
              <PostMainPinned post={post} />
            </div>
          )}

          <div className="absolute bottom-4 left-4 z-10 text-white">
            <div className="flex justify-between">
              <Link href={`/profile/${post.profile.user_id}`}>
                <div className="flex items-center mb-2">
                  <img
                    className="rounded-full w-10 h-10 object-cover border border-white"
                    src={post.profile.image}
                    alt={post.profile.name}
                  />
                  <span className="ml-2 font-bold hover:underline">
                    {post.profile.name}
                  </span>
                </div>
              </Link>
              <Button
                className="m-2 h-8 border text-[15px] px-[21px] py-0.5 hover:bg-primary/50 font-semibold hover:text-secondary"
                variant={"ghost"}
              >
                seguir
              </Button>
            </div>
            <p className="text-sm text-zinc-300">
              {isExpanded ? post.text : truncatedText}
              {post.text.length > 88 && (
                <span
                  onClick={handleToggleText}
                  className="text-zinc-300 cursor-pointer ml-2"
                >
                  {isExpanded ? "Ver menos" : "Ver mais"}
                </span>
              )}
            </p>
            <p className="text-[14px] pb-0.5 flex items-center font-semibold text-zinc-200">
              {post.locale}
            </p>
          </div>
        </div>
      </div>

      {/* Lateral para Desktop */}
      {!isMobile && (
        <div className="ml-4">
          <PostMainPinned post={post} />
        </div>
      )}
    </div>
  );
}
