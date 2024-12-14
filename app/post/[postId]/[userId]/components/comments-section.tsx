"use client";

import ClientOnly from "@/components/client-only";

interface CommentsSectionProps {
  post: any;
  params: { userId: string; postId: string };
}

export default function CommentsSection({ post, params }: CommentsSectionProps) {
  return (
    <div id="InfoSection" className="lg:max-w-[550px] relative w-full h-full bg-background">
      <div className="py-7" />
      <ClientOnly><div></div></ClientOnly>
    </div>
  );
}
