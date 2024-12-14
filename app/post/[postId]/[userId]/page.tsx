
import VideoSection from "./components/video-section";
import CommentsSection from "./components/comments-section";
import { getPostById } from "@/actions/get-post";

interface postPageTypes {
  params: {
    userId: string;
    postId: string;
  };
}

export default async function Post({ params }: postPageTypes) {
  const postById = await getPostById(params.postId);

  return (
      <>
      <VideoSection userId={params.userId} postId={params.postId} />
      <CommentsSection post={postById} params={params} />
      </>

  );
}
