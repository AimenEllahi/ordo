import React from "react";
import OptionsWrapper from "../ui/OptionsWrapper";
import Title from "../ui/title";
const SceneRatio = () => {
  return (
    <OptionsWrapper>
      <Title>Scene Ratio</Title>
      <div className='flex gap-2 justify-start mt-3 mb-2'>
        <div className='flex flex-col items-center'>
          <div className='w-25 h-20 border border-black bg-gradient-to-b from-[#F3F3F3] to-[#B4B4B4] flex items-center justify-center rounded-lg shadow-md'>
            <div className='w-13 h-8 bg-[#FFFFFF] border-[2px] border-black rounded-md'></div>
          </div>
          <p
            className='text-xs mt-2 text-[#000000] font-bold'
            style={{ fontFamily: '"Helvetica Neue", sans-serif' }}
          >
            16:9
            <br />
            (Fullscreen)
          </p>
        </div>
        <div className='flex flex-col items-center'>
          <div className='w-25 h-20 bg-gradient-to-b from-[#F3F3F3] to-[#B4B4B4] flex items-center justify-center rounded-lg shadow-md'>
            <div className='w-12 h-12 bg-[#FFFFFF] border-[2px] border-black rounded-md'></div>
          </div>
          <p
            className='text-xs mt-2 text-[#000000] font-bold'
            style={{ fontFamily: '"Helvetica Neue", sans-serif' }}
          >
            1:1
            <br />
            (Square)
          </p>
        </div>
        <div className='flex flex-col items-center'>
          <div className='w-25 h-20 bg-gradient-to-b from-[#F3F3F3] to-[#B4B4B4] flex items-center justify-center rounded-lg shadow-md'>
            <div className='w-8 h-12 bg-[#FFFFFF] border-[2px] border-black rounded-md'></div>
          </div>
          <p
            className='text-xs mt-2 text-[#000000] font-bold'
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
