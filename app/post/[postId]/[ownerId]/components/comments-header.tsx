"use client"

import { Pin, PostWithProfile } from "@/app/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale"; 
import { BiLoader } from "react-icons/bi";
import { Button } from "@/components/ui/button";

import { FaMapMarkerAlt, FaMapPin, FaShare, FaTrash } from "react-icons/fa";
import ClientOnly from "@/components/client-only";
import { FiLoader } from "react-icons/fi";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CommentsHeaderProps {
  userId: string;
  params: { ownerId: string; postId: string; };
  post: PostWithProfile;
}
export default function CommentsHeader({userId, post, params }: CommentsHeaderProps) {
  const router = useRouter();
  const [hasClickedPinned, setHasClickedPinned] = useState<boolean>(false);
  const [isDeleteing, setIsDeleteing] = useState(false)
  const [userPinned, setUserPinned] = useState(false)
  const [pins, setPins] = useState<Pin[]>([]); 

  const deletePost = () => {
    console.log('deletePost')
    setIsDeleteing(true)
  }
  const pinnedOrUnpinned = () => {
    console.log('pinnedOrUnpinned')
  }

  return (
    <>
      <div className="flex items-center justify-between px-8"> 
        <div className="flex items-center">
          <Link href={`/profile/${post.profile.user_id}`}>
            {post.profile.image ? (
              <img className="rounded-full lg:mx-0 mx-auto" src={post.profile.image} width={40} />
            ):(
              <img className="rounded-full lg:mx-0 mx-auto" src="/profile-default.svg" width={40} />
            )}
          </Link>
          <div className="ml-3 pt-0.5">
            <Link
            href={`/profile/${post.profile.user_id}`}
            className="relative z-10 text-[17px] font-semibold hover:underline"
            >
              {post.profile.name}
            </Link>
            <div className="relative z-0 text-[13px] -mt-5 font-light">
              <span className="relative -top-[2px] text-[30px] pl-1 pr-0.5">.</span>
              <span className="font-medium">
          {formatDistanceToNow(new Date(post.created_at), { 
            addSuffix: true, 
            locale: ptBR // Passa o idioma desejado 
          })}
        </span>
            </div>
          </div>
        </div>
        {params.ownerId === userId ? (
          <div>
            {isDeleteing? (
              <BiLoader className="animate-spin" size={25} />
            ):(
              <Button variant={"destructive"} disabled={isDeleteing} onClick={() => deletePost()}>
                <FaTrash className="cursor-pointer" size={25} />
              </Button>
            )}
          </div>
        ) : 
        null
        }
      </div>
      <p className="px-8 mt-4 text-sm">{post.text}</p>
      <p className=" items-center px-8 mt-4 text-sm font-bold">
      {post.locale ? (
      <Link className="flex gap-2" href={`/map/${post.latitude}/${post.longitude}`}>
      <FaMapMarkerAlt size={17}/>
      {post.locale}
      </Link>
      ) : null
      }
      </p>

      <div className="flex items-center px-8 mt-8">
        <ClientOnly>
          <div className="pb-4 gap-2 text-center flex items-center">
            <Button
            disabled={hasClickedPinned}
            onClick={pinnedOrUnpinned}
            className="rounded-full bg-muted p-4 h-12"
            >
              {!hasClickedPinned ? (
              <FaMapPin
                className={`${pins.some((pin) => pin.post_id === post.id) ? "text-primary" : "text-foreground"}`}
                size={25}
              />
             ) : (
              <FiLoader className="animate-spin " />
             )}
             <span className="text-foreground font-semibold">
             {pins.length}
             </span>
           </Button>
          
          <Button
          onClick={() => router.push(`/post/${post.id}/${post.profile.user_id}`)}
          className="rounded-full bg-muted p-4 h-12 text-foreground"
        >
          <div className="">
            <FaShare size="25"/>
          </div>
          <span>
            1000
          </span>
        </Button>
        </div>
        </ClientOnly>
  
      </div>
     
    </>
  )
}