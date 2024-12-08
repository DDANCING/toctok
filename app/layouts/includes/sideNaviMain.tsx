"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import MenuItem from "./menuItem";



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
    className={`
        fixed z-20 bg-background pt-[70px] h-full lg:border-r-0 border-r w-[75px] overflow-auto
        ${pathname === '/' ? 'lg:w-[310px]' : 'lg:w-[220px]'}
      `}
    >
      <div className="lg:w-full w-[55px] mx-auto">
        <Link href="/">
          <MenuItem
              iconString="For You"
              colorString={pathname == '/' ? '#22c55e' : ''}
              sizeString="25"
          />
        </Link>
      </div>
    </div>
     </>
  );
}