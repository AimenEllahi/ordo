"use client";

import { cn } from "@/lib/utils";
import { BOX_GRID_LABEL, BOX_CAPACITY } from "../utils";

export function ChooseBoxStep({ active, patchActive }) {
  return (
    <div className="space-y-3">
      <div className="text-sm font-medium mb-2">Pick your box size</div>
      <div className="space-y-2">
        {["S", "M", "L"].map((sz) => (
          <button
            key={sz}
            className={cn(
              "rounded-lg p-3 text-left hover:bg-white w-full transition-colors",
              active.size === sz && "bg-blue-100 ring-1 ring-blue-300"
            )}
            onClick={() => patchActive({ size: sz })}
          >
            <div className="text-sm font-semibold">
              {sz === "S" ? "Small" : sz === "M" ? "Medium" : "Large"}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Grid: {BOX_GRID_LABEL[sz]} ({BOX_CAPACITY[sz]} cubes)
            </p>
            <div className="mt-2 h-12 rounded-md bg-white/50 grid place-items-center text-lg font-bold text-muted-foreground">
              {sz}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
