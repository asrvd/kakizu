"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import type { Session } from "next-auth";
import { Button } from "./ui/button";

export default function CTA({ session }: { session: Session | null }) {
  const router = useRouter();

  return (
    <>
      {session?.user ? (
        <Button className="max-w-max" onClick={() => router.push("/create")}>
          Start creating
        </Button>
      ) : (
        <Button className="max-w-max" onClick={() => signIn("github")}>
          Get started
        </Button>
      )}
    </>
  );
}
