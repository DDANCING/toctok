
import { auth } from "@/auth";
import MainLayout from "./layouts/mainLayout";
import ClientOnly from "@/components/client-only";
import packageJson from "@/package.json";
import { getVideos } from "@/actions/get-post";
import PostMain from "@/components/post-main";
import { redirect } from "next/navigation";

const APP_VERSION: string = packageJson.version;

export default async function Home() {
  const user = await auth();
  const userId = user?.user.id;


  // Recupera os vídeos (dados fictícios de longitude e latitude podem ser passados ou omitidos)
  const videos = await getVideos();

  return (
    <MainLayout user={user}>
      <main className="h-screen w-full overflow-y-auto snap-y snap-mandatory no-scrollbar py-16">
        <ClientOnly>
        {videos.map((video) => (
        <div key={video.id} className="snap-center">
          
          <PostMain
            id={video.id}
            video_url={video.video_url}
            text={video.text}
            profile={video.profile}
            created_at={video.created_at}
            locale={video.locale}
            userId={userId || ""} 
          />
        </div>
      ))}
        </ClientOnly>
      </main>
     
    </MainLayout>
  );
}
