import React, { useState, useRef } from "react";
import FileUpload from "../ui/icons/FileUpload";
import OptionsWrapper from "../ui/OptionsWrapper";
import Title from "../ui/title";
import CustomButton from "../ui/CustomButton";
import useBackgroundStore from "@/store/useBackgroundStore";

const Background = () => {
  const {
    setBackgroundColor,
    setBackgroundImage,
    setBackgroundType,
    backgroundType,
  } = useBackgroundStore();
  const fileInputRef = useRef(null);
  const colorInputRef = useRef(null);

  const [color, setColor] = useState("#818181");
  const [image, setImage] = useState(null);

  const handleBackgroundTypeChange = (type) => {
    setBackgroundType(type);
    if (type === "color") {
      setImage(null);
    } else {
      setColor("#818181");
    }
  };

  const handleColorChange = (e) => {
    setColor(e.target.value);
    setBackgroundColor(e.target.value);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    console.log(file);
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      setBackgroundImage(imageUrl);
    }
  };

  return (
    <OptionsWrapper>
      <Title>Background</Title>
      <p className="text-[#818181] text-lg font-medium mt-1 mb-2">
        Background type
      </p>
      <div className="flex items-center space-x-4 mt-2">
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="radio"
            name="bgType"
            value="color"
            checked={backgroundType === "color"}
            onChange={() => handleBackgroundTypeChange("color")}
            className="hidden peer"
          />
          <div className="w-5 h-5 border-2 border-black rounded-full flex items-center justify-center">
            <div
              className={`w-3 h-3 border-2 rounded-full ${
                backgroundType === "color" ? "bg-black" : "bg-transparent"
              }`}
            ></div>
          </div>
          <span className="text-sm">Color</span>
        </label>
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="radio"
            name="bgType"
            value="image"
            checked={backgroundType === "image"}
            onChange={() => handleBackgroundTypeChange("image")}
            className="hidden peer"
          />
          <div className="w-5 h-5 border-2 border-black rounded-full flex items-center justify-center">
            <div
              className={`w-3 h-3 border-2 rounded-full ${
                backgroundType === "image" ? "bg-black" : "bg-transparent"
              }`}
            ></div>
          </div>
          <span className="text-sm">Image</span>
        </label>
      </div>

      {backgroundType === "color" && (
        <>
          <p className="text-black text-lg mt-3">Background color</p>

          <div className="w-12 h-12 border rounded-full flex items-center justify-center">
            <input
              ref={colorInputRef}
              type="color"
              value={color}
              onChange={handleColorChange}
              className={`w-10 h-10 border hidden border-black rounded-full `}
            />
            <div
              onClick={() => {
                colorInputRef.current.click();
              }}
              className="w-10 h-10 border border-black rounded-full"
              style={{ backgroundColor: color }}
            ></div>
          </div>
        </>
      )}

      {backgroundType === "image" && (
        <>
          <p className="text-black text-lg mt-3">Background image</p>
          <CustomButton
            onClick={() => {
              fileInputRef.current.click();
            }}
            text="Upload File"
            icon={<FileUpload />}
          />
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
          {image && (
            <img
              src={image}
              alt="Uploaded"
              className="mt-2 h-34 w-34 object-contain bg-gray-100 rounded-md"
            />
          )}
        </>
      )}
    </OptionsWrapper>
  );
};

export default Background;
