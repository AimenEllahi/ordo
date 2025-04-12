"use client";
import React from "react";
import Title from "../ui/title";
import OptionsWrapper from "../ui/OptionsWrapper";
import OptionCard from "../ui/OptionCard";
import useBackgroundStore from "@/store/useBackgroundStore";

const CameraAnimationSelector = () => {
  const { cameraAnimation, setCameraAnimation } = useBackgroundStore();

  const shirtImage = "shirt.png";

  return (
    <OptionsWrapper className={"gap-5"}>
      <Title>Choose a Camera Animation</Title>
      <div className="flex gap-2 justify-start">
        {["Static", "Rotation"].map((option) => (
          <OptionCard
            key={option}
            name={option}
            onClick={() => setCameraAnimation(option)}
            selected={cameraAnimation === option}
            imgUrl={shirtImage}
            className={`${
              cameraAnimation === option ? "border border-black" : ""
            }`}
          />
        ))}
      </div>
    </OptionsWrapper>
  );
};

export default CameraAnimationSelector;
