"use client";
import React, { useState } from "react";
import OptionsWrapper from "../ui/OptionsWrapper";
import Title from "../ui/title";
import OptionCard from "../ui/OptionCard";
import useHistoryStore from "@/store/useHistoryStore";

const ModelAnimation = () => {
  const { setAnimation, state } = useHistoryStore();
  const shirtImage = "shirt.png";

  return (
    <OptionsWrapper className={"gap-5"}>
      <Title>Choose a Model Animation</Title>
      <div className="flex  gap-2   justify-start">
        {["Pose", "Walk", "wind"].map((option) => (
          <OptionCard
            key={option}
            name={option}
            onClick={(name) => setAnimation(name)}
            selected={state.animation}
            imgUrl={shirtImage}
          />
        ))}
      </div>
    </OptionsWrapper>
  );
};

export default ModelAnimation;
