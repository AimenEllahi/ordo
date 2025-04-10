import React from "react";

export default function OptionCard({ onClick, selected, name, imgUrl }) {
  return (
    <div
      className='cursor-pointer w-[100px]   gap-1.5  rounded-lg transition-all flex flex-col items-start justify-between whitespace-nowrap'
      onClick={() => onClick(name)}
    >
      <div
        className={`h-[95px] w-full  bg-gradient-to-b from-[#F3F3F3] to-[#B4B4B4] flex items-center justify-center rounded-md transition-all ${
          selected === name && "border-2 border-[#000000]"
        }`}
      >
        <img src={imgUrl} alt={name} className='w-[500px] object-contain' />
      </div>
      <p className='text-sm font-semibold w-3/4 text-wrap '>{name}</p>
    </div>
  );
}
