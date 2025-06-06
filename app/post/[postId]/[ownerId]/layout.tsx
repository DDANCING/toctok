import Link from "next/link";
import { AiOutlineClose } from "react-icons/ai";

interface PostPageLayoutProps {
  params: { ownerId: string; postId: string };
  children: React.ReactNode;
}

export default function PostPageLayout({ params, children }: PostPageLayoutProps) {
  return (
    <div id="PostPage" className="lg:flex justify-between w-full h-screen bg-background overflow-auto">
        {children}
    </div>
  );
}
