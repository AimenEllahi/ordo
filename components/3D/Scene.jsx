"use client";
import React, { useEffect, useState, Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, Stage } from "@react-three/drei";
import { RepeatWrapping, CanvasTexture } from "three";
import NewShirt from "./NewShirt";
import useImageStore from "@/store/useImageStore";
import Loader from "./Loader";
import useBackgroundStore from "@/store/useBackgroundStore";
import CustomButton from "../ui/CustomButton";
import ExportModel from "../ExportModel/ExportModel";
import ExportIcon from "../ui/icons/Export";
import html2canvas from "html2canvas-pro";

const RotateModel = ({ modelRef }) => {
  const { cameraAnimation } = useBackgroundStore();

  useEffect(() => {
    if (cameraAnimation === "Rotation") {
      const interval = setInterval(() => {
        if (modelRef.current) {
          modelRef.current.rotation.y += 0.01;
        }
      }, 16); // ~60 FPS
      return () => clearInterval(interval);
    }
  }, [cameraAnimation, modelRef]);

  return null;
};

export default function Scene() {
  const { textureUrl } = useImageStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [textures, setTextures] = useState({});
  const [modelLoaded, setModelLoaded] = useState(false);
  const canvasWrapperRef = useRef(null);
  const modelRef = useRef(null);

  const {
    backgroundColor,
    backgroundImage,
    backgroundType,
    backgroundRatio,
    cameraAnimation,
    activeMode,
  } = useBackgroundStore();

  useEffect(() => {
    const textureKeys = Object.keys(textureUrl);
    if (textureKeys.length === 0) {
      setModelLoaded(true);
      return;
    }

    textureKeys.forEach((key) => {
      const url = textureUrl[key];
      if (url) {
        const image = new Image();
        image.src = url;
        image.onload = () => {
          const loadedTexture = new CanvasTexture(image);
          loadedTexture.anisotropy = 32;
          loadedTexture.wrapS = loadedTexture.wrapT = RepeatWrapping;
          loadedTexture.needsUpdate = true;

          setTextures((prev) => {
            const updated = { ...prev, [key]: loadedTexture };
            if (Object.keys(updated).length === textureKeys.length) {
              setModelLoaded(true);
            }
            return updated;
          });
        };
      }
    });
  }, [textureUrl]);

  const getCanvasWidth = () => {
    switch (backgroundRatio) {
      case "16:9":
        return "100%";
      case "1:1":
        return "50%";
      case "9:16":
        return "30%";
      default:
        return "100%";
    }
  };

  // 🟡 takeSS with type-based target
  const takeSS = async (type = "jpeg") => {
    const selector = type === "png" ? "#cc2" : "#canvas-container";
    const target = document.querySelector(selector);
    if (!target) return null;

    const canvas = await html2canvas(target, {
      backgroundColor: null,
      useCORS: true,
    });

    return canvas.toDataURL(type === "png" ? "image/png" : "image/jpeg");
  };

  const handleJPEGDownload = async () => {
    console.log("Downloading JPEG with background...");
    const imgData = await takeSS("jpeg");
    if (!imgData) return;

    const link = document.createElement("a");
    link.href = imgData;
    link.download = "model-with-background.jpg";
    link.click();
  };

  const handlePNGDownload = async () => {
    console.log("Downloading PNG with transparent background...");

    const wrapper = document.querySelector("#canvas-container");
    const canvas = wrapper?.querySelector("canvas");

    if (!wrapper || !canvas) return;

    // Save current background styles
    const prevWrapperBg = wrapper.style.background;
    const prevCanvasBgColor = canvas.style.backgroundColor;
    const prevCanvasBgImage = canvas.style.backgroundImage;

    // Remove all background styles
    wrapper.style.background = "none";
    canvas.style.backgroundColor = "transparent";
    canvas.style.backgroundImage = "none";

    setTimeout(async () => {
      const imgData = await takeSS("png");
      if (!imgData) return;

      const link = document.createElement("a");
      link.href = imgData;
      link.download = "model-transparent.png";
      link.click();

      // Restore previous styles
      wrapper.style.background = prevWrapperBg;
      canvas.style.backgroundColor = prevCanvasBgColor;
      canvas.style.backgroundImage = prevCanvasBgImage;
    }, 100);
  };

  const handleMP4Download = () => {
    console.log("MP4 video export coming soon!");
  };

  const handleMOVDownload = () => {
    console.log("MOV video export coming soon!");
  };

  return (
    <div
      className="relative flex justify-center z-1 w-full h-screen"
      style={{
        backgroundImage:
          backgroundRatio !== "16:9" ? `url(/checkered-bg.png)` : null,
        backgroundSize: "cover",
        cursor: activeMode === "hand" ? "grab" : "default",
      }}
    >
      <div
        ref={canvasWrapperRef}
        id="canvas-container"
        style={{
          width: getCanvasWidth(),
          height: "100%",
          backgroundColor:
            backgroundType === "color" ? backgroundColor : "transparent",
          backgroundImage:
            backgroundType === "image" ? `url(${backgroundImage})` : "none",
          backgroundSize: "cover",
        }}
      >
        <Canvas id="cc2" gl={{ preserveDrawingBuffer: true }}>
          <RotateModel modelRef={modelRef} />
          <directionalLight
            position={[10, 10, 5]}
            intensity={1}
            color={"#ffffff"}
            castShadow
          />
          <Environment files={"/env/lebombo_1k.hdr"} />
          <Stage shadows={false} adjustCamera={1.1}>
            <OrbitControls enabled={activeMode === "hand"} />
            <Suspense fallback={<Loader />}>
              <group ref={modelRef}>
                <NewShirt textures={textures} />
              </group>
            </Suspense>
          </Stage>
        </Canvas>
      </div>

      {/* Export Button */}
      <CustomButton
        onClick={() => setIsModalOpen(true)}
        text="Export"
        icon={<ExportIcon />}
        className="absolute bottom-2 mt-4 left-8 flex justify-center items-center"
        variant={2}
        disabled={!modelLoaded}
      />

      {/* Export Modal */}
      {isModalOpen && (
        <ExportModel
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          formatHandlers={{
            JPEG: handleJPEGDownload,
            PNG: handlePNGDownload,
            MP4: handleMP4Download,
            MOV: handleMOVDownload,
          }}
        />
      )}
    </div>
  );
}
