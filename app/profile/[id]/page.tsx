import MainLayout from "@/app/layouts/mainLayout"
import { auth } from "@/auth";
import { Profile } from "./components/profile";
import { getUserById } from "@/data/user";
import { getUserPosts } from "@/actions/get-user-ports";

type Props ={
  params: {
    id: string;
  }
}
const profilePage = async ({ params }: Props) => {
  const user = await auth();
  const userId = user?.user.id;

  const getUser = await getUserById(params.id);
  const getPost = await getUserPosts(params.id)
  const currentProfile = getUser
    ? {
        id: getUser.id,
        name: getUser.name || "Usuário sem nome",
        img: getUser.image || "/default-profile.png", // Substitua pelo caminho da imagem padrão
        bio: getUser.bio || "Este usuário não possui uma biografia.",
        profile: {
          
        }
      }
    : {
        name: "Conta não encontrada",
        img: "/default-profile.png",
        bio: "",
      };

  return (
    <MainLayout user={user}>
      <Profile post={getPost} userId={userId || ""} currentProfile={currentProfile} />
    </MainLayout>
  );
};

export default profilePage