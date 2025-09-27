"use client";

import { useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ChevronRight, CheckCircle2, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { GetStartedStep } from "./steps/get-started-step";
import { ChooseBoxStep } from "./steps/choose-box-step";
import { FillLayoutStep } from "./steps/fill-layout-step";
import { ReviewStep } from "./steps/review-step";
import { CustomMeasurementsStep } from "./steps/custom-measurements-step";
import { SmartToolsStep } from "./steps/smart-tools-step";
import {
  DEMO_CATALOG,
  UI_COPY,
  BOX_CAPACITY,
  money,
  calcSubtotal,
  calcUsed,
} from "./utils";

export function ConfigurationPanel({ active, patchActive }) {
  const palette = useMemo(
    () =>
      DEMO_CATALOG.filter((m) =>
        active.size ? m.fits.includes(active.size) : true
      ),
    [active.size]
  );

  const subtotal = calcSubtotal(active.added);
  const used = calcUsed(active.added);
  const capacity = active.size ? BOX_CAPACITY[active.size] : 0;

  const free = Math.max(0, capacity - used);

  const canGoNextFromStep = (b) => {
    if (b.mode === "custom") {
      if (b.step === 0) return !!(b.custom.name && b.custom.email);
      return true;
    }
    switch (b.step) {
      case 0:
        return !!b.mode;
      case 1:
        if (b.mode === "smart") {
          return b.tools.some((t) => t.quantity > 0);
        }
        return !!b.size;
      case 2:
        if (b.mode === "manual") return Object.keys(b.added).length > 0;
        if (b.mode === "smart") return true;
        return false;
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (!canGoNextFromStep(active))
      return toast.error("Please complete this step first.");
    const maxStep =
      active.mode === "custom" ? 1 : active.mode === "smart" ? 4 : 3;
    patchActive({
      step: Math.min(active.step + 1, maxStep),
    });
  };

  const prevStep = () => {
    if (active.step === 1) {
      // Go back to mode selection
      patchActive({ mode: undefined, step: 0 });
    } else {
      patchActive({ step: Math.max(0, active.step - 1) });
    }
  };

  return (
    <div className="w-full h-full ">
      {/* Box Status */}
      <div className="flex flex-wrap gap-1">
        <Badge className="px-2 py-1 text-xs">
          Box Subtotal: {money(subtotal)}
        </Badge>
        <Badge variant="outline" className="px-2 py-1 text-xs">
          {UI_COPY.meters.used}: {used}
          {active.size ? ` / ${BOX_CAPACITY[active.size]}` : ""}
        </Badge>
        {active.size && (
          <Badge variant="secondary" className="px-2 py-1 text-xs">
            Free: {free}
          </Badge>
        )}
        {active.size && (
          <Badge variant="destructive" className="px-2 py-1 text-xs">
            {UI_COPY.meters.conflicts}: 0
          </Badge>
        )}
      </div>

      {/* Stepper */}
      <div className="bg-gray-50 rounded-lg p-3">
        <div className="text-sm font-medium mb-3">
          Configuration — {active.id.toUpperCase()}
        </div>

        <ol className="flex flex-col gap-1 mb-4">
          {active.mode === "custom"
            ? ["Custom Measurements", "Review & Send"].map((s, idx) => (
                <li
                  key={s}
                  className={cn(
                    "rounded-md p-2 text-xs flex items-center gap-2",
                    idx <= active.step
                      ? "bg-green-100 text-green-800"
                      : "bg-white text-muted-foreground"
                  )}
                >
                  <CheckCircle2
                    className={cn(
                      "h-3 w-3",
                      idx <= active.step
                        ? "text-green-600"
                        : "text-muted-foreground"
                    )}
                  />
                  {s}
                </li>
              ))
            : active.mode === "smart"
            ? [
                "Configure Tools",
                "Choose Box",
                "Fill Layout",
                "Review & Checkout",
              ].map((s, idx) => (
                <li
                  key={s}
                  className={cn(
                    "rounded-md p-2 text-xs flex items-center gap-2",
                    idx <= active.step - 1
                      ? "bg-green-100 text-green-800"
                      : "bg-white text-muted-foreground"
                  )}
                >
                  <CheckCircle2
                    className={cn(
                      "h-3 w-3",
                      idx <= active.step - 1
                        ? "text-green-600"
                        : "text-muted-foreground"
                    )}
                  />
                  {s}
                </li>
              ))
            : ["Choose Box", "Fill Layout", "Review & Checkout"].map(
                (s, idx) => (
                  <li
                    key={s}
                    className={cn(
                      "rounded-md p-2 text-xs flex items-center gap-2",
                      idx <= active.step - 1
                        ? "bg-green-100 text-green-800"
                        : "bg-white text-muted-foreground"
                    )}
                  >
                    <CheckCircle2
                      className={cn(
                        "h-3 w-3",
                        idx <= active.step - 1
                          ? "text-green-600"
                          : "text-muted-foreground"
                      )}
                    />
                    {s}
                  </li>
                )
              )}
        </ol>

        {/* Step Content */}
        {active.mode === "custom" ? (
          <CustomMeasurementsStep active={active} patchActive={patchActive} />
        ) : (
          <>
            {active.step > 0 && active.mode && (
              <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div className="text-xs font-medium text-blue-800 mb-1">
                  You selected:
                </div>
                <div className="text-sm text-blue-900">
                  {active.mode === "smart"
                    ? "Help with making my box"
                    : active.mode === "manual"
                    ? "I'll configure it myself"
                    : "Custom measurements / Quote"}
                </div>
              </div>
            )}

            {active.step === 1 && active.mode === "smart" && (
              <SmartToolsStep active={active} patchActive={patchActive} />
            )}
            {active.step === 1 && active.mode === "manual" && (
              <ChooseBoxStep active={active} patchActive={patchActive} />
            )}
            {active.step === 2 && active.mode === "smart" && (
              <ChooseBoxStep active={active} patchActive={patchActive} />
            )}
            {active.step === 2 && active.mode === "manual" && (
              <FillLayoutStep
                active={active}
                patchActive={patchActive}
                palette={palette}
              />
            )}
            {active.step === 3 && active.mode === "smart" && (
              <FillLayoutStep
                active={active}
                patchActive={patchActive}
                palette={palette}
              />
            )}
            {active.step === 4 && active.mode === "smart" && (
              <ReviewStep active={active} subtotal={subtotal} />
            )}
            {active.step === 3 && active.mode === "manual" && (
              <ReviewStep active={active} subtotal={subtotal} />
            )}
          </>
        )}

        {/* Navigation */}
        <div className="mt-4 flex items-center justify-between">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={active.step === 0 && active.mode !== "custom"}
            size="sm"
            className="flex items-center gap-1 bg-transparent"
          >
            <ArrowLeft className="h-3 w-3" />
            {active.mode === "custom" && active.step === 0
              ? "Change Mode"
              : "Back"}
          </Button>
          <div className="flex items-center gap-2">
            {active.mode !== "custom" &&
              ((active.mode === "smart" && active.step < 4) ||
                (active.mode === "manual" && active.step < 3)) && (
                <Button
                  onClick={nextStep}
                  disabled={!canGoNextFromStep(active)}
                  size="sm"
                >
                  Continue <ChevronRight className="ml-1 h-3 w-3" />
                </Button>
              )}
            {active.mode === "custom" && active.step < 1 && (
              <Button
                onClick={nextStep}
                disabled={!canGoNextFromStep(active)}
                size="sm"
              >
                Continue <ChevronRight className="ml-1 h-3 w-3" />
              </Button>
            )}
            {(active.mode === "smart" && active.step === 4) ||
            (active.mode === "manual" && active.step === 3) ||
            (active.mode === "custom" && active.step === 1) ? (
              <Button
                onClick={() =>
                  toast("Submitted", {
                    description: "Cart/Email wiring coming soon.",
                  })
                }
                size="sm"
              >
                Finish
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
