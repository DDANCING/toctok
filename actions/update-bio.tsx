import { db } from "@/lib/db";// Certifique-se de ajustar o caminho para o cliente Prisma

/**
 * Atualiza a bio do usuário no banco de dados.
 * @param userId - O ID do usuário.
 * @param newBio - O novo conteúdo da bio.
 * @returns Retorna o usuário atualizado ou lança um erro se algo falhar.
 */
export const updateUserBio = async (userId: string, newBio: string): Promise<object> => {
  try {
    const updatedUser = await db.user.update({
      where: {
        id: userId
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
