"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export function CustomMeasurementsStep({ active, patchActive }) {
  const { custom } = active;

  return (
    <div className="space-y-3">
      {active.step === 0 && (
        <div>
          <div className="text-sm font-medium mb-2">
            Enter your measurements
          </div>
          <div className="space-y-2">
            <div>
              <Label htmlFor="name" className="text-xs">
                Name *
              </Label>
              <Input
                id="name"
                value={custom.name}
                onChange={(e) =>
                  patchActive({ custom: { ...custom, name: e.target.value } })
                }
                className="h-8 text-xs"
                placeholder="Your full name"
              />
            </div>
            <div>
              <Label htmlFor="email" className="text-xs">
                Email *
              </Label>
              <Input
                id="email"
                type="email"
                value={custom.email}
                onChange={(e) =>
                  patchActive({
                    custom: { ...custom, email: e.target.value },
                  })
                }
                className="h-8 text-xs"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <Label htmlFor="phone" className="text-xs">
                Phone
              </Label>
              <Input
                id="phone"
                value={custom.phone}
                onChange={(e) =>
                  patchActive({
                    custom: { ...custom, phone: e.target.value },
                  })
                }
                className="h-8 text-xs"
                placeholder="Optional phone number"
              />
            </div>
            <div className="grid grid-cols-3 gap-1">
              <div>
                <Label htmlFor="length" className="text-xs">
                  Length (mm)
                </Label>
                <Input
                  id="length"
                  value={custom.length}
                  onChange={(e) =>
                    patchActive({
                      custom: { ...custom, length: e.target.value },
                    })
                  }
                  className="h-8 text-xs"
                  placeholder="0"
                />
              </div>
              <div>
                <Label htmlFor="width" className="text-xs">
                  Width (mm)
                </Label>
                <Input
                  id="width"
                  value={custom.width}
                  onChange={(e) =>
                    patchActive({
                      custom: { ...custom, width: e.target.value },
                    })
                  }
                  className="h-8 text-xs"
                  placeholder="0"
                />
              </div>
              <div>
                <Label htmlFor="height" className="text-xs">
                  Height (mm)
                </Label>
                <Input
                  id="height"
                  value={custom.height}
                  onChange={(e) =>
                    patchActive({
                      custom: { ...custom, height: e.target.value },
                    })
                  }
                  className="h-8 text-xs"
                  placeholder="0"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="notes" className="text-xs">
                Notes
              </Label>
              <Textarea
                id="notes"
                rows={3}
                value={custom.notes}
                onChange={(e) =>
                  patchActive({
                    custom: { ...custom, notes: e.target.value },
                  })
                }
                placeholder="Tell us about any special requests or constraints…"
                className="text-xs"
              />
            </div>
          </div>
        </div>
      )}

      {active.step === 1 && (
        <div>
          <div className="text-sm font-medium mb-2">Review & Send</div>
          <div className="text-xs space-y-1">
            <div className="grid grid-cols-2 gap-1">
              <div>
                <span className="text-muted-foreground">Name:</span>{" "}
                {custom.name || "—"}
              </div>
              <div>
                <span className="text-muted-foreground">Email:</span>{" "}
                {custom.email || "—"}
              </div>
              <div>
                <span className="text-muted-foreground">Phone:</span>{" "}
                {custom.phone || "—"}
              </div>
              <div>
                <span className="text-muted-foreground">Size (mm):</span>{" "}
                {custom.length || "—"} × {custom.width || "—"} ×{" "}
                {custom.height || "—"}
              </div>
            </div>
            <div>
              <div className="text-muted-foreground">Notes:</div>
              <div className="whitespace-pre-wrap">{custom.notes || "—"}</div>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <Button
                size="sm"
                onClick={() =>
                  toast("Quote sent", {
                    description: "We'll get back to you with a quote (stub).",
                  })
                }
                className="h-8 px-2 text-xs"
              >
                Send Quote Request
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  toast("Saved", { description: "Saved draft (stub)." })
                }
                className="h-8 px-2 text-xs"
              >
                Save Draft
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
