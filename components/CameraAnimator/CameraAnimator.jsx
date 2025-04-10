"use client";
import React, { useState } from "react";
import Title from "../ui/title";
import OptionsWrapper from "../ui/OptionsWrapper";
import OptionCard from "../ui/OptionCard";

const CameraAnimationSelector = () => {
  const [selected, setSelected] = useState("Static");
  const shirtImage = "shirt.png";

  return (
    <OptionsWrapper className={"gap-5"}>
      <Title>Choose a Camera Animation</Title>
      <div className='flex  gap-2   justify-start'>
        {["Static", "Rotation"].map((option) => (
          <OptionCard
            key={option}
            name={option}
            onClick={(name) => setSelected(name)}
            selected={selected}
            imgUrl={shirtImage}
          />
        ))}
      </div>
    </OptionsWrapper>
  );
};

export default CameraAnimationSelector;
