/* eslint-disable @next/next/no-img-element */
import {
  Dialog,
  DialogTrigger,
  DialogTitle,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { SpinnerIcon } from "./icons";
import { Skeleton } from "./ui/skeleton";

export function ImageDialog({
  imageURL,
  setGeneratedImage,
  generating,
  setGenerating,
  rawURL,
  uploadImage,
}: {
  imageURL: string | null;
  setGeneratedImage: (image: string) => void;
  generating: boolean;
  setGenerating: (generating: boolean) => void;
  rawURL: string;
  uploadImage: () => void;
}) {
  async function generateImage() {
    if (!rawURL) return;
    setGeneratedImage("");
    setGenerating(true);
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ img: rawURL }),
    });

    const data = await res.text();
    setGeneratedImage("data:image/png;base64," + data);
    setGenerating(false);

    console.log(data);
  }
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
        <Button variant="default" onClick={generateImage} disabled={!rawURL}>
          {generating ? (
            <p className="flex gap-2 items-center justify-center">
              <SpinnerIcon className="w-5 h-5" />
              <span>Generating...</span>
            </p>
          ) : (
            "Generate"
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {generating ? "Generating image..." : "Generated image"}
          </DialogTitle>
          <DialogDescription>
            {generating
              ? "Please wait while we generate the image for you."
              : "Here is the generated image."}
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-center items-center">
          {imageURL ? (
            <img
              src={imageURL}
              alt="profile"
              className="w-full h-full rounded-lg"
            />
          ) : (
            <Skeleton className="min-w-full aspect-square rounded-lg" />
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={uploadImage} disabled={!imageURL}>
            Bookmark
          </Button>
          <Button onClick={downloadImage} disabled={!imageURL}>
            Download
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
