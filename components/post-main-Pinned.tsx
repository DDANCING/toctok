"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { FaCommentDots, FaMapPin, FaShare } from "react-icons/fa";
import { Comments, Pin } from "@/app/types";
import { FiLoader } from "react-icons/fi";
import { useRouter } from "next/navigation";



interface PostProps {
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

export default function PostMainPinned({ post }: PostProps) {

  const router = useRouter();

  const [hasClickedPinned, setHasClickedPinned] = useState<boolean>(false);
  const [userPined, setUserPinned] = useState<boolean>(false);
  const [comments, setComments] = useState<Comments[]>([])
  const [pins, setPins] = useState<Pin[]>([]); 

  const pinnedOrUnpinned = () => {
    console.log("pinnedOrUnpinned");
    setHasClickedPinned(!hasClickedPinned);
    if (hasClickedPinned) {
      setPins(pins.filter((pin) => pin.post_id !== post.id));
    } else {
      setPins([...pins, { id: "new-pin-id", user_id: "current-user-id", post_id: post.id }]);
    }
  };

  return (
    <div id={`PostMainPinned-${post.id}`} className="relative mr-[75px]">
      <div className="absolute bottom-0 pl-2">
        <div className="pb-4 text-center">
          <Button
            disabled={hasClickedPinned}
            onClick={pinnedOrUnpinned}
            className="rounded-full bg-muted-foreground/50 p-4 h-12"
          >
            {!hasClickedPinned ? (
              <FaMapPin
                className={`${pins.some((pin) => pin.post_id === post.id) ? "text-foreground/50" : ""}`}
                size={25}
              />
            ) : (
              <FiLoader className="animate-spin " />

            )}
            <span className=" font-semibold">
            {pins.length}
          </span>
          </Button>
          
        </div>
        <div className="pb-4 text-center">
        <Button
          onClick={() => router.push(`/post/${post.id}/${post.profile.user_id}`)}
          className="rounded-full bg-muted-foreground/50 p-4 h-12"
        >
          <div className="">
            <FaCommentDots size="25"/>
          </div>
          <span>
            {comments.length}
          </span>
        </Button>
        </div>
        <div className="pb-4 text-center">
        <Button
          onClick={() => router.push(`/post/${post.id}/${post.profile.user_id}`)}
          className="rounded-full bg-muted-foreground/50 p-4 h-12"
        >
          <div className="">
            <FaShare size="25"/>
          </div>
          <span>
            1000
          </span>
        </Button>
        </div>
      </div>
    </div>
  );
}
