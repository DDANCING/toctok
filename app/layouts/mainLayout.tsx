"use client";
import React from "react";
import { usePathname } from "next/navigation";
import TopNav from "./includes/topNav";
import { Session } from "next-auth";
import SideNavMain from "./includes/sideNaviMain";


type MainLayoutProps = {
  children: React.ReactNode;
  user: Session | null;
};

export default function MainLayout({ children, user }: MainLayoutProps) {
  const pathname = usePathname();

  const userId = user?.user?.id ?? null;

  return (
    <>
      <TopNav user={userId ? { id: userId } : null} />
      <div
        className={`flex justify-between max-h-screen mx-auto w-full lg:px-2.5 px-0 ${
          pathname === "/" ? "max-w-[1140px]" : ""
        }`}
        style={{
          maxWidth: "100vw", 
          overflow: "hidden", 
        }}
      >
        {/* Sidebar esquerda */}
        <div className="hidden lg:block w-1/4 lg:w-1/5">
          <SideNavMain user={userId ? { id: userId } : null} />
        </div>

        {/* Conteúdo principal */}
        <div
          className="flex-1 px-4"
          style={{
            maxWidth: "100%", 
            overflow: "hidden", 
          }}
        >
          <div className="max-w-full max-h-full mx-auto">
            {children}
          </div>
        </div>

        {/* Sidebar direita (espaço vazio ou anúncios) */}
        <div className="hidden lg:block w-1/4 lg:w-1/5"></div>
      </div>
    </>
  );
}
