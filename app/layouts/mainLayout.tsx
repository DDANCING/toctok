"use client";
import React from "react";
import { usePathname } from "next/navigation";
import TopNav from "./includes/topNav";
import { Session } from "next-auth";
import SideNavMain from "./includes/sideNaviMain";

// Define o tipo das props do layout
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
        className={`flex justify-between mx-auto w-full lg:px-2.5 px-0 ${
          pathname === "/" ? "max-w-[1140px]" : ""
        }`}
      >

        <div className="w-1/4 lg:w-1/5 ">
          <SideNavMain user={userId ? { id: userId } : null} />
        </div>


        <div className="flex-1 px-4">
          {children}
        </div>


        <div className="w-1/4 lg:w-1/5"></div>
      </div>
    </>
  );
}
