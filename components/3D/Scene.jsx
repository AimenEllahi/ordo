"use client";
import React, { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, Stage } from "@react-three/drei";
import { RepeatWrapping, CanvasTexture } from "three";
import NewShirt from "./NewShirt";
import useImageStore from "@/store/useImageStore";
import Model from "./T-shirt_anim";
export default function Scene() {
  const { textureUrl } = useImageStore();
  const [textures, setTextures] = useState({});

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

  return (
    <div className=" relative z-1 w-full h-screen">
      <Canvas>
        {/* add backgroun color white */}
        <directionalLight
          position={[10, 10, 5]}
          intensity={1}
          color={"#ffffff"}
          castShadow
        />
        <Environment files={"/env/lebombo_1k.hdr"} />
        <Stage shadows={false} adjustCamera={1.1}>
          <OrbitControls />
          <Model />
          {/* <NewShirt textures={textures} /> */}
        </Stage>
      </Canvas>
    </div>
  );
}
