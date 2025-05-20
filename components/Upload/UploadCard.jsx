import React, { useRef, useEffect, useState } from "react";
import FileUpload from "../ui/icons/FileUpload";
import Title from "../ui/title";
import OptionsWrapper from "../ui/OptionsWrapper";
import CustomButton from "../ui/CustomButton";
import {
  Canvas as FabricCanvasInstance,
  FabricImage,
  Rect,
  loadSVGFromURL,
  FabricObject,
  util,
  Group,
  Control,
} from "fabric";
import useImageStore from "@/store/useImageStore";
import { twMerge } from "tailwind-merge";
import useHistoryStore from "@/store/useHistoryStore";
import useExportStore from "@/store/useExportStore";
import { debounce } from "lodash";

const UploadCard = ({ isActive }) => {
  const fileInputRef = useRef(null);
  const canvasRef = useRef(null);
  const fabricCanvas = useRef(null);
  const areaRef = useRef(null);
  const heic2anyRef = useRef(null);

  const { setTextureUrl, addImage, removeImage } = useImageStore();
  const { isExportModalOpen } = useExportStore();
  const state = useHistoryStore().getState();
  const _useHistoryStore = useHistoryStore();

  useEffect(() => {
    async function loadDependencies() {
      if (!heic2anyRef.current) {
        heic2anyRef.current = (await import("heic2any")).default;
      }
    }

    loadDependencies();

    // Cleanup function
    return () => {};
  }, []);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const fileExtension = file.name.split(".").pop().toLowerCase();
    const isHEIC =
      file.type === "image/heic" ||
      file.type === "image/heif" ||
      fileExtension === "heic" ||
      fileExtension === "heif";

    const isSVG = file.type === "image/svg+xml" || fileExtension === "svg";
    if (isHEIC) {
      console.log("Converting HEIC image to JPEG...");
      try {
        const convertedBlob = await heic2anyRef.current({
          blob: file,
          toType: "image/jpeg",
          quality: 1, // adjust the quality of the output image
        });
        console.log("here", convertedBlob);
        // Create a URL for the converted image
        const imageURL = URL.createObjectURL(convertedBlob);
        addImage(imageURL);
        handleAddImage(imageURL);
      } catch (error) {
        console.error("Error converting HEIC image:", error);
      }
    } else {
      const reader = new FileReader();
      reader.onload = () => {
        if (isSVG) {
          handleAddSVG(reader.result);
        } else {
          addImage(reader.result);
          handleAddImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddSVG = (svg) => {
    loadSVGFromURL(svg).then((result) => {
      const svgGroup = new Group(result.objects, {
        cornerSize: 30,
        cornerStrokeWidth: 2,
        transparentCorners: false,
      });

      fabricCanvas.current.add(svgGroup);
      fabricCanvas.current.renderAll();
      generateTexture();
    });
  };

  const handleAddImage = (image) => {
    FabricImage.fromURL(image).then((img) => {
      const area = areaRef.current?.front; // Example: Assigning images to the 'front' area

      img.set({
        left: area?.x,
        top: area?.y,
        cornerSize: 30,
        cornerStrokeWidth: 2,
        transparentCorners: false,
      });
      img.toObject = () => ({ ...img.toObject(), id: url });

      //Add custom delete control
      img.controls.deleteControl = new Control({
        x: 0.95,
        y: -0.7,
        offsetY: 0,
        offsetX: -img.getScaledWidth() / 2,

        cursorStyle: "pointer",
        // mouseDownHandler: (eventData, transform) => {
        //   console.log("Delete icon clicked 2");
        // },

        actionHandler: (eventData, transformer, x, y) => {
          console.log("Delete icon clicked");
          const target = transformer.target;
          const canvas = target.canvas;
          canvas.remove(target);
          canvas.requestRenderAll();
        },
        render: renderDeleteIcon,
      });

      fabricCanvas.current.add(img);
      fabricCanvas.current.renderAll();
      generateTexture();
    });
  };
  function renderDeleteIcon(ctx, left, top, styleOverride, fabricObject) {
    const sizeX = 75; // Increase the size of the icon
    const sizeY = 100; // Increase the size of the icon

    ctx.fillRect(left, top, sizeX, sizeY); // Draw the icon background

    ctx.drawImage(
      document.getElementById("deleteIcon"),
      left,
      top,
      sizeX,
      sizeY
    );
  }
  const deleteImage = (url) => {
    const object = fabricCanvas.current
      .getObjects()
      .find((obj) => obj.id === url);
    if (object) {
      fabricCanvas.current.remove(object);
      fabricCanvas.current.renderAll();
      removeImage(url); // Update state to remove image
    }
  };

  const drawAreaBorders = () => {
    Object.values(areaRef.current).forEach((area) => {
      const rect = new Rect({
        left: area.x,
        top: area.y,
        width: area.width,
        height: area.height,
        fill: "transparent",
        stroke: "black", // Color of the border
        strokeWidth: 5,
        selectable: false,
        evented: false,
      });

      fabricCanvas.current.add(rect);
    });
  };

  useEffect(() => {
    if (typeof window === "undefined" || !canvasRef.current) return;

    const scale = window.devicePixelRatio || 1; // Get the device's pixel ratio

    const canvas = new FabricCanvasInstance(canvasRef.current, {
      height: 1250,
      width: 1250,
      backgroundColor: "transparent",
    });

    canvas.setZoom(1 / scale); // Set the zoom level based on the pixel ratio

    fabricCanvas.current = canvas;

    areaRef.current = {
      front: {
        x: fabricCanvas.current?.width * 0.04 * scale,
        y: fabricCanvas.current?.height * 0.06 * scale,
        width: fabricCanvas.current?.width * 0.4 * scale,
        height: fabricCanvas.current?.height * 0.58 * scale,
        label: "Front",
      },
      back: {
        x: fabricCanvas.current?.width * 0.56 * scale,
        y: fabricCanvas.current?.height * 0.06 * scale,
        width: fabricCanvas.current?.width * 0.4 * scale,
        height: fabricCanvas.current?.height * 0.58 * scale,
        label: "Back",
      },
      rightSleeve: {
        x: fabricCanvas.current?.width * 0.08 * scale,
        y: fabricCanvas.current?.height * 0.68 * scale,
        width: fabricCanvas.current?.width * 0.32 * scale,
        height: fabricCanvas.current?.height * 0.18 * scale,
        label: "Right Sleeve",
      },
      leftSleeve: {
        x: fabricCanvas.current?.width * 1.5 * 0.4 * scale,
        y: fabricCanvas.current?.height * 0.68 * scale,
        width: fabricCanvas.current?.width * 0.32 * scale,
        height: fabricCanvas.current?.height * 0.18 * scale,
        label: "Left Sleeve",
      },
    };
    canvas.set({
      controlsAboveOverlay: true,
    });

    canvas.on("object:moving", () => {
      generateTexture();
    });
    canvas.on("object:rotating", () => {
      generateTexture();
    });
    canvas.on("object:scaling", () => {
      generateTexture();
    });

    canvas.on("object:resizing", () => {
      generateTexture();
    });
    canvas.on("object:modified", () => {
      generateTexture();
    });

    canvas.on("mouse:up", () => {
      generateTexture();
    });

    //drawAreaBorders();

    return () => canvas.dispose();
  }, []);

  useEffect(() => {
    generateTexture();
  }, [state]);
  useEffect(() => {
    setTimeout(() => {
      generateTexture();
    }, 100);
  }, [isExportModalOpen]);

  const generateTexture = () => {
    if (!fabricCanvas.current || !areaRef.current) return;

    Object.keys(areaRef.current).forEach((areaKey) => {
      const area = areaRef.current[areaKey];
      const textureCanvas = document.createElement("canvas");

      textureCanvas.width = area.width;
      textureCanvas.height = area.height;

      const ctx = textureCanvas.getContext("2d");

      // Fill the canvas with white before drawing the image to handle transparency.
      ctx.fillStyle = "transparent";

      ctx.fillRect(0, 0, textureCanvas.width, textureCanvas.height);

      ctx.translate(0, textureCanvas.height);
      ctx.scale(1, -1);

      ctx.drawImage(
        fabricCanvas.current.lowerCanvasEl,
        area.x,
        area.y,
        area.width,
        area.height,
        10,
        10,
        area.width,
        area.height
      );

      const dataURL = textureCanvas.toDataURL("image/png", 1.0);

      setTextureUrl(areaKey, dataURL); // Assume onUpdate can handle key-value pairs
    });
  };

  return (
    <OptionsWrapper
      className={!isActive && "opacity-0 pointer-events-none absolute"}
    >
      <div className={twMerge("w-[372px] h-[460px] overflow-hidden")}>
        <Title>Upload Image/SVG</Title>

        <p className="font-medium text-md mt-1 text-gray-400">
          Upload an image and move it on the template below to display on the
          model
        </p>

        {/* Trigger file input on custom button click */}
        <CustomButton
          text="Image/SVG"
          className={"mt-4"}
          icon={<FileUpload />}
          onClick={() => fileInputRef.current?.click()}
        />

        {/* Hidden file input */}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
        />

        <div
          className={twMerge(
            "mt-10   max-h-[300px] max-w-[372px] relative rounded-lg"
          )}
        >
          {" "}
          <img
            src="uploadposition.png"
            alt="Template"
            className="w-full pointer-events-none absolute max-h-[300px] -top-10 left-0"
          />
          <canvas
            ref={canvasRef}
            id="canvas"
            className=" max-h-[300px] max-w-[372px]  "
          ></canvas>
          <img
            className=""
            id="deleteIcon"
            src="/icons/Icon.png"
            alt="delete icon"
          />
        </div>
      </div>
    </OptionsWrapper>
  );
};

export default UploadCard;
