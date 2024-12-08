"use client";
import React from "react";
import { usePathname } from "next/navigation";
import TopNav from "./includes/topNav";
import { Session } from "next-auth"; // Importe o tipo correto do `next-auth`
import SideNavMain from "./includes/sideNaviMain";

// Define o tipo das props do layout
type MainLayoutProps = {
  children: React.ReactNode;
  user: Session | null;
};

export default function MainLayout({ children, user }: MainLayoutProps) {
  const pathname = usePathname();

  // Extrai o `id` do `user`, se disponível
  const userId = user?.user?.id ?? null;

  return (
    <>
      {/* Passa o `userId` extraído para o TopNav */}
      <TopNav user={userId ? { id: userId } : null} />
      <div
        className={`flex justify-between mx-auto w-full lg:px-2.5 px-0 ${
          pathname === "/" ? "max-w-[1140px]" : ""
        }`}
      >
        <SideNavMain user={userId ? { id: userId } : null} />
        {children}
      </div>
    </>
  );
}
