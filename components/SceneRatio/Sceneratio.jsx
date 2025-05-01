import React from "react";
import OptionsWrapper from "../ui/OptionsWrapper";
import Title from "../ui/title";
import useHistoryStore from "@/store/useHistoryStore";

const SceneRatio = () => {
  const { state, setState } = useHistoryStore();
  const { backgroundRatio } = state;

  const handleRatioChange = (ratio) => {
    setState({ backgroundRatio: ratio });
  };

  return (
    <OptionsWrapper>
      <Title>Scene Ratio</Title>
      <div className="flex gap-2 justify-start mt-3 mb-2">
        {[
          {
            label: "16:9",
            text: "(Fullscreen)",
            box: (
              <div className="w-13 h-8 bg-white border-2 border-black rounded-md" />
            ),
          },
          {
            label: "1:1",
            text: "(Square)",
            box: (
              <div className="w-12 h-12 bg-white border-2 border-black rounded-md" />
            ),
          },
          {
            label: "9:16",
            text: "(Phone)",
            box: (
              <div className="w-8 h-12 bg-white border-2 border-black rounded-md" />
            ),
          },
        ].map(({ label, text, box }) => (
          <div
            key={label}
            className="flex flex-col items-center cursor-pointer"
            onClick={() => handleRatioChange(label)}
          >
            <div
              className={`w-25 h-20 bg-gradient-to-b from-[#F3F3F3] to-[#B4B4B4] flex items-center justify-center rounded-lg shadow-md ${
                backgroundRatio === label ? "border border-black" : ""
              }`}
            >
              {box}
            </div>
            <p
              className="text-xs mt-2 text-black font-bold text-center"
              style={{ fontFamily: '"Helvetica Neue", sans-serif' }}
            >
              {label}
              <br />
              {text}
            </p>
          </div>
        ))}
      </div>
    </OptionsWrapper>
  );
};

export default SceneRatio;
