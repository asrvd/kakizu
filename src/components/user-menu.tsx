/* eslint-disable @next/next/no-img-element */
"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuPortal
} from "@/components/ui/dropdown-menu";
import { signOut, signIn } from "next-auth/react";
import type { Session } from "next-auth";
import Link from "next/link";
import { Button } from "./ui/button";
import { BookmarkIcon, PencilIcon } from "./icons";

export default function UserMenu({ session }: { session: Session | null }) {
  return (
    <>
      {session?.user ? (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <img
              src={session?.user?.image as string}
              alt="avatar"
              className="w-8 h-8 rounded-full"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="right-8">
            <DropdownMenuLabel>
              <p className="text-base font-bold text-foreground">
                {session?.user?.name}
              </p>
              <p className="text-sm text-muted-foreground">
                {session?.user?.email}
              </p>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={"/saved"} className="w-full flex items-center">
                <BookmarkIcon className="w-4 h-4 mr-2" />
                Saved
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href={"/create"} className="w-full flex items-center">
                <PencilIcon className="w-4 h-4 mr-2" />
                Create
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="p-0">
              <Button
                variant="outline"
                onClick={() => signOut()}
                className="w-full p-0 leading-none"
              >
                Sign Out
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button variant="default" onClick={() => signIn("github")}>
          Sign In
        </Button>
      )}
    </>
  );
}
