"use client";
import { useEffect, useRef } from "react";
import {
  Canvas as FabricCanvasInstance,
  FabricText,
  FabricImage,
} from "fabric";
import useHistoryStore from "@/store/useHistoryStore";

export default function FabricCanvas({ onUpdate }) {
  const canvasRef = useRef(null);
  const fabricCanvas = useRef(null);
  const { uploadedImages } = useHistoryStore();
  const uploadedImage = uploadedImages[0];

  useEffect(() => {
    if (typeof window === "undefined" || !canvasRef.current) return;

    const canvas = new FabricCanvasInstance(canvasRef.current, {
      backgroundColor: "white",
      width: 800,
      height: 800,
    });

    fabricCanvas.current = canvas;

    // canvas.add(
    //   new FabricText("Your Design", {
    //     left: 50,
    //     top: 20,
    //     fontSize: 24,
    //     fill: "black",
    //   })
    // );

    const imageURL = uploadedImage || "/logo.jpg";

    FabricImage.fromURL(imageURL)
      .then((img) => {
        img.scaleToWidth(100);
        img.scaleToHeight(100);
        img.set({ left: 50, top: 50 });

        canvas.add(img);
        canvas.renderAll();
        generateTexture();
      })
      .catch((error) => console.log("❌ Error loading image:", error));

    canvas.on("object:modified", () => {
      generateTexture();
    });

    return () => canvas.dispose();
  }, [uploadedImage]);

  const generateTexture = () => {
    if (!fabricCanvas.current) return;

    const flippedCanvas = document.createElement("canvas");
    flippedCanvas.width = fabricCanvas.current.width;
    flippedCanvas.height = fabricCanvas.current.height;
    const ctx = flippedCanvas.getContext("2d");

    ctx.translate(0, flippedCanvas.height);
    ctx.scale(1, -1);
    ctx.drawImage(fabricCanvas.current.lowerCanvasEl, 1, 0);

    const dataURL = flippedCanvas.toDataURL("image/png", 1.0);
    if (onUpdate) onUpdate(dataURL);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <canvas ref={canvasRef} />
    </div>
  );
}
