"use client";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { DEMO_CATALOG, money } from "../utils";

export function ReviewStep({ active, subtotal }) {
  return (
    <div className="space-y-3">
      <div className="text-sm font-medium mb-2">Overview</div>
      {Object.keys(active.added).length === 0 ? (
        <p className="text-xs text-muted-foreground">No modules yet.</p>
      ) : (
        <ul className="pl-3 list-disc text-xs space-y-1">
          {Object.entries(active.added).map(([sku, qty]) => {
            const mod = DEMO_CATALOG.find((m) => m.sku === sku);
            return (
              <li key={sku}>
                {sku} · {mod?.name} × {qty}
              </li>
            );
          })}
        </ul>
      )}
      <div className="text-sm mt-2 font-medium">
        Box subtotal: {money(subtotal)}
      </div>
      <div className="mt-2 flex items-center gap-2">
        <Button
          size="sm"
          onClick={() =>
            toast("Pushed", { description: "Added to cart (stub)." })
          }
          className="h-8 px-2 text-xs"
        >
          Push to Cart
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() =>
            toast("Saved", {
              description: "Saved this configuration (stub).",
            })
          }
          className="h-8 px-2 text-xs"
        >
          Save for later
        </Button>
      </div>
    </div>
  );
}
