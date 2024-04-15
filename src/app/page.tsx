/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/server/auth";
import CTA from "@/components/cta";

export default async function Home() {
  const session = await auth();
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="flex lg:justify-between lg:flex-row flex-col gap-8">
        <div className="flex flex-col gap-4 w-full h-1/2 lg:h-full">
          <h1 className="text-balance lg:text-7xl text-6xl font-extrabold leading-none">
            Turn your sketches to reality using AI.
          </h1>
          <p className="text-balance text-lg leading-none">
            Draw anything you want and let AI give life to your sketches.
          </p>
          <CTA session={session} />
        </div>
        <div className="relative w-full h-[250px] lg:h-full flex">
          <img
            src="/sketch.png"
            alt="sketch"
            className="rounded-lg lg:w-[300px] w-[200px] aspect-sqaure bg-black object-cover absolute top-0 rotate-6"
          />
          <img
            src="/gen.png"
            alt="generated"
            className="rounded-lg lg:w-[300px] w-[200px] aspect-square object-cover absolute -rotate-6 lg:left-[200px] left-[160px] top-[60px]"
          />
        </div>
      </div>
    </main>
  );
}
