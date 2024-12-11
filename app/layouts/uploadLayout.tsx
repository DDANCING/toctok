"use client";
import React from "react";
import { usePathname } from "next/navigation";
import TopNav from "./includes/topNav";
import { Session } from "next-auth"; // Importe o tipo correto do `next-auth`

// Define o tipo das props do layout
type UploadLayoutProps = {
  children: React.ReactNode;
  user: Session | null;
};

export default function UploadLayout({ children, user }: UploadLayoutProps) {
  const pathname = usePathname();

  // Extrai o `id` do `user`, se disponível
  const userId = user?.user?.id ?? null;

  return (
    <>
     <div className="bg-background flex justify-between max-h-screen mx-auto w-full">
        <TopNav user={userId ? { id: userId } : null} /> 
        <div className="flex justify-between mx-auto w-full px-2 max-w-[1140px]">
          {children}
        </div>
     </div>
     
    </>
  );
}
