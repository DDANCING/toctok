import { Comment, PostWithProfile } from "@/app/types";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Comments from "./comments";
import MapWithMarker from "@/components/map";
import Chat from "./direct-message";

interface SideTabs {
  userId: string;
  post: PostWithProfile;
  comments: Comment[];
  params: { ownerId: string; postId: string };
}
export default function SideTabs({ post, comments, params, userId }: SideTabs) {
  return(
<div className="flex flex-col items-center justify-center">
<Tabs defaultValue="comments" className="w-full p-4">
<TabsList className="grid w-full grid-cols-3 bg-background">
  <TabsTrigger 
   className="bg-background font-bold border-b-2 border-transparent data-[state=active]:border-foreground p-2"
   value="comments"
  >
    Comentários
  </TabsTrigger>
  <TabsTrigger
   className="bg-background font-bold border-b-2 border-transparent data-[state=active]:border-foreground p-2"
   value="maps"
  >
    Mapa
  </TabsTrigger>
  <TabsTrigger
   value="message"
   className="bg-background font-bold border-b-2 border-transparent data-[state=active]:border-foreground p-2"
  >
    Direct
  </TabsTrigger>
</TabsList>
<TabsContent value="comments">
  
    <Comments comment={comments} params={params}/>      
         
</TabsContent>
<TabsContent value="maps">
  <Card>
 <MapWithMarker posts={post}/>
  </Card>
</TabsContent>
<TabsContent value="message">
  <Card>
  <Chat ownerId={params.ownerId} userId={userId}/>
  </Card>
</TabsContent>
</Tabs>
</div>
)}