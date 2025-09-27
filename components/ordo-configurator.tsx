"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";
import { Scene3D } from "./configurator/scene-3d";
import { ConfigurationPanel } from "./configurator/configuration-panel";
import {
  BOX_GRID_LABEL,
  money,
  calcSubtotal,
  makeEmptyBox,
} from "./configurator/utils";

export default function OrdoConfigurator() {
  const [boxes, setBoxes] = useState([makeEmptyBox(1)]);
  const [activeId, setActiveId] = useState("box-1");

  const active = boxes.find((b) => b.id === activeId)!;
  const overallTotal = useMemo(
    () => boxes.reduce((sum, b) => sum + calcSubtotal(b.added), 0),
    [boxes]
  );

  const addBox = () => {
    if (boxes.length >= 6) return toast.error("Maximum of 6 boxes.");
    const next = makeEmptyBox(boxes.length + 1);
    setBoxes((prev) => [...prev, next]);
    setActiveId(next.id);
  };

  const removeBox = (id: string) => {
    if (boxes.length === 1) return toast.error("At least one box is required.");
    const idx = boxes.findIndex((b) => b.id === id);
    const newArr = boxes
      .filter((b) => b.id !== id)
      .map((b, i) => ({ ...b, id: `box-${i + 1}` }));
    setBoxes(newArr);
    setActiveId(newArr[Math.max(0, idx - 1)].id);
  };

  const patchActive = (patch: any) => {
    setBoxes((prev) =>
      prev.map((b) => (b.id === active.id ? { ...b, ...patch } : b))
    );
  };

  const hasSelectedMode = active.mode !== undefined;

  return (
    <div className="w-full h-screen flex flex-col overflow-hidden">
      {/* Sticky price bar */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur">
        <div className="max-w-7xl mx-auto px-5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-semibold tracking-wide uppercase">
              ORDO Configurator
            </h2>
            <Badge variant="secondary" className="uppercase">
              Total
            </Badge>
            <span className="text-lg font-bold tabular-nums">
              {money(overallTotal)}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline" onClick={addBox}>
              + Add Box
            </Button>
            <Button
              size="sm"
              onClick={() =>
                toast("Cart", { description: "Cart wiring coming soon." })
              }
            >
              Push All to Cart
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Left: 3D Scene (65%) */}
        <div className="w-[65%] h-full bg-gradient-to-br from-slate-50 to-slate-100 relative">
          <Scene3D activeBox={active} />
        </div>

        {/* Right: Configuration Panel (35%) */}
        <div className="w-[35%] h-full bg-white overflow-y-auto">
          <div className="p-4 space-y-4 min-h-0">
            {!hasSelectedMode ? (
              // Initial mode selection
              <div className="space-y-4">
                <div className="text-lg font-semibold">
                  Where do you want to start?
                </div>
                <div className="space-y-3">
                  <button
                    className="rounded-lg p-4 text-left hover:bg-gray-50 w-full transition-colors border border-gray-200"
                    onClick={() => {
                      patchActive({ mode: "smart", step: 1 });
                    }}
                  >
                    <div className="text-sm font-semibold">
                      Help with making my box
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Tell us how many knives, spoons, peelers, etc. you have —
                      we'll suggest a layout.
                    </p>
                  </button>
                  <button
                    className="rounded-lg p-4 text-left hover:bg-gray-50 w-full transition-colors border border-gray-200"
                    onClick={() => patchActive({ mode: "manual", step: 1 })}
                  >
                    <div className="text-sm font-semibold">
                      I'll configure it myself
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Pick modules and place them into your box.
                    </p>
                  </button>
                  <button
                    className="rounded-lg p-4 text-left hover:bg-gray-50 w-full transition-colors border border-gray-200"
                    onClick={() => patchActive({ mode: "custom", step: 1 })}
                  >
                    <div className="text-sm font-semibold">
                      Custom measurements / Quote
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Provide your sizes and send us a request for a custom
                      quote.
                    </p>
                  </button>
                </div>
              </div>
            ) : (
              // Full interface after mode selection
              <div className="h-full overflow-y-scroll flex flex-col gap-4">
                {/* Box Navigation */}
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-sm font-medium mb-2">Boxes</div>
                  <div className="flex flex-col gap-1">
                    {boxes.map((b, i) => (
                      <div
                        key={b.id}
                        className={cn(
                          "flex items-center justify-between rounded-lg px-2 py-1",
                          active.id === b.id
                            ? "bg-white shadow-sm"
                            : "bg-transparent"
                        )}
                      >
                        <button
                          onClick={() => setActiveId(b.id)}
                          className="flex-1 text-left"
                        >
                          <div className="text-sm font-medium">Box {i + 1}</div>
                          <div className="text-[11px] text-muted-foreground">
                            {!b.mode
                              ? "Choose how to start"
                              : !b.size
                              ? b.mode === "custom"
                                ? "Custom measurements"
                                : "Choose box size"
                              : `${
                                  b.size === "S"
                                    ? "Small"
                                    : b.size === "M"
                                    ? "Medium"
                                    : "Large"
                                } · Grid ${BOX_GRID_LABEL[b.size]}`}
                          </div>
                        </button>
                        <button
                          className="p-1 text-muted-foreground hover:text-destructive"
                          onClick={() => removeBox(b.id)}
                          aria-label={`Remove ${b.id}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <ConfigurationPanel active={active} patchActive={patchActive} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
