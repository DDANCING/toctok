
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";


const AuthLayout =  async ({ children }: { children: React.ReactNode}) => {
  const session = await auth()
  return(
    <SessionProvider session={session}>
    <div className="flex flex-col h-screen bg-background">
     
    {children}
      
    </div>
    </SessionProvider>
    
  );
}

export default AuthLayout