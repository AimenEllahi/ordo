"use client";

import { Button } from "@/components/ui/button";
import { Plus, Minus, Info } from "lucide-react";
import { BOX_GRID_LABEL, money } from "../utils";

export function FillLayoutStep({ active, patchActive, palette }) {
  const qtyOf = (sku) => active.added[sku] ?? 0;
  const add = (sku) =>
    patchActive({ added: { ...active.added, [sku]: qtyOf(sku) + 1 } });
  const remove = (sku) => {
    const q = qtyOf(sku);
    const next = { ...active.added };
    if (q <= 1) delete next[sku];
    else next[sku] = q - 1;
    patchActive({ added: next });
  };

  return (
    <div className="space-y-3">
      {active.size && (
        <div className="flex items-center gap-2 text-xs bg-blue-50 p-2 rounded-md">
          <Info className="h-3 w-3 text-blue-600 flex-shrink-0" />
          Your selected box uses a{" "}
          <span className="font-medium">
            {BOX_GRID_LABEL[active.size]}
          </span>{" "}
          grid.
        </div>
      )}

      <div>
        <div className="text-sm font-medium mb-2">Modules Palette</div>
        <p className="text-xs text-muted-foreground mb-2">
          Click "Add" to include modules (drag & drop grid comes later).
        </p>
        <div className="space-y-1">
          {palette.map((m) => (
            <div
              key={m.sku}
              className="flex items-center justify-between rounded-lg px-2 py-2 hover:bg-white transition-colors"
            >
              <div>
                <div className="text-sm font-medium">{m.name}</div>
                <div className="text-[10px] text-muted-foreground">
                  {m.size} · {money(m.price)}
                </div>
              </div>
              {qtyOf(m.sku) === 0 ? (
                <Button
                  size="sm"
                  onClick={() => add(m.sku)}
                  className="h-7 px-2 text-xs"
                >
                  <Plus className="mr-1 h-3 w-3" />
                  Add
                </Button>
              ) : (
                <div className="flex items-center gap-1">
                  <Button
                    size="icon"
                    variant="outline"
                    className="h-6 w-6 bg-transparent"
                    onClick={() => remove(m.sku)}
                    aria-label={`Remove one ${m.name}`}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <div
                    className="w-6 text-center text-xs tabular-nums select-none"
                    aria-live="polite"
                  >
                    {qtyOf(m.sku)}
                  </div>
                  <Button
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => add(m.sku)}
                    aria-label={`Add one ${m.name}`}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {active.mode === "smart" && (
        <div className="bg-amber-50 p-2 rounded-md">
          <div className="text-sm font-medium mb-1">Assistant Results</div>
          <div className="text-xs text-muted-foreground">
            (Stub) We'll list any items we couldn't place and suggest switching
            to a larger box or adding another box.
          </div>
        </div>
      )}
    </div>
  );
}
