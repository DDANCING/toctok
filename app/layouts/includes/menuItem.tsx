"use client"
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaMapPin } from "react-icons/fa";
import { RiLiveFill } from "react-icons/ri";


interface MenuItemsTypes {
  iconString: string,
  colorString: string,
  sizeString: string,
}

export default function  MenuItem({ iconString, colorString, sizeString }: MenuItemsTypes) {

  const icons = () => {
    if (iconString == 'Sua localização') return <FaMapMarkerAlt size={sizeString} color={colorString}/>
    if (iconString == 'Seguindo') return <FaMapPin size={sizeString} color={colorString}/>
    if (iconString == 'LIVE') return <RiLiveFill size={sizeString} color={colorString}/>
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