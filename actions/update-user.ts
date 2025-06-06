"use server"

import { db } from "@/lib/db";
import cloudinary from 'cloudinary';


/**
 * @param userId - O ID do usuário.
 * @param newBio - O novo conteúdo da bio.
 * @returns Retorna o usuário atualizado ou lança um erro se algo falhar.
 */
export const updateUserBio = async (userId: string, newBio: string): Promise<object> => {
  try {
    const updatedUser = await db.user.update({
      where: {
        id: userId,
      },
      data: {
        bio: newBio,
      },
    });
    return updatedUser;
  } catch (error) {
    console.error("Erro ao atualizar a bio:", error);
    throw new Error("Não foi possível atualizar a bio.");
  }
};


cloudinary.v2.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Faz o upload de uma imagem para o Cloudinary, atualiza o link da imagem no banco de dados e retorna o usuário atualizado.
 * @param userId - O ID do usuário
 * @param image - A imagem a ser carregada (como arquivo)
 * @returns O usuário atualizado com a nova imagem.
 */
export async function updateUserImage(userId: string, image: File): Promise<object> {
  if (!image || !userId) {
      throw new Error('Imagem ou userId não fornecido.');
  }

  // Garantindo que a imagem seja convertida em um formato simples
  const arrayBuffer = await image.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);

  try {
      const uploadResult = await new Promise((resolve, reject) => {
          cloudinary.v2.uploader.upload_stream({
              folder: 'user_images', // Nome da pasta no Cloudinary
          }, (error, result) => {
              if (error) {
                  reject(error);
              } else {
                  resolve(result);
              }
          }).end(buffer);
      });

      const uploadedImageUrl = (uploadResult as any).secure_url;

      if (!uploadedImageUrl) {
          throw new Error('Falha ao obter a URL da imagem do Cloudinary.');
      }

      // Transformando o objeto de retorno do banco de dados em um objeto simples
      const updatedUser = {
          id: userId,
          image: uploadedImageUrl
      };

      return updatedUser;
  } catch (error) {
      console.error('Erro ao fazer upload ou atualizar banco de dados:', error);
      throw new Error('Não foi possível processar a solicitação.');
  }
}