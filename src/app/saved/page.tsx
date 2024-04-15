/* eslint-disable @next/next/no-img-element */
import { db } from "@/lib/server/db";
import { auth } from "@/lib/server/auth";
import { redirect } from "next/navigation";
import Preview from "@/components/preview";

async function getBookmarks(userId: string) {
  return db.bookmark.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export default async function Bookmarks() {
  const session = await auth();

  if (!session?.user) {
    redirect("/");
  }

  const bookmarks = await getBookmarks(session.user.id);

  return (
    <main className="flex min-h-screen flex-col items-center p-8">
      <h1 className="text-balance lg:text-4xl text-3xl font-bold leading-none self-start">
        Saved Images
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full mt-8">
        {bookmarks.map((bookmark) => (
          <div
            key={bookmark.id}
            className="rounded-lg w-[250px] aspect-square object-cover cursor-pointer hover:shadow-xl transition-shadow relative"
          >
            <span className="absolute bottom-2 left-2 bg-zinc-50/50 p-1 text-xs rounded-md">
              created {new Date(bookmark.createdAt).toLocaleDateString()}
            </span>
            <Preview imageURL={bookmark.url} />
            <img
              src={bookmark.url}
              alt="bookmark"
              className="rounded-lg w-full object-cover"
            />
          </div>
        ))}
      </div>
    </main>
  );
}
