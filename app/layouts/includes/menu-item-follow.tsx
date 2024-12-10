import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface Props {
  id: string,
  title: string, 
  locale: string,
  image: string,
}
export default function MenuItemFollow({image, locale, title, id} : Props) {
  return (
   <> 
   <Link
    href={`/profile/${id}`}
    className="m-1 flex items-center hover:bg-primary/50 rounded-md w-full py-1.5 px-2 max-w-[316px]"
   >
      <img className="rounded-md lg:mx-0 mx-auto" src={image} alt={title} width={50} height={50}/>
      <div className="lg:pl-2.5 lg:block hidden">
        <div className="flex items-center">
          <p className="font-bold text-[14px] break-words">
            {title}
          </p>
        </div>
        <p className="font-light text-[12px] text-muted-foreground">
          {locale}
        </p>
      </div>
   </Link>
    </>
  )
}