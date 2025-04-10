import { cn } from "@/lib/utils";
import React from "react";

export default function CustomButton({
  onClick,
  text,
  icon,
  className,
  variant,
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        " leading-[100%] font-helvetica-button gap-[6px] cursor-pointer p-2.5 flex items-center text-black text-[14px] rounded-[6px] border-black border-[1.5px] font-bold",
        variant === 2 && "bg-black text-white",
        className
      )}
    >
      <span className='font-bold uppercase'>{text}</span>
      {icon}
    </button>
  );
}
