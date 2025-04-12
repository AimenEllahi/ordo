"use client";
import React, { useEffect, useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Environment,
  OrbitControls,
  Stage,
  useProgress,
  Html,
} from "@react-three/drei";
import { RepeatWrapping, CanvasTexture } from "three";
import NewShirt from "./NewShirt";
import useImageStore from "@/store/useImageStore";
import Model from "./T-shirt_anim";
import Loader from "./Loader";
import useBackgroundStore from "@/store/useBackgroundStore";

export default function Scene() {
  const { textureUrl } = useImageStore();
  const [textures, setTextures] = useState({});
  const {
    backgroundColor,
    backgroundImage,
    backgroundType,
    backgroundRatio,
    cameraAnimation,
  } = useBackgroundStore();

  useEffect(() => {
    Object.keys(textureUrl).forEach((key) => {
      const url = textureUrl[key];
      if (url) {
        const image = new Image();
        image.src = url;
        image.onload = () => {
          const loadedTexture = new CanvasTexture(image);
          loadedTexture.anisotropy = 32;
          loadedTexture.wrapS = loadedTexture.wrapT = RepeatWrapping;
          loadedTexture.needsUpdate = true;

          setTextures((prev) => ({
            ...prev,
            [key]: loadedTexture,
          }));
        };
      }
    });
  }, [textureUrl]);

  // Dynamically adjust the width based on the selected ratio
  const getCanvasWidth = () => {
    switch (backgroundRatio) {
      case "16:9":
        return "100%"; // Full width for 16:9
      case "1:1":
        return "50%"; // Half width for square (1:1 ratio)
      case "9:16":
        return "30%"; // Smaller width for 9:16 (portrait mode)
      default:
        return "100%"; // Default to full width if ratio is unknown
    }
  };

  return (
    <div
      className="relative flex justify-center z-1 w-full h-screen"
      style={{
        backgroundImage:
          backgroundRatio !== "16:9" ? `url(/checkered-bg.png)` : null,
        backgroundSize: "cover",
      }}
    >
      <Canvas
        style={{
          width: getCanvasWidth(), // Adjust width based on the selected ratio
          backgroundColor: backgroundType === "color" ? backgroundColor : null,
          backgroundImage:
            backgroundType === "image" ? `url(${backgroundImage})` : null,
          backgroundSize: "cover",
        }}
      >
        <directionalLight
          position={[10, 10, 5]}
          intensity={1}
          color={"#ffffff"}
          castShadow
        />
        <Environment files={"/env/lebombo_1k.hdr"} />
        <Stage shadows={false} adjustCamera={1.1}>
          <OrbitControls
            enableRotate={cameraAnimation === "Rotation"}
            autoRotate={cameraAnimation === "Rotation"}
            autoRotateSpeed={5}
          />
          <Suspense fallback={<Loader />}>{/* <Model /> */}</Suspense>
          <NewShirt textures={textures} />
        </Stage>
      </Canvas>
    </div>
  );
}
