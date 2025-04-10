"use client";
import React, { useState } from "react";
import OptionsWrapper from "../ui/OptionsWrapper";
import Title from "../ui/title";
import OptionCard from "../ui/OptionCard";

const ModelShirt = () => {
  const [selected, setSelected] = useState("Oversized T-shirt");
  const shirtImage = "shirt.png";

  return (
    <OptionsWrapper className={"gap-5"}>
      <Title>Choose a Model</Title>
      <div className="flex gap-2   justify-start">
        {["Oversized T-shirt", "Cropped T-shirt", "Oversized Hoodie"].map(
          (option) => (
            <OptionCard
              key={option}
              name={option}
              onClick={(name) => setSelected(name)}
              selected={selected}
              imgUrl={shirtImage}
            />
          )
        )}
      </div>
    </OptionsWrapper>
  );
};

export default ModelShirt;
