/* eslint-disable @next/next/no-img-element */
"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogHeader,
  DialogTrigger,
  DialogFooter,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { EnlargeIcon } from "./icons";

export default function Preview({ imageURL }: { imageURL: string | null }) {
  async function downloadImage() {
    if (!imageURL) return;
    const a = document.createElement("a");
    a.href = imageURL;
    a.download = "generated-image.png";
    a.click();
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          disabled={!imageURL}
          className="absolute right-2 bottom-2 h-auto p-1 leading-none bg-zinc-50/50 hover:bg-zinc-50"
        >
          <EnlargeIcon className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Saved Image</DialogTitle>
        </DialogHeader>
        <div className="flex justify-center items-center">
          <img
            src={imageURL!}
            alt="profile"
            className="w-full h-full rounded-lg"
          />
        </div>
        <DialogFooter>
          <Button onClick={downloadImage} disabled={!imageURL}>
            Download
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
