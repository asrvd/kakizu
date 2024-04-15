/* eslint-disable @next/next/no-img-element */
"use client";

import { useRef, useState, useEffect } from "react";
import type { Size, Event } from "@/types/types";
import clsx from "clsx";
import dynamic from "next/dynamic";
import {
  PencilIcon,
  EraserIcon,
  GrabIcon,
  SpinnerIcon,
} from "../../components/icons";
import { ImageDialog } from "@/components/image-dialog";
import GeneratedImageDialog from "@/components/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Toast } from "@/components/ui/toast";

const Drawer = dynamic(() => import("@/components/drawer"), { ssr: false });

export default function Page() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setsize] = useState<Size>({
    width: 0,
    height: 0,
  });

  const [event, setevent] = useState<Event>("DRAW");

  const [loading, setloading] = useState(true);
  const [valid, setvalid] = useState(false);
  const [rawURL, setrawURL] = useState<string>("");
  const [generatedImage, setgeneratedImage] = useState<string | null>(null);
  const [generating, setgenerating] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  function handleLoading(value: boolean) {
    setloading(value);
  }

  function handleValid(value: boolean) {
    setvalid(value);
  }

  useEffect(() => {
    if (containerRef.current) {
      setsize({
        width: containerRef.current.offsetWidth,
        height: containerRef.current.offsetHeight,
      });
    }
  }, []);

  async function uploadImage() {
    const res = await fetch("/api/upload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ img: generatedImage }),
    });

    const url = await res.text();
    console.log(url);
  }

  return (
    <div
      className={clsx(
        "h-screen border-2 p-4 flex flex-col justify-center items-center"
      )}
    >
      <div
        className={clsx(
          "flex flex-col gap-4 justify-center items-center w-full h-full"
        )}
      >
        <div className="w-full flex justify-start items-center gap-4">
          <div className="flex w-fit gap-2 p-2 py-1 rounded-md border border-zinc-300 shadow-sm bg-white">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger
                  onClick={() => setevent("GRAB")}
                  className={clsx(
                    "p-1 transition-colors hover:bg-zinc-200 rounded-md cursor-pointer",
                    event === "GRAB" && "bg-zinc-200"
                  )}
                >
                  <GrabIcon className="w-6 h-6" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Move</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger
                  onClick={() => setevent("DRAW")}
                  className={clsx(
                    "p-1 transition-colors hover:bg-zinc-200 rounded-md cursor-pointer",
                    event === "DRAW" && "bg-zinc-200"
                  )}
                >
                  <PencilIcon className="w-6 h-6" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Draw</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger
                  onClick={() => setevent("ERASE")}
                  className={clsx(
                    "p-1 transition-colors hover:bg-zinc-200 rounded-md cursor-pointer",
                    event === "ERASE" && "bg-zinc-200"
                  )}
                >
                  <EraserIcon className="w-6 h-6" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Erase</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <ImageDialog
            imageURL={generatedImage}
            setGeneratedImage={setgeneratedImage}
            generating={generating}
            setGenerating={setgenerating}
            rawURL={rawURL}
            uploadImage={uploadImage}
          />
          <GeneratedImageDialog
            imageURL={generatedImage}
            uploadImage={uploadImage}
          />
        </div>
        <div
          className={clsx(
            "w-full h-full border-zinc-300 border rounded-lg overflow-hidden relative mx-auto my-auto shadow-sm",
            event === "GRAB" && "cursor-grab",
            event === "DRAW" && "cursor-crosshair",
            event === "ERASE" && "cursor-pointer"
          )}
          ref={containerRef}
        >
          <Drawer
            event={event}
            size={size}
            handleLoading={handleLoading}
            handleValid={handleValid}
            loading={loading}
            valid={valid}
            setRawURL={setrawURL}
            setGeneratedImage={setgeneratedImage}
          />
        </div>
      </div>
    </div>
  );
}
