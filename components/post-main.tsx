"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { IoVolumeMuteOutline, IoVolumeHighOutline, IoPlay, IoPause } from "react-icons/io5";

interface PostProps {
  id: string;
  userId: string;
  video_url: string;
  text: string;
  created_at: Date;
  locale: string;
  profile: {
    user_id: string;
    name: string;
    image: string;
  };
}

export default function PostMain({ id, profile, text, video_url }: PostProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMutedGlobal, setIsMutedGlobal] = useState(true); // Global mute state
  const [showPlayPauseIcon, setShowPlayPauseIcon] = useState<"play" | "pause" | null>(null);

  useEffect(() => {
    const video = document.getElementById(`video-${id}`) as HTMLVideoElement;
    const postElement = document.getElementById(`PostMain-${id}`);
    if (postElement && video) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries[0].isIntersecting ? video.play() : video.pause();
        },
        { threshold: [0.6] }
      );
      observer.observe(postElement);

      return () => observer.disconnect(); // Clean up observer
    }
  }, [id]);

  const handleToggleText = () => {
    setIsExpanded(!isExpanded);
  };

  const handleVideoClick = () => {
    const video = document.getElementById(`video-${id}`) as HTMLVideoElement;
    if (video) {
      if (video.paused) {
        video.play();
        setShowPlayPauseIcon("play");
      } else {
        video.pause();
        setShowPlayPauseIcon("pause");
      }
      setTimeout(() => setShowPlayPauseIcon(null), 900); // Hide after 1 second
    }
  };

  const handleToggleMuteGlobal = () => {
    const videos = document.querySelectorAll<HTMLVideoElement>("video");
    videos.forEach((video) => {
      video.muted = !isMutedGlobal;
    });
    setIsMutedGlobal(!isMutedGlobal);
  };

  const truncatedText = text.length > 88 ? text.slice(0, 88) : text;

  return (
    <div id={`PostMain-${id}`} className="flex flex-col items-center relative snap-start">
      <div className="relative bg-black max-w-screen-sm h-[80vh] rounded-lg overflow-hidden my-4">
        {/* Video Section */}
        <div
          onClick={handleVideoClick}
          className="relative cursor-pointer h-full flex items-center justify-center"
        >
          <video
            id={`video-${id}`}
            src={video_url}
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
        <div className="absolute bottom-4 left-4 z-10 text-white">
          <Link href={`/profile/${profile.user_id}`}>
            <div className="flex items-center mb-2">
              <img
                className="rounded-full w-10 h-10 object-cover border border-white"
                src={profile.image}
                alt={profile.name}
              />
              <span className="ml-2 font-bold hover:underline">
                {profile.name}
              </span>
            </div>
          </Link>
          <p className="text-sm text-zinc-300">
            {isExpanded ? text : truncatedText}
            {text.length > 88 && (
              <span
                onClick={handleToggleText}
                className="text-zinc-500 cursor-pointer ml-2"
              >
                {isExpanded ? "Ver menos" : "Ver mais"}
              </span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
