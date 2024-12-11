import { useRouter } from "next/navigation"
import { useState } from "react"
import { UploadError } from "../types";
import UploadLayout from "../layouts/uploadLayout";
import { auth } from "@/auth";
import { Upload } from "./components/upload";


const uploadPage = async () => {
  const user = await auth()

  

  
return (

    <UploadLayout  user={user}>
    <Upload />
    </UploadLayout>

)
}
export default uploadPage;