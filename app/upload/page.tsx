
import UploadLayout from "../layouts/uploadLayout";
import { auth } from "@/auth";
import { Upload } from "./components/upload";

const UploadPage = async () => {

  const user = await auth();


  return (
    <UploadLayout user={user}>
      <Upload   />
    </UploadLayout>
  );
}

export default UploadPage;
