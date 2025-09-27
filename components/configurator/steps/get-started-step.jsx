"use client";

import { cn } from "@/lib/utils";

export function GetStartedStep({ active, patchActive }) {
  return (
    <div className="space-y-3">
      <div className="text-sm font-medium mb-2">How do you want to start?</div>
      <div className="space-y-2">
        <button
          className={cn(
            "rounded-lg p-3 text-left hover:bg-white w-full transition-colors",
            active.mode === "smart" && "bg-green-100 ring-1 ring-green-300"
          )}
          onClick={() => patchActive({ mode: "smart" })}
        >
          <div className="text-sm font-semibold">Help with making my box</div>
          <p className="text-xs text-muted-foreground mt-1">
            Tell us how many knives, spoons, peelers, etc. you have — we'll
            suggest a layout.
          </p>
        </button>
        <button
          className={cn(
            "rounded-lg p-3 text-left hover:bg-white w-full transition-colors",
            active.mode === "manual" && "bg-blue-100 ring-1 ring-blue-300"
          )}
          onClick={() => patchActive({ mode: "manual" })}
        >
          <div className="text-sm font-semibold">I'll configure it myself</div>
          <p className="text-xs text-muted-foreground mt-1">
            Pick modules and place them into your box.
          </p>
        </button>
        <button
          className={cn(
            "rounded-lg p-3 text-left hover:bg-white w-full transition-colors",
            active.mode === "custom" && "bg-amber-100 ring-1 ring-amber-300"
          )}
          onClick={() => patchActive({ mode: "custom", step: 0 })}
        >
          <div className="text-sm font-semibold">
            Custom measurements / Quote
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Provide your sizes and send us a request for a custom quote.
          </p>
        </button>
      </div>
    </div>
  );
}
