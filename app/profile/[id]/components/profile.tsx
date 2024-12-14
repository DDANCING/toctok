"use client";

import ClientOnly from "@/components/client-only";
import { Cropper } from 'react-advanced-cropper';
import 'react-advanced-cropper/dist/style.css'
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { BsPencilFill } from "react-icons/bs";
import PostUser from "./post-user";
import { Drawer, DrawerClose, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import Settings from "@/app/settings/settings";
import { useState } from "react";
import { updateUserBio, updateUserImage } from "@/actions/update-user";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Pencil1Icon } from "@radix-ui/react-icons";
import { CropperDimensions } from "@/app/types";
import { BiLoaderCircle } from "react-icons/bi";


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
  const [file, setFile] = useState<File | null>(null);
  const [newBio, setNewBio] = useState(currentProfile.bio);
  const [isUpdating, setIsUpdating] = useState(false);
  const [userImage, setUserImage] = useState<string | "">(currentProfile.img)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [cropper, setCropper] = useState<CropperDimensions | null>(null);

  
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


  const handleUpdateBio = async () => {
    setIsUpdating(true);
    try {
      await updateUserBio(userId, newBio);
      toast.success("Biografia atualizada com sucesso!");
    } catch (error) {
      toast.error("Erro ao atualizar bio");
    } finally {
      setIsUpdating(false);
    }
  };

  const getUploadedImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    
    const selectedFile = event.target.files && event.target.files[0];

    if (selectedFile) {
      setFile(selectedFile)
      setUploadedImage(URL.createObjectURL(selectedFile))
    }  else {
      setFile(null);
      setUploadedImage(null);
  }
  };

  const cropAndUpdateImage = async () => {
   
  };

  return (
    <div className="pt-[90px] 2xl:pl-[185px] lg:pl-[160px] lg:pr-0 w-[calc(100%-50px)] pr-3 2xl:mx-auto">
      <div className="flex w-[calc(100vw-230px)]">
        {/* Foto de Perfil */}
        <ClientOnly>
        <div className="relative group">
  <img
    className={`w-[120px] min-w-[120px] rounded-full ${
      userId === currentProfile.id ? 'cn' : ''
    }`}
    alt={currentProfile.name}
    src={userImage || "/profile-default.svg"}
  />
  {userId === currentProfile.id && (
     <Dialog>
        <DialogTrigger asChild>
    <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <BsPencilFill className="text-white text-2xl" />
    </div>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[425px] h-full">
          <DialogHeader>
            <DialogTitle>Editar Foto</DialogTitle>
            <DialogDescription>
              Atualize sua foto e clique em "Salvar".
            </DialogDescription>
          </DialogHeader>
          {!uploadedImage ? (
         <div className="flex items-center justify-center sm:mt-6">
         <label htmlFor="image" className="relative cursor-pointer rounded-full">
           <img
             alt={currentProfile.name}
             src={uploadedImage || userImage || "/profile-default.svg"}
             className="rounded-full"
             width={200}
           />
           <Button className="absolute bottom-0 right-0 rounded-full shadow-xl border p-1 inline-block w-[32px] h-[32px]">
             <BsPencilFill size={17} className="ml-0.5" />
           </Button>
         </label>
         <input
           className="hidden"
           type="file"
           id="image"
           onChange={getUploadedImage}
           accept="image/png, image/jpeg, image/jpg"
         />
       </div> 
       ) : (
             <div className="w-full max-h-[420px] mx-auto bg-black circle-stencil">
            <Cropper
            stencilProps={{ aspectRatio: 1 }}
            className="h-[200px]"
            onChange={(cropper) => setCropper(cropper.getCoordinates())}
            src={uploadedImage}
            />
         </div>
          )}
          <DialogFooter>
          <div 
           id="ButtonSection" 
           className="absolute p-5 left-0 bottom-0 border-t border-t-gray-300 w-full"
       >
           {!uploadedImage ? (
               <div id="UpdateInfoButtons" className="flex items-center justify-end">

                 <Button 
                       disabled={isUpdating}
                       
                       className="flex items-center border rounded-sm px-3 py-[6px]"
                   >
                       <span className="px-2 font-medium text-[15px]">Cancel</span>
                   </Button>

                 <Button 
                       disabled={isUpdating}
                      
                       className="flex items-center text-white border rounded-md ml-3 px-3 py-[6px]"
                   >
                       <span className="mx-4 font-medium text-[15px]">
                           {isUpdating ? <BiLoaderCircle color="#ffffff" className="my-1 mx-2.5 animate-spin" /> : "Save" }
                       </span>
                   </Button>

             </div>
           ) : (
               <div id="CropperButtons" className="flex items-center justify-end" >

                 <button 
                       onClick={() => setUploadedImage(null)}
                       className="flex items-center border rounded-sm px-3 py-[6px] hover:bg-gray-100"
                   >
                       <span className="px-2 font-medium text-[15px]">Cancel</span>
                   </button>

                 <Button 
                       onClick={() => cropAndUpdateImage()}
                       className="flex items-center text-white border rounded-md ml-3 px-3 py-[6px]"
                   >
                       <span className="mx-4 font-medium text-[15px]">
                           {isUpdating ? <BiLoaderCircle color="#ffffff" className="my-1 mx-2.5 animate-spin" /> : "Apply" }
                       </span>
                   </Button>

             </div>
           )}
       </div>
          </DialogFooter>
        </DialogContent>
    </Dialog>
  )}
</div>
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
              <DrawerContent  className="w-full md:w-[50%]">
                <DrawerClose>X</DrawerClose>
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
  <div className="flex items-center pt-4 gap-3">
    <p className="text-muted-foreground font-light text-[15px] max-w-[500px]">
      {newBio || currentProfile.bio}
    </p>
    {userId === currentProfile.id ? (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="link" size="sm">
            Edit
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Editar Bio</DialogTitle>
            <DialogDescription>
              Atualize sua biografia e clique em "Salvar".
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="bio" className="text-right">
                Bio
              </Label>
              <textarea
                id="bio"
                value={newBio}
                onChange={(e) => setNewBio(e.target.value)}
                className="col-span-3 border rounded-md p-2 text-sm"
                placeholder="Digite sua nova bio. Use markdown para formatação, como **negrito** ou [link](https://exemplo.com)."
                rows={5} // Define a altura
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleUpdateBio} disabled={isUpdating}>
              {isUpdating ? "Salvando..." : "Salvar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    ) : null}
  </div>
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
