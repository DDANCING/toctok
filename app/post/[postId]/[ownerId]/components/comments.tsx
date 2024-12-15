import { useState, useEffect } from "react";
import ClientOnly from "@/components/client-only";
import { Comment } from "@/app/types";
import { BiLoader } from "react-icons/bi";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface CommentsProps {
  comment: Comment[];
  params: { ownerId: string; postId: string };
}

export default function Comments({ params, comment }: CommentsProps) {
  const [comments, setComments] = useState<Comment[]>([]); // Define o estado para os comentários
  const [loading, setLoading] = useState(true); // Define o estado de carregamento

  useEffect(() => {
    // Define os comentários no estado local e desativa o carregamento
    setComments(comment);
    setLoading(false);
  }, [comment]);

  return (
    <Card
      id="Comments"
      className="relative bg-muted z-0 w-full h-[calc(100%-273px)] overflow-auto "
    >
      <div className="pt-2" />
     <CardContent>
      <ClientOnly>
        {loading ? (
          <BiLoader className="animate-spin"/> 
        ) : comments.length === 0 ? (
          <div className="text-center mt-6 text-xl text-muted-foreground">
            <p>Ainda não há comentários</p> 
          </div>
        ) : (
          <div>
            {comments.map((comment, index) => (
              <div key={index} className="p-2 border-b">
                <p className="font-bold">{comment.user.name}</p> 
                <p>{comment.content}</p> 
              </div>
            ))}
          </div>
        )}
      </ClientOnly>
      </CardContent>
      <CardFooter className="gap-2">
        
        <Input
        className="border border-black"
        type={"text"}
        />
        <Button className="hover:bg-primary" variant={"ghost"}>
          Comentar
        </Button>
      </CardFooter>
    </Card>
  );
}
