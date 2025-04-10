import React from "react";
import OptionsWrapper from "../ui/OptionsWrapper";
import Title from "../ui/title";
import useColorsStore from "@/store/useColorsStore";
import { useRef } from "react";
import CustomButton from "../ui/CustomButton";

const ColorOption = ({ setColorFunction, logColor, selectedColor }) => {
  const colorInputRef = useRef(null);

  const handleCircleClick = () => {
    // Trigger the hidden color picker
    colorInputRef.current.click();
  };

  const handleColorChange = (event) => {
    const newColor = event.target.value;
    setColorFunction(newColor);
    logColor(newColor); // Log the selected color
  };

  return (
    <div
      className={`w-8 relative h-8 border-[1px] rounded-full flex items-center justify-center cursor-pointer border-[#D9D9D9]`}
      onClick={handleCircleClick}
    >
      <div
        style={{ backgroundColor: selectedColor }}
        className='w-6 h-6 rounded-full border border-black bg-white'
      ></div>
      <input
        type='color'
        ref={colorInputRef}
        className='absolute  w-0 h-0 opacity-0 cursor-pointer'
        value={selectedColor} // Set the current color
        onChange={handleColorChange} // Handle changes
      />
    </div>
  );
};

const ColorCategory = ({
  category,

  setColorFunction,
  logColor,
  selectedColor,
}) => {
  return (
    <div className='flex flex-col gap-1'>
      <p className='font-semibold text-[12px] '>{category}</p>

      <ColorOption
        setColorFunction={setColorFunction}
        logColor={logColor}
        selectedColor={selectedColor}
      />
    </div>
  );
};

const ColorPicker = () => {
  const {
    garmentColor,
    frontColor,
    backColor,
    collarColor,
    leftShoulderColor,
    rightShoulderColor,
    resetColors,
    setGarmentColor,
    setFrontColor,
    setBackColor,
    setCollarColor,
    setLeftShoulderColor,
    setRightShoulderColor,
  } = useColorsStore();

  // Log function
  const logColor = (color) => {
    console.log(`Selected color: ${color}`);
  };

  return (
    <OptionsWrapper>
      <Title>Choose a 3D model color</Title>
      <div className='space-y-4 w-full'>
        <ColorCategory
          category='Garment'
          setColorFunction={(color) => {
            setFrontColor(color);
            setBackColor(color);
            setCollarColor(color);
            setLeftShoulderColor(color);
            setRightShoulderColor(color);
            setGarmentColor(color);
          }}
          logColor={logColor}
          selectedColor={garmentColor}
        />
        <div className='flex flex-row justify-between  w-full gap-1'>
          <ColorCategory
            category='Front'
            setColorFunction={setFrontColor}
            logColor={logColor}
            selectedColor={frontColor}
          />
          <ColorCategory
            category='Back'
            setColorFunction={setBackColor}
            logColor={logColor}
            selectedColor={backColor}
          />
          <ColorCategory
            category='Collar'
            setColorFunction={setCollarColor}
            logColor={logColor}
            selectedColor={collarColor}
          />
          <ColorCategory
            category='Left shoulder'
            setColorFunction={setLeftShoulderColor}
            logColor={logColor}
            selectedColor={leftShoulderColor}
          />
        </div>
        <ColorCategory
          category='Right shoulder'
          setColorFunction={setRightShoulderColor}
          logColor={logColor}
          selectedColor={rightShoulderColor}
        />
      </div>

      <CustomButton
        className='mt-5 cursor-pointer w-fit justify-center items-center bg-black text-white'
        onClick={resetColors}
        text='Reset colors'
      />
    </OptionsWrapper>
  );
};

export default ColorPicker;
