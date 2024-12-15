"use client";

import ClientOnly from "@/components/client-only";
import CommentsHeader from "./comments-header";
import { Comment, PostWithProfile } from "@/app/types";
import SideTabs from "./tabs-area";

interface CommentsSectionProps {
  comments: Comment[]; 
  userId: string; 
  post: PostWithProfile; 
  params: { ownerId: string; postId: string }; 
}

export default function CommentsSection({ comments, userId, post, params }: CommentsSectionProps) {
  return (
    <div id="InfoSection" className="lg:max-w-[550px] relative w-full h-full bg-background">
      <div className="py-7" />
      <ClientOnly>
        <CommentsHeader userId={userId} post={post} params={params} />
        <SideTabs userId={userId} post={post} comments={comments} params={params}/>
      </ClientOnly>
    </div>
  );
}
