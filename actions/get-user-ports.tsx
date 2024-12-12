import { db } from "@/lib/db";

export const getUserPosts = async (userId: string) => {
  try {
    if (!userId) {
      throw new Error("ID do usuário não fornecido.");
    }

    const posts = await db.listing.findMany({
      where: { ownerId: userId },
      orderBy: { createdAt: "desc" },
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    });

    return posts.map((post) => ({
      id: post.id,
      video_url: post.videoUrl || "", // Inclua este campo, se disponível no banco
      text: post.description || "",
      created_at: post.createdAt,
      locale: post.location || "",
      profile: {
        user_id: post.ownerId || "",
        name: post.owner.name || "",
        image: post.owner.image || "",
      },
    }));
  } catch (error) {
    console.error("[GET_USER_POSTS] Erro ao carregar posts:", error);
    throw new Error("Erro ao carregar posts do usuário.");
  }
};
