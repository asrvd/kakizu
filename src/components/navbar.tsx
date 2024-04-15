import { auth, signIn, signOut } from "@/lib/server/auth";
import { Button } from "@/components/ui/button";
import UserMenu from "./user-menu";

export default async function Navbar() {
  const session = await auth();
  return (
    <nav className="text-foreground p-4 flex justify-between items-center border-b border-border">
      <a href="/" className="text-xl font-bold">
        Kakizu
      </a>
      <div className="flex gap-2 items-center">
        <UserMenu session={session} />
      </div>
    </nav>
  );
}
