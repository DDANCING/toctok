import packageJson from '@/package.json';
import { auth } from "@/auth";
import MainLayout from './layouts/MainLayout';
const APP_VERSION: string = packageJson.version;

export default async function Home() {
  const user = await auth();
  const userId = user?.user.id;

  return (
    <MainLayout user={user}>
      <main className="relative flex h-full flex-col items-center justify-between bg-background">
       
        <div className="space-y-4 z-10 text-foreground">
        </div>
        <footer className="text-end w-full p-1 text-sm text-muted-foreground">
          version {APP_VERSION}
        </footer>
      </main>
    </MainLayout>
  );
}
