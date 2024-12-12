
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { AiOutlineLoading } from "react-icons/ai";

interface PostUserProps {
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
  }
  };
}

export default function PostUser({ post }: PostUserProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMutedGlobal, setIsMutedGlobal] = useState(true); 
  const [showPlayPauseIcon, setShowPlayPauseIcon] = useState<"play" | "pause" | null>(null);

  useEffect(() => {
    const video = document.getElementById(`video${post.id}`) as HTMLVideoElement;

    setTimeout(() => {
      video.addEventListener('mouseenter',  () => { video.play() })
      video.addEventListener('mouseleave',  () => { video.pause() })
    }, 50)
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

  const truncatedText = post.text.length > 88 ? post.text.slice(0, 88) : post.text;

  return (
    <div className="relative brightness-90 hover:brightness-[1.1] cursor-pointer mt-2">
      {!post.video_url ? (
        <div className="absolute flex items-center justify-center top-0 left-0 aspect-[3/4] w-full object-cover rounded-md bg-black"
        >
          <AiOutlineLoading className="animate-spin ml-1" size={80} color="#FFF"/>
        </div>
      ) : (
        <Link href={`/post/${post.id}/${post.profile.user_id}`}>
          <video 
          id={`video${post.id}`}
          src={post.video_url}
          muted
          loop
          className="aspect-[3/4] object-cover rounded-md"
          />
        </Link>
      )}
      <div className="px-1">

      </div>
    </div>
  );
}
