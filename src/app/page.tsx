import Authcase from "@/components/Authcase";
import Chat from "@/components/chat/Chat";
import { authOptions } from "@/server/auth/authOptions";
import { getServerSession } from "next-auth/next";
import Auth from "@/components/auth/Auth";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main className="min-h-screen w-full flex items-center justify-center">
      <div className="w-full">
        {session?.user.username ? (
          <Chat session={session} />
        ) : (
          <Auth session={session} />
        )}
      </div>
    </main>
  );
}
