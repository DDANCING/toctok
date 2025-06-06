"use client";

import { LoginButton } from "@/components/auth/login-button";
import { RegisterButton } from "@/components/auth/register-button";
import { ProfileOptions } from "@/components/auth/user-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { BiSearch } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import { FaHouseChimneyMedical } from "react-icons/fa6";
import { BsHouses } from "react-icons/bs";


// Define o tipo para `user` e `userId`
type UserProps = {
  user: {
    id: string;
  } | null;
};

export default function TopNav({ user }: UserProps) {
  const router = useRouter();
  const pathname = usePathname();

  const userId = user?.id;

  const handleSearchName = (event: {target: {value: string}}) => {
       console.log(event.target.value)
  }
  const goTo = () => {
    console.log('here')
  }

  return (
    <>
      <div
        id="TopNav"
        className="fixed bg-background z-30 flex items-center justify-between w-full h-[60px]"
      >
        <div
          className={`flex items-center justify-between gap-6 w-full px-4 mx-auto ${
            pathname === "/" ? "max-w-[1150px]" : ""
          }`}
        >
          <Link className="flex items-center gap-2" href="/">
           <Button className="w-10 h-10"> <BsHouses /> </Button> <h1 className="font-bold text-xl">toctok</h1>
          </Link>
        </div>

        <div className=" relative hidden md:flex items-center justify-end border border-muted-foreground/20 rounded-full max-w-[430px] w-full mx-4">
          <Input
            type="text"
            onChange={handleSearchName}
            className="w-full text-[15px] focus:outline-none border-none rounded-full"
            placeholder="search"
          />
          <div className="px-3 py-1 flex items-center">
           <BiSearch className="text-muted-foreground" size="22" />
        </div>
           <div className="absolute hidden bg-muted max-w-[910px] h-auto w-full z-20 left-0 top-12 border p-1">
          <div className="p-1">
            <Link
               href={`/profile/1`}
               className="flex items-center justify-between w-full cursor-pointer rounded-md hover:bg-primary/50 text-muted-foreground p-1 px-2 hover:text-foreground"
            >
              
              <div className="flex items-center">
                <img className=" rounded-md" width={40} height={40} src="https://placehold.co/40" alt=""/>
                <h1 className="truncate ml-2"> local </h1>
              </div>
            </Link>
          </div>
          
        </div>

        </div>
       
        <div className="flex w-full justify-end p-4 z-10">
      
          {!userId ? (
            
            <div className="flex ">
              <LoginButton mode="modal" asChild>
                <Button
                  className="w-40 bg-transparent border-primary mr-2"
                  variant={"outline"}
                >
                  Sign in
                </Button>
              </LoginButton>
              
              <RegisterButton mode="modal" asChild>
                <Button className="w-40 bg-muted lg:block hidden" variant={"secondary"}>
                  Register
                </Button>
              </RegisterButton>
              
            </div>
            
          ) : (
            <div className="w-44 flex items-center gap-3">
              <div className="flex items-center gap-3">
          <Button 
          onClick={() => goTo()}
          className="flex items-center border rounded-sm py-[6px] pl-1.5"
          variant="outline"
          >
             <FaHouseChimneyMedical size="22"/>
             <Link href={"/upload"}>
             <span className="px-2 font-medium text-[15px]">Novo</span>
             </Link>
          </Button>
        </div>
              <ProfileOptions />
            </div>
          )}
        </div>
      </div>
    </>
  );
}