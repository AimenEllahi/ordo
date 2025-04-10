import React, { useState } from "react";
import FileUpload from "../ui/icons/FileUpload";
import OptionsWrapper from "../ui/OptionsWrapper";
import Title from "../ui/title";
import CustomButton from "../ui/CustomButton";

const Background = () => {
  const [backgroundType, setBackgroundType] = useState("color");

  return (
    <OptionsWrapper>
      <Title>Background</Title>
      <p className='text-[#818181] text-lg font-medium mt-1 mb-2'>
        Background type
      </p>
      <div className='flex items-center space-x-4 mt-2'>
        <label className='flex items-center space-x-2 cursor-pointer'>
          <input
            type='radio'
            name='bgType'
            value='color'
            checked={backgroundType === "color"}
            onChange={() => setBackgroundType("color")}
            className='hidden peer'
          />
          <div className='w-5 h-5 border-2 border-black rounded-full flex items-center justify-center'>
            <div
              className={`w-3 h-3 border-2 rounded-full ${
                backgroundType === "color" ? "bg-black" : "bg-transparent"
              }`}
            ></div>
          </div>
          <span className='text-sm'>Color</span>
        </label>
        <label className='flex items-center space-x-2 cursor-pointer'>
          <input
            type='radio'
            name='bgType'
            value='image'
            checked={backgroundType === "image"}
            onChange={() => setBackgroundType("image")}
            className='hidden peer'
          />
          <div className='w-5 h-5 border-2 border-black rounded-full flex items-center justify-center'>
            <div
              className={`w-3 h-3 border-2 rounded-full ${
                backgroundType === "image" ? "bg-black" : "bg-transparent"
              }`}
            ></div>
          </div>
          <span className='text-sm'>Image</span>
        </label>
      </div>
      <p className='text-black text-lg mt-3'>Background color</p>
      <div className='w-10 h-10 rounded-full border-2 border-[#D9D9D9] mt-2 shadow-inner flex justify-center'>
        <div className='w-7 h-7 rounded-full mt-1 bg-[#818181] border border-black '></div>
      </div>
      <p className='text-black text-lg mt-3'>Background image</p>
      <CustomButton text='Upload File' icon={<FileUpload />} />
    </OptionsWrapper>
  );
};

export default Background;
