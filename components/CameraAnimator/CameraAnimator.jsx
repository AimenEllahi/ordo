"use client";
import React from "react";
import Title from "../ui/title";
import OptionsWrapper from "../ui/OptionsWrapper";
import OptionCard from "../ui/OptionCard";
import useHistoryStore from "@/store/useHistoryStore"; // ✅ replace import

const CameraAnimationSelector = () => {
  const { state, setState } = useHistoryStore();
  const { cameraAnimation } = state;

  const shirtImage = "shirt.png";

  return (
    <OptionsWrapper className={"gap-5"}>
      <Title>Choose a Camera Animation</Title>
      <div className="flex gap-2 justify-start">
        {["Static", "Rotation"].map((option) => (
          <OptionCard
            key={option}
            name={option}
            onClick={() => setState({ cameraAnimation: option })}
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
