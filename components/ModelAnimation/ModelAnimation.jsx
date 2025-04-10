"use client";
import React, { useState } from "react";
import OptionsWrapper from "../ui/OptionsWrapper";
import Title from "../ui/title";
import OptionCard from "../ui/OptionCard";

const ModelAnimation = () => {
  const [selected, setSelected] = useState("Static");
  const shirtImage = "shirt.png";

  return (
    <OptionsWrapper className={"gap-5"}>
      <Title>Choose a Model Animation</Title>
      <div className='flex  gap-2   justify-start'>
        {["Static", "Walking", "Wind"].map((option) => (
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

export default ModelAnimation;
