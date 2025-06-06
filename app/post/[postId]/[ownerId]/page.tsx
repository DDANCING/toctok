import VideoSection from "./components/video-section";
import CommentsSection from "./components/comments-section";
import { getPostById } from "@/actions/get-post";
import { auth } from "@/auth";
import { getCommentsByPostId } from "@/actions/comments";

interface postPageTypes {
  params: {
    ownerId: string;
    postId: string;
  };
}

export default async function Post({ params }: postPageTypes) {
  const postById = await getPostById(params.postId); 
  const user = await auth(); 
  const rawComments = await getCommentsByPostId(params.postId); 

  
  const comments = rawComments.map((comment) => ({
    ...comment,
    user: {
      ...comment.user,
      name: comment.user.name || "Usuário desconhecido", 
      image: comment.user.image || "", 
    },
  }));

  return (
    <>
      <VideoSection ownerId={params.ownerId} post={postById} />
      <CommentsSection 
        comments={comments} 
        userId={user?.user.id || ""} 
        post={postById} 
        params={params} 
      />
    </>
  );
}
