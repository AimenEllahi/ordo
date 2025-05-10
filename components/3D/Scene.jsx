"use client";
import React, { useEffect, useState, Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, OrbitControls, Stage } from "@react-three/drei";
import { RepeatWrapping, CanvasTexture } from "three";
import NewShirt from "./NewShirt";
import useImageStore from "@/store/useImageStore";
import Loader from "./Loader";
import { DragControls } from "@react-three/drei";
import { ArcballControls } from "@react-three/drei";
import ExportModel from "../ExportModel/ExportModel";

import html2canvas from "html2canvas-pro";
import { useThree } from "@react-three/fiber";
import useHistoryStore from "@/store/useHistoryStore";

import * as THREE from "three";

const RotateModel = ({ modelRef }) => {
  const { state } = useHistoryStore();
  const { cameraAnimation } = state;

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
  const { textureUrl, isExportModalOpen, setIsExportModalOpen } =
    useImageStore();
  const groupRef = useRef();

  const [textures, setTextures] = useState({});
  const [modelLoaded, setModelLoaded] = useState(false);
  const canvasWrapperRef = useRef(null);
  const modelRef = useRef(null);

  const { state } = useHistoryStore();
  const {
    backgroundColor,
    backgroundImage,
    backgroundType,
    backgroundRatio,
    cameraAnimation,
    activeMode,
  } = state;

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
    const selector = type === "png" ? "#canvas-only" : "#canvas-container";
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

  const recordVideoFromCanvas = (format) => {
    requestAnimationFrame(() => {
      const canvas =
        format === "MP4"
          ? document.querySelector("#canvas-container canvas")
          : document.querySelector("#canvas-only");

      if (!canvas || !(canvas instanceof HTMLCanvasElement)) {
        console.error("Canvas element not found or invalid.");
        return;
      }

      if (typeof canvas.captureStream !== "function") {
        console.error("captureStream() is not supported on this canvas.");
        return;
      }

      const stream = canvas.captureStream(30); // 30 FPS
      const chunks = [];
      const recorder = new MediaRecorder(stream, {
        mimeType: "video/webm;codecs=vp9",
      });

      recorder.ondataavailable = (e) => chunks.push(e.data);
      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: "video/webm" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `export-video.${format.toLowerCase()}`;
        a.click();
      };

      recorder.start();
      setTimeout(() => recorder.stop(), 5000);
    });
  };

  const handleMP4Download = () => {
    console.log("Recording MP4 video...");
    recordVideoFromCanvas("MP4");
  };

  const handleMOVDownload = () => {
    console.log("Recording MOV video...");
    recordVideoFromCanvas("MOV");
  };

  return (
    <div
      className="relative flex justify-center z-1 w-full h-screen "
      style={{
        backgroundImage:
          backgroundRatio !== "16:9" ? `url(/checkered-bg.png)` : null,
        backgroundSize: "cover",
        cursor: activeMode === "hand" ? "grab" : "default",
      }}
    >
      <div
        className="transition-all duration-300 ease-in-out"
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
        <div className="h-full w-full">
          <Canvas id="canvas-only" gl={{ preserveDrawingBuffer: true }}>
            <RotateModel modelRef={modelRef} />
            <directionalLight
              position={[10, 10, 5]}
              intensity={1}
              color={"#ffffff"}
              castShadow
            />
            <Environment files={"/env/lebombo_1k.hdr"} />
            <CustomControls modelRef={modelRef} mode={activeMode} />

            {/* <OrbitControlsWrapper modelRef={modelRef} mode={activeMode} /> */}
            <Suspense fallback={<Loader />}>
              <group position-z={4}>
                <group ref={modelRef}>
                  <NewShirt textures={textures} />
                </group>
              </group>
            </Suspense>
          </Canvas>
        </div>
      </div>

      {/* Export Modal */}
      {isExportModalOpen && (
        <ExportModel
          isOpen={isExportModalOpen}
          onClose={() => setIsExportModalOpen(false)}
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

const CustomControls = ({ modelRef, mode }) => {
  const isDragging = useRef(false);
  const lastMouse = useRef({ x: 0, y: 0 });

  const { size, camera } = useThree();

  useEffect(() => {
    const onMouseDown = (e) => {
      isDragging.current = true;
      lastMouse.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e) => {
      if (!isDragging.current || !modelRef.current) return;

      const deltaX = e.clientX - lastMouse.current.x;
      const deltaY = e.clientY - lastMouse.current.y;

      if (mode === "cursor") {
        // Rotate
        const rotSpeed = 0.005;
        modelRef.current.rotation.y += deltaX * rotSpeed;
        modelRef.current.rotation.x += deltaY * rotSpeed;
      }

      if (mode === "hand") {
        // Drag
        const dragSpeed = 0.005;
        modelRef.current.position.x += deltaX * dragSpeed;
        modelRef.current.position.y -= deltaY * dragSpeed;
      }

      lastMouse.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging.current = false;
    };

    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [mode]);

  return null;
};
