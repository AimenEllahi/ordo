import React from "react";
import OptionsWrapper from "../ui/OptionsWrapper";
import Title from "../ui/title";
import useBackgroundStore from "@/store/useBackgroundStore";

const SceneRatio = () => {
  const { backgroundRatio, setBackgroundRatio } = useBackgroundStore();

  // Handle the selection of a new ratio
  const handleRatioChange = (ratio) => {
    setBackgroundRatio(ratio); // Update the ratio in the Zustand store
  };

  return (
    <OptionsWrapper>
      <Title>Scene Ratio</Title>
      <div className="flex gap-2 justify-start mt-3 mb-2">
        <div
          className="flex flex-col items-center cursor-pointer"
          onClick={() => handleRatioChange("16:9")} // Set ratio to 16:9 when clicked
        >
          <div
            className={`w-25 h-20  bg-gradient-to-b from-[#F3F3F3] to-[#B4B4B4] flex items-center justify-center rounded-lg shadow-md ${
              backgroundRatio === "16:9" ? "border border-black" : ""
            }`}
          >
            <div className="w-13 h-8 bg-[#FFFFFF] border-[2px] border-black rounded-md"></div>
          </div>
          <p
            className="text-xs mt-2 text-[#000000] font-bold"
            style={{ fontFamily: '"Helvetica Neue", sans-serif' }}
          >
            16:9
            <br />
            (Fullscreen)
          </p>
        </div>

        <div
          className="flex flex-col items-center cursor-pointer"
          onClick={() => handleRatioChange("1:1")} // Set ratio to 1:1 when clicked
        >
          <div
            className={`w-25 h-20  bg-gradient-to-b from-[#F3F3F3] to-[#B4B4B4] flex items-center justify-center rounded-lg shadow-md ${
              backgroundRatio === "1:1" ? "border border-black" : ""
            }`}
          >
            <div className="w-12 h-12 bg-[#FFFFFF] border-[2px] border-black rounded-md"></div>
          </div>
          <p
            className="text-xs mt-2 text-[#000000] font-bold"
            style={{ fontFamily: '"Helvetica Neue", sans-serif' }}
          >
            1:1
            <br />
            (Square)
          </p>
        </div>

        <div
          className="flex flex-col items-center cursor-pointer"
          onClick={() => handleRatioChange("9:16")} // Set ratio to 9:16 when clicked
        >
          <div
            className={`w-25 h-20  bg-gradient-to-b from-[#F3F3F3] to-[#B4B4B4] flex items-center justify-center rounded-lg shadow-md ${
              backgroundRatio === "9:16" ? "border border-black" : ""
            }`}
          >
            <div className="w-8 h-12 bg-[#FFFFFF] border-[2px] border-black rounded-md"></div>
          </div>
          <p
            className="text-xs mt-2 text-[#000000] font-bold"
            style={{ fontFamily: '"Helvetica Neue", sans-serif' }}
          >
            9:16
            <br />
            (Phone)
          </p>
        </div>
      </div>
    </OptionsWrapper>
  );
};

export default SceneRatio;
