/* eslint-disable @next/next/no-img-element */
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

export default function GeneratedImageDialog({
  imageURL,
  uploadImage,
}: {
  imageURL: string | null;
  uploadImage: () => void;
}) {
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
        <Button variant="default" disabled={!imageURL}>
          View generated image
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Generated Image</DialogTitle>
          <DialogDescription>
            Download or bookmark the generated image
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-center items-center">
          <img
            src={imageURL!}
            alt="profile"
            className="w-full h-full rounded-lg"
          />
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
