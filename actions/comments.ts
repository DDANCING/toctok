"use server";

import { db } from "@/lib/db";

/**
 * Recupera comentários de um post.
 *
 * @param postId - O ID do post.
 * @returns Uma lista de comentários associados ao post.
 */
export const getCommentsByPostId = async (postId: string) => {
  try {
    const comments = await db.comment.findMany({
      where: { postId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
      orderBy: { createdAt: "asc" },
    });

    return comments.map((comment) => ({
      id: comment.id,
      content: comment.content,
      createdAt: comment.createdAt,
      user: {
        id: comment.user.id,
        name: comment.user.name,
        image: comment.user.image,
      },
    }));
  } catch (error) {
    console.error("[GET_COMMENTS] Erro ao carregar comentários:", error);
    throw new Error("Erro ao carregar comentários.");
  }
};

/**
 * Adiciona um comentário a um post.
 *
 * @param postId - O ID do post.
 * @param userId - O ID do usuário.
 * @param text - O texto do comentário.
 * @returns O comentário criado.
 */
export const addComment = async (postId: string, userId: string, content: string) => {
  try {
    if (!postId || !userId || !content) {
      throw new Error("Parâmetros insuficientes para adicionar comentário.");
    }

    const newComment = await db.comment.create({
      data: {
        postId,
        userId,
        content,
      },
    });

    return newComment;
  } catch (error) {
    console.error("[ADD_COMMENT] Erro ao adicionar comentário:", error);
    throw new Error("Erro ao adicionar comentário.");
  }
};
