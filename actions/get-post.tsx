"use server";
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
