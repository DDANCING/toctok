import MainLayout from "@/app/layouts/mainLayout"
import { auth } from "@/auth";
import { Profile } from "./components/profile";
import { getUserById } from "@/data/user";

type Props ={
  params: {
    id: string;
  }
}
const profilePage = async ({params}: Props) => {
  const user = await auth()
  const userId = user?.user.id
  
  const getUser = await getUserById(params.id)

    return (
      <>
      <MainLayout user={user}>
        <Profile userId={userId || ""} id={params.id} img={getUser?.image || "TODO.svg"} name={getUser?.name || "User"}/>
      </MainLayout>
      </>
    )
}
export default profilePage;