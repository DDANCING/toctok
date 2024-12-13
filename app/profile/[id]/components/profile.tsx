"use client";

import ClientOnly from "@/components/client-only";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { BsPencilFill } from "react-icons/bs";
import PostUser from "./post-user";
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerTrigger } from "@/components/ui/drawer";
import Settings from "@/app/settings/settings";

interface ProfileProps {
  userId: string;
  currentProfile: {
    id?: string;
    name: string;
    img: string;
    bio: string;
  };
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
  }[];
}

export const Profile = ({ currentProfile, userId, post }: ProfileProps) => {
  // Verifica se a conta existe
  if (!currentProfile.id) {
    return (
      <div className="flex flex-col items-center pt-10">
        <h1 className="text-2xl font-bold">Não foi possível localizar esta conta</h1>
        <h2 className="text-lg text-muted-foreground mt-2">
          O que você está procurando? Experimente navegar pelas abas de busca.
        </h2>
      </div>
    );
  }

  return (
    <div className="pt-[90px] 2xl:pl-[185px] lg:pl-[160px] lg:pr-0 w-[calc(100%-50px)] pr-3 2xl:mx-auto">
      <div className="flex w-[calc(100vw-230px)]">
        {/* Foto de Perfil */}
        <ClientOnly>
          <img
            className="w-[120px] min-w-[120px] rounded-full"
            alt={currentProfile.name}
            src={currentProfile.img || "/profile-default.svg"}
          />
        </ClientOnly>

        {/* Informações do Perfil */}
        <div className="ml-5 w-full">
          <ClientOnly>
            {currentProfile.name ? (
              <h1 className="text-3xl font-bold">{currentProfile.name}</h1>
            ) : (
              <div className="h-[60px]" />
            )}
          </ClientOnly>

          {/* Botão de Ação */}
          {userId === currentProfile.id ? (
             
              <Drawer direction="left">
              <DrawerTrigger asChild>
              <Button className="flex items-center rounded-md py-1.5 px-3.5 mt-3" variant="outline">
              <BsPencilFill className="mt-0.5 mr-1" size={18} />
              <span>Editar Perfil</span>
            </Button>
              </DrawerTrigger>
              <DrawerContent  className="w-[50%]">
               <Settings/>
              </DrawerContent>
            </Drawer>

          
          ) : (
           
            <Button className="flex items-center rounded-md py-1.5 px-8 mt-3 text-[15px] font-semibold">
              Seguir
            </Button>
          

            
          )}

          {/* Estatísticas */}
          <div className="flex items-center pt-4">
            <div className="mr-4">
              <span className="font-semibold">10k</span>
              <span className="text-muted-foreground font-light text-[15px] pl-1.5">Seguindo</span>
            </div>
            <div className="mr-4">
              <span className="font-semibold">44k</span>
              <span className="text-muted-foreground font-light text-[15px] pl-1.5">Seguidores</span>
            </div>
          </div>

          {/* Biografia */}
          <ClientOnly>
            <p className="pt-4 text-muted-foreground font-light text-[15px] max-w-[500px]">
              {currentProfile.bio}
            </p>
          </ClientOnly>
        </div>
      </div>

      {/* Abas de Conteúdo */}
      <Tabs defaultValue="video" className="w-full mt-4 ">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger
            className="bg-background font-bold border-b-2 border-transparent data-[state=active]:border-foreground"
            value="video"
          >
            Vídeos
          </TabsTrigger>
          <TabsTrigger
            className="bg-background font-bold border-b-2 border-transparent data-[state=active]:border-foreground"
            value="pinned"
          >
            Marcados
          </TabsTrigger>
        </TabsList>

        {/* Conteúdo da Aba de Vídeos */}
        <TabsContent value="video">
          <Card className="w-full bg-background">
            <CardContent className="space-y-2 ">
            
              {post.length >= 1 ? (
                    <div className="mt-4 grid xl:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-3">
                   {post.map((item) => (
                  <PostUser key={item.id} userId={userId} post={item} />
                ))}
                  </div>
                ) : (
                  <div >
                    <p className="mt-4 text-muted-foreground">Usuario não tem conteúdo.</p>
                  </div>
                )}
                
             
            </CardContent>
          </Card>
        </TabsContent>

        {/* Conteúdo da Aba de Marcados */}
        <TabsContent value="pinned">
          <Card className="w-full bg-background ">
          <CardContent className="space-y-2">
             
                {!true ? (
                    <div className=" mt-4 grid xl:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-3">
                  videos
                  </div>
                ) : (
                  <div >
                    <p className="mt-4 text-muted-foreground">Nenhum conteúdo marcado.</p>
                  </div>
                )}
             
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
