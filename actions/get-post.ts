"use server";
import { PostWithProfile } from "@/app/types";
import { db } from "@/lib/db";

/**
 * Recupera vídeos com base na localização ou aleatoriamente.
 *
 * @param userId - O ID do usuário solicitante.
 * @param longitude - (Opcional) A longitude do usuário.
 * @param latitude - (Opcional) A latitude do usuário.
 * @returns Uma lista de vídeos com os campos especificados.
 */
export const getVideos = async (
  longitude?: number,
  latitude?: number
) => { 
  try {
    const searchRadiusKm = 20;

    const videos = longitude !== undefined && latitude !== undefined
      ? await db.listing.findMany({
          where: {
            latitude: {
              gte: latitude - searchRadiusKm / 111,
              lte: latitude + searchRadiusKm / 111,
            },
            longitude: {
              gte: longitude - searchRadiusKm / (111 * Math.cos(latitude * (Math.PI / 180))),
              lte: longitude + searchRadiusKm / (111 * Math.cos(latitude * (Math.PI / 180))),
            },
          },
          include: {
            owner: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
          },
        })
      : await db.listing.findMany({
          take: 10,
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

    return videos.map((video) => ({
      id: video.id,
      video_url: video.videoUrl,
      text: video.description,
      created_at: video.createdAt,
      locale: video.location,
      profile: {
        user_id: video.ownerId || "",
        name: video.owner.name || "",
        image: video.owner.image || "",
      },
    }));
  } catch (error) {
    console.error("[GET_VIDEOS] Erro ao carregar vídeos:", error);
    throw new Error("Erro ao carregar vídeos.");
  }
};


/**
 * Recupera um post com base no ID fornecido.
 * @param postId - O ID do post a ser recuperado.
 * @returns O post correspondente ao ID no formato PostWithProfile.
 */
export const getPostById = async (postId: string): Promise<PostWithProfile> => {
  try {
    // Validação do parâmetro
    if (!postId) {
      throw new Error("O parâmetro 'postId' é obrigatório.");
    }

    // Consulta ao banco de dados
    const post = await db.listing.findUnique({
      where: {
        id: postId,
      },
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

    // Verifica se o post foi encontrado
    if (!post) {
      throw new Error(`Post com ID ${postId} não encontrado.`);
    }

    // Mapeia os dados para o formato PostWithProfile
    const formattedPost: PostWithProfile = {
      id: post.id,
      video_url: post.videoUrl,
      text: post.title,
      created_at: post.createdAt,
      locale: post.location,
      latitude: post.latitude,
      longitude: post.longitude,
      profile: {
        user_id: post.owner.id,
        name: post.owner.name || "",
        image: post.owner.image || "",
      },
    };

    return formattedPost;
  } catch (error) {
    console.error("Erro ao buscar o post:", error);
    throw new Error("Não foi possível recuperar o post. Tente novamente mais tarde.");
  }
};