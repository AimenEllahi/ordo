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
        "  gap-[6px] cursor-pointer p-2.5 flex items-center text-black rounded-[6px] border-black border-[1.5px] font-bold text-lg anton-sc-regular",
        variant === 2 && "bg-black text-white",
        className
      )}
    >
      <span className="uppercase">{text}</span>
      {icon}
    </button>
  );
}
