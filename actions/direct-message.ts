"use server";

import { db } from "@/lib/db";

// Action para buscar mensagens
export async function getMessages(userId: string, ownerId: string) {
  const messages = await db.message.findMany({
    where: {
      OR: [
        { senderId: userId, receiverId: ownerId },
        { senderId: ownerId, receiverId: userId },
      ],
    },
    orderBy: { createdAt: "asc" },
  });
  return messages;
}

// Action para enviar mensagem
export async function sendMessage(senderId: string, receiverId: string, content: string) {
  const message = await db.message.create({
    data: { senderId, receiverId, content },
  });
  return message;
}
