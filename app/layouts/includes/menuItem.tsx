"use client"
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaMapPin } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { MdExplore, MdOutlineExplore } from "react-icons/md";
import { RiUserFollowFill } from "react-icons/ri";


interface MenuItemsTypes {
  iconString: string,
  colorString: string,
  sizeString: string,
}

export default function  MenuItem({ iconString, colorString, sizeString }: MenuItemsTypes) {
 
  const icons = () => { 
    if (iconString == 'Explorar') return <MdExplore size={sizeString} color={colorString}/>
    if (iconString == 'Sua localização') return <FaMapMarkerAlt size={sizeString} color={colorString}/>
    if (iconString == 'Marcados') return <FaMapPin size={sizeString} color={colorString}/>
    if (iconString == 'Seguindo') return <RiUserFollowFill size={sizeString} color={colorString}/>
    if (iconString == 'Mensagens') return <IoSend size={sizeString} color={colorString}/>
  }
  return (
    <>
    <div className="w-full flex items-center hover:bg-muted p-2.5 rounded-md">
      <div className="flex items-center lg:mx-0 mx-auto">

          {icons()}

          <p className={`lg:block hidden pl-[9px] mt-0.5 font-semibold text-[17px] text-[${colorString}]`}>
              {iconString}
          </p>
      </div>
    </div>
    </>
  )
}