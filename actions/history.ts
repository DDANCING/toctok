"use server";
import { db } from "@/lib/db";

/**
 * Salva uma nova ação no histórico do usuário.
 *
 * @param userId - O ID do usuário que realizou a ação.
 * @param action - Uma descrição ou nome da ação realizada.
 * @param listingId - (Opcional) O ID de uma listagem associada à ação.
 */
export const saveUserHistory = async (userId: string, action: string, listingId?: string) => {
  try {
    // Criação do registro no banco
    await db.userHistory.create({
      data: {
        userId,
        action,
        listingId: listingId || null, // Se não houver um `listingId`, salva como `null`
      },
    });
    
  } catch (error) {
    console.error("[SAVE_USER_HISTORY] Erro ao salvar histórico:", error);
  }
};

/**
 * Recupera o histórico de ações do usuário, com suporte à paginação.
 *
 * @param userId - O ID do usuário cujas ações devem ser recuperadas.
 * @param skip - O número de registros a ignorar (padrão: 0).
 * @param take - O número de registros a recuperar (padrão: 3).
 * @returns Uma lista de ações do histórico do usuário.
 */
export const getUserHistory = async (userId: string, skip: number = 0, take: number = 3) => {
  try {
    const history = await db.userHistory.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      skip,
      take,
      include: {
        listing: true,
      },
    });

    // Verifica duplicações locais (opcional, para debug)
    const uniqueHistory = history.filter(
      (item, index, self) => self.findIndex((h) => h.id === item.id) === index
    );

    return uniqueHistory;
  } catch (error) {
    console.error("[GET_USER_HISTORY] Erro ao recuperar histórico:", error);
    return [];
  }
};