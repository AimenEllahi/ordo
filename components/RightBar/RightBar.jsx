"use client";
import { useState } from "react";
import ArrowUpRight from "../ui/icons/ArrowRight";
import HandIcon from "../ui/icons/Hand";
import RotateRight from "../ui/icons/RotateRight";
import RotateLeft from "../ui/icons/Rotateleft";

const RightBar = () => {
  const [active, setActive] = useState("cursor");

  return (
    //z-10 removed remem..
    <div className='fixed right-4 items-center justify-center gap-3 top-1/4 -translate-y-1/2 flex flex-col p-2 py-3 rounded-xl shadow-md bg-white'>
      <button
        className={`p-2 cursor-pointer rounded-lg ${
          active === "cursor" ? "bg-gray-300" : "bg-white"
        }`}
        onClick={() => setActive("cursor")}
      >
        <ArrowUpRight className='w-5 h-5 ' />
      </button>

      <button
        className={`p-2 cursor-pointer rounded-lg ${
          active === "hand" ? "bg-gray-300" : "bg-white"
        }`}
        onClick={() => setActive("hand")}
      >
        <HandIcon className='w-5 h-5' />
      </button>

      <hr className='border-[1px] w-3/4 border-gray-300 ' />
      <div className='p-[5px]'>
        <RotateLeft className='fill-black' />
      </div>
      <div className='p-[5px]'>
        <RotateRight className='fill-[#C8C8C8]' />
      </div>
    </div>
  );
};

export default RightBar;
