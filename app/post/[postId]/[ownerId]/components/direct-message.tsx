"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getMessages, sendMessage } from "@/actions/direct-message";
import { Message } from "@/app/types";

interface ChatProps {
  userId: string;
  ownerId: string;
}

export default function Chat({ userId, ownerId }: ChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    // Função para buscar mensagens
    async function fetchMessages() {
      const data: Message[] = await getMessages(userId, ownerId);
      setMessages(data);
    }

    // Primeira busca ao carregar o componente
    fetchMessages();

    // Intervalo para verificar novas mensagens a cada 1 segundo
    const interval = setInterval(fetchMessages, 1000);

    // Cleanup do intervalo ao desmontar o componente
    return () => clearInterval(interval);
  }, [userId, ownerId]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;
    const message: Message = await sendMessage(userId, ownerId, newMessage);
    setMessages((prev) => [...prev, message]);
    setNewMessage("");
  };

  return (
    <Card className="flex flex-col justify-between h-[50vh] p-4">
      <CardContent className="flex flex-col overflow-y-auto space-y-2 no-scrollbar">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`mt-4 p-2 rounded break-words w-5/12 ${
              msg.senderId === userId
                ? "bg-primary text-foreground self-start"
                : "bg-muted self-end"
            }`}
          >
            {msg.content}
          </div>
        ))}
      </CardContent>
      <CardFooter className="flex items-center space-x-2">
        <Input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Digite sua mensagem..."
        />
        <Button onClick={handleSendMessage}>Enviar</Button>
      </CardFooter>
    </Card>
  );
}
