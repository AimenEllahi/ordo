import { cn } from "@/lib/utils";
import React from "react";

export default function OptionsWrapper({ children, className }) {
  return (
    <div
      className={cn(
        "flex flex-col py-4 min-w-[300px] px-2.5 w-fit  bg-white items-start justify-center rounded-[10px]",
        className
      )}
    >
      {children}
    </div>
  );
}
