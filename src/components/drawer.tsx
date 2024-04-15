"use client";

import { Stage, Layer, Line } from "react-konva";
import React, { useState, useRef } from "react";
import { TrashIcon } from "./icons";
import { Size, Event, LineDraw } from "../types/types";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type Props = {
  event: Event;
  size: {
    width: number;
    height: number;
  };
  handleLoading: (...props: any) => void;
  handleValid: (...props: any) => void;
  loading: boolean;
  valid: boolean;
  setRawURL: (url: string) => void;
  setGeneratedImage: (image: string) => void;
};

export default function Drawer({ ...props }: Props) {
  const [lines, setLines] = useState<LineDraw[]>([]);
  const [lastCenter, setlastCenter] = useState<any>(null);
  const [lastDistance, setlastDistance] = useState<any>(null);
  const drawingRef = useRef<any>(null);

  const isDrawing = useRef(false);

  //DRAW
  function initDraw(e: any) {
    if (props.event !== "DRAW" && props.event !== "ERASE") return;
    isDrawing.current = true;
    const stage = e.target.getStage();
    const pos = relativePointerPosition(stage);
    setLines([...lines, { tool: props.event, points: [pos.x, pos.y] }]);
  }

  function generatePreview() {
    if (drawingRef) {
      const scale = 1;
      const url = drawingRef.current.toDataURL({
        pixelRatio: scale,
        mimeType: "image/jpeg",
        quality: 0.8,
      });
      return url;
    }
  }

  function handleDraw(e: any) {
    if (props.event !== "DRAW" && props.event !== "ERASE") return;
    if (!isDrawing.current) {
      return;
    }
    const stage = e.target.getStage();
    const point = relativePointerPosition(stage);
    let lastLine = lines[lines.length - 1];
    // add point
    lastLine.points = lastLine.points.concat([point.x, point.y]);

    // replace last
    lines.splice(lines.length - 1, 1, lastLine);
    setLines(lines.concat());
  }

  function stopDraw() {
    if (props.event !== "DRAW" && props.event !== "ERASE") return;
    isDrawing.current = false;

    const preview = generatePreview();
    preview && props.setRawURL(preview);
  }

  function clearCanvas() {
    drawingRef.current.clear();
    isDrawing.current = false;
    setLines([]);
    props.setRawURL("");
    props.setGeneratedImage("");
  }

  function handleZoom(e: any) {
    if (props.event !== "GRAB") return;
    const scaleBy = 1.3;
    e.evt.preventDefault();
    const stage = e.target.getStage();
    let oldScale = stage.scaleX();

    let mousePointTo = {
      x: stage.getPointerPosition().x / oldScale - stage.x() / oldScale,
      y: stage.getPointerPosition().y / oldScale - stage.y() / oldScale,
    };

    let newScale = e.evt.deltaY < 0 ? oldScale * scaleBy : oldScale / scaleBy;
    stage.scale({ x: newScale, y: newScale });

    let newPos = {
      x: -(mousePointTo.x - stage.getPointerPosition().x / newScale) * newScale,
      y: -(mousePointTo.y - stage.getPointerPosition().y / newScale) * newScale,
    };
    stage.position(newPos);
  }

  function handlePinchZoom(e: any) {
    if (props.event !== "GRAB") return;

    const stage = e.target.getStage();
    const touch1 = e.evt.touches[0];
    const touch2 = e.evt.touches[1];

    if (!touch1 || !touch2) return;

    if (stage.isDragging()) {
      stage.stopDrag();
    }

    const point1 = {
      x: touch1.clientX,
      y: touch1.clientY,
    };

    const point2 = {
      x: touch2.clientX,
      y: touch2.clientY,
    };

    if (!lastCenter) {
      setlastCenter(getCenter(point1, point2));
    }

    const newCenter = getCenter(point1, point2);
    const dist = getDistance(point1, point2);

    if (!lastDistance) {
      setlastDistance(dist);
    }

    var pointTo = {
      x: (newCenter.x - stage.x()) / stage.scaleX(),
      y: (newCenter.y - stage.y()) / stage.scaleX(),
    };

    var scale = stage.scaleX() * (dist / lastDistance);

    stage.scaleX(scale);
    stage.scaleY(scale);

    if (!lastCenter) {
      return;
    }
    var dx = newCenter.x - lastCenter.x;
    var dy = newCenter.y - lastCenter.y;

    var newPos = {
      x: newCenter.x - pointTo.x * scale + dx,
      y: newCenter.y - pointTo.y * scale + dy,
    };
  }

  function stopPinchZoom() {
    setlastDistance(0);
    setlastDistance(null);
  }

  function relativePointerPosition(node: any) {
    var transform = node.getAbsoluteTransform().copy();
    // to detect relative position we need to invert transform
    transform.invert();

    // get pointer (say mouse or touch) position
    var pos = node.getStage().getPointerPosition();

    // now we find relative point
    return transform.point(pos);
  }

  function getCenter(p1: any, p2: any) {
    return {
      x: (p1.x + p2.x) / 2,
      y: (p1.y + p2.y) / 2,
    };
  }

  function getDistance(p1: any, p2: any) {
    return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
  }

  return (
    <div className="relative w-full h-full bg-black">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger
            className="absolute bottom-5 right-5 z-10 p-1.5 h-auto bg-zinc-100 hover:bg-zinc-100/90 rounded-lg"
            onClick={clearCanvas}
          >
            <TrashIcon className="w-5 h-5" />
          </TooltipTrigger>
          <TooltipContent>
            <p>Clear</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Stage
        onTouchStart={(e) => {
          initDraw(e);
        }}
        onTouchMove={(e) => {
          handleDraw(e);
          handlePinchZoom(e);
        }}
        onTouchEnd={() => {
          stopDraw();
          stopPinchZoom();
        }}
        draggable={props.event === "GRAB"}
        width={props.size.width}
        height={props.size.height}
        onMouseDown={(e: any) => {
          initDraw(e);
        }}
        onMousemove={(e: any) => {
          handleDraw(e);
        }}
        onMouseup={stopDraw}
        onWheel={handleZoom}
        ref={drawingRef}
      >
        <Layer>
          {lines.map((line: LineDraw, i: number) => (
            <Line
              key={i}
              points={line.points}
              stroke="#fff"
              strokeWidth={2}
              tension={0.2}
              lineCap="round"
              lineJoin="round"
              globalCompositeOperation={
                line.tool === "ERASE" ? "destination-out" : "source-over"
              }
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
}
