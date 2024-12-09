"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import MenuItem from "./menuItem";
import ClientOnly from "@/components/client-only";
import MenuItemFollow from "./menu-item-follow";

// Define o tipo para `user` e `userId`
type UserProps = {
  user: {
    id: string;
  } | null;
};

export default function SideNavMain({ user }: UserProps) {
  const pathname = usePathname();

  const userId = user?.id;

  return (
    <>
      <div
        id="SideNavMain"
        className={`fixed left-0 z-20 bg-background pt-[70px] h-full w-[75px] overflow-auto
          ${pathname === "/" ? "lg:w-[310px]" : "lg:w-[220px]"}`}
      >
        <div className="lg:w-full w-[55px] mx-auto">
          <Link href="/">
            <MenuItem
              iconString="Sua localização"
              colorString={pathname == "/" ? "#22c55e" : ""}
              sizeString="25"
            />
          </Link>
          <MenuItem
              iconString="Seguindo"
              colorString={pathname == "/" ? "muted" : ""}
              sizeString="25"
            />
            <MenuItem
              iconString="LIVE"
              colorString={pathname == "/" ? "muted" : ""}
              sizeString="25"
            />
            <div className="border-b lg:ml-2 mt-2" />
            <h3 className="lg:block hidden text-muted-foreground font-semibold pt-4 pb-2 px-2" >
            últimas pesquisas
            </h3>
            <div className="lg:hidden block pt-3"/>
            <ClientOnly>
              <div className="cursor-pointer">
                 <MenuItemFollow id="1" title="Titulo" locale="localização " image="https://placehold.co/50"/>
              </div>
            </ClientOnly>
        </div>
      </div>
    </>
  );
}
