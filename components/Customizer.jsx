"use client";
import React, { useMemo } from "react";
import { cn } from "@/lib/utils";
import { useCustomizerStore } from "../store/CustomizerStore";
import { DEMO_CATALOG, UI_COPY } from "@/lib/Config"; // shim + copy

// shadcn/ui
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Plus, Minus } from "lucide-react";
// Optional later: Alert for conflict details
// import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

export default function Customizer() {
  const {
    boxSize,
    setBoxSize,
    mode,
    setMode,
    added,
    addModule,
    removeModule,
    clearModules,
    tools,
    addToolRow,
    updateTool,
    removeTool,
    used,
    free,
    subtotal,
  } = useCustomizerStore();

  const palette = useMemo(
    () => DEMO_CATALOG.filter((m) => m.fits.includes(boxSize)),
    [boxSize]
  );

  // UI stubs state (no backend/drag logic yet)
  const [activeBoxTab, setActiveBoxTab] = React.useState("box-1");
  const [confirmClearOpen, setConfirmClearOpen] = React.useState(false);
  const [notPlacedOpen, setNotPlacedOpen] = React.useState(false); // Smart suggestion results
  const [overviewOpen, setOverviewOpen] = React.useState(false); // Mobile sheet

  return (
    <div className="w-full h-screen overflow-y-scroll flex flex-col py-8 md:py-10 px-5 md:px-8">
      {/* Title + mobile overview */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="hidden sm:block text-2xl md:text-3xl font-semibold tracking-wide uppercase text-black/90 relative">
          ORDO Configurator
          <span className="absolute left-0 -bottom-2 h-[2px] w-20 bg-accent-red" />
        </h2>
        <Sheet open={overviewOpen} onOpenChange={setOverviewOpen}>
          <SheetTrigger asChild>
            <Button size="sm" variant="outline" className="sm:hidden">
              Overview
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom">
            <SheetHeader>
              <SheetTitle>Overview</SheetTitle>
            </SheetHeader>
            <div className="mt-3 space-y-2 text-sm">
              {Object.keys(added).length === 0 ? (
                <p className="text-muted-foreground">No modules yet.</p>
              ) : (
                <ul className="pl-4 list-disc space-y-1">
                  {Object.entries(added).map(([sku, qty]) => {
                    const mod = DEMO_CATALOG.find((m) => m.sku === sku);
                    return (
                      <li key={sku}>
                        {sku} · {mod?.name} × {qty}
                      </li>
                    );
                  })}
                </ul>
              )}
              <div className="text-muted-foreground">
                Subtotal ~ €{subtotal()}
              </div>
              <Button
                size="sm"
                onClick={() => {
                  setOverviewOpen(false);
                  toast("Pushed to cart", {
                    description: "Cart wiring coming soon.",
                    action: {
                      label: "Undo",
                      onClick: () => console.log("Undo"),
                    },
                  });
                }}
              >
                Push to Cart
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Meters */}
      <div
        className="flex items-center gap-2 mb-3"
        role="status"
        aria-live="polite"
      >
        <Badge className="px-2 py-1 text-xs">
          {UI_COPY.meters.used}: {used()}
        </Badge>
        <Badge variant="outline" className="px-2 py-1 text-xs">
          {UI_COPY.meters.free}: {free()}
        </Badge>
        <Badge variant="destructive" className="px-2 py-1 text-xs">
          {UI_COPY.meters.conflicts}: 0
        </Badge>
      </div>

      {/* Scrollable content */}

      <div className="flex flex-col gap-3">
        {/* Multi-box Tabs stub */}
        <div>
          <div className="pb-2">
            <div className="text-sm">Boxes</div>
          </div>
          <div>
            <Tabs value={activeBoxTab} onValueChange={setActiveBoxTab}>
              <div className="flex items-center justify-between">
                <TabsList>
                  <TabsTrigger value="box-1">Box 1</TabsTrigger>
                </TabsList>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => alert("Add Box UI coming soon")}
                >
                  + Add Box
                </Button>
              </div>

              <TabsContent value="box-1" className="mt-3">
                {/* Box size */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Box</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {["S", "M", "L"].map((sz) => (
                        <Button
                          key={sz}
                          variant={boxSize === sz ? "default" : "outline"}
                          size="sm"
                          onClick={() => setBoxSize(sz)}
                          className={cn("rounded-full")}
                        >
                          {sz === "S"
                            ? "Small (16)"
                            : sz === "M"
                            ? "Medium (24)"
                            : "Large (32)"}
                        </Button>
                      ))}
                    </div>

                    {/* Clear modules confirm dialog */}
                    <Dialog
                      open={confirmClearOpen}
                      onOpenChange={setConfirmClearOpen}
                    >
                      <div className="flex items-center gap-2 mt-3">
                        <Button
                          variant="link"
                          size="xs"
                          className="px-0"
                          onClick={() => setConfirmClearOpen(true)}
                        >
                          Clear modules
                        </Button>
                      </div>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Clear all modules?</DialogTitle>
                          <DialogDescription>
                            This will remove all added modules from this box.
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <Button
                            variant="outline"
                            onClick={() => setConfirmClearOpen(false)}
                          >
                            Cancel
                          </Button>
                          <Button
                            onClick={() => {
                              clearModules();
                              setConfirmClearOpen(false);

                              toast("Cleared", {
                                description: "All modules removed.",
                                action: {
                                  label: "Undo",
                                  onClick: () => console.log("Undo"),
                                },
                              });
                            }}
                          >
                            Clear
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </CardContent>
                </Card>

                {/* Mode */}
                <div className="mt-3">
                  <div className="pb-2">
                    <div className="flex items-center gap-2">
                      <div className="text-sm">Mode</div>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span className="text-xs underline cursor-help">
                              What’s this?
                            </span>
                          </TooltipTrigger>
                          <TooltipContent>
                            Manual: you pick modules. Smart: enter tools; we
                            suggest modules.
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>
                  <div>
                    <div className="inline-flex rounded-lg overflow-hidden border">
                      <Button
                        size="sm"
                        variant={mode === "manual" ? "default" : "ghost"}
                        onClick={() => setMode("manual")}
                        className={cn(mode === "manual" ? "" : "bg-white")}
                      >
                        Manual
                      </Button>
                      <Separator orientation="vertical" />
                      <Button
                        size="sm"
                        variant={mode === "smart" ? "default" : "ghost"}
                        onClick={() => setMode("smart")}
                        className={cn(mode === "smart" ? "" : "bg-white")}
                      >
                        Smart
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Manual: Palette */}
                {mode === "manual" && (
                  <Card className="mt-3">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Palette</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs text-muted-foreground mb-3">
                        Click “Add” to include modules (drag-grid comes later).
                      </p>
                      <div className="grid grid-cols-1 gap-2">
                        {palette.map((m) => {
                          const qty = added[m.sku] ?? 0;
                          return (
                            <div
                              key={m.sku}
                              className="flex items-center justify-between rounded-lg border px-3 py-2 hover:bg-muted/50 transition-colors"
                            >
                              <div>
                                <div className="text-sm font-medium">
                                  {m.name}
                                </div>
                                <div className="text-[11px] text-muted-foreground">
                                  {m.size} · €{m.price}
                                </div>
                              </div>

                              {/* Actions */}
                              {qty === 0 ? (
                                <Button
                                  size="sm"
                                  onClick={() => addModule(m.sku)}
                                >
                                  <Plus className="mr-1 h-4 w-4" />
                                  Add
                                </Button>
                              ) : (
                                <div className="flex items-center gap-1">
                                  <Button
                                    size="icon"
                                    variant="outline"
                                    className="h-8 w-8"
                                    onClick={() => {
                                      if (qty <= 1) {
                                        // remove the last one, switch back to "Add" state
                                        removeModule(m.sku);
                                      } else {
                                        removeModule(m.sku);
                                      }
                                    }}
                                    aria-label={`Remove one ${m.name}`}
                                  >
                                    <Minus className="h-4 w-4" />
                                  </Button>

                                  <div
                                    className="w-8 text-center text-sm tabular-nums select-none"
                                    aria-live="polite"
                                  >
                                    {qty}
                                  </div>

                                  <Button
                                    size="icon"
                                    className="h-8 w-8"
                                    onClick={() => addModule(m.sku)}
                                    aria-label={`Add one ${m.name}`}
                                  >
                                    <Plus className="h-4 w-4" />
                                  </Button>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Smart: Tools form + Not placed dialog */}
                {mode === "smart" && (
                  <Card className="mt-3">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Smart Tools</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-2">
                      {tools.map((t, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <Select
                            value={t.toolType}
                            onValueChange={(val) =>
                              updateTool(i, { toolType: val })
                            }
                          >
                            <SelectTrigger className="w-[160px] h-9">
                              <SelectValue placeholder="Select a tool" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="knife">Knife</SelectItem>
                              <SelectItem value="spoon">Spoon</SelectItem>
                              <SelectItem value="ladle">Ladle</SelectItem>
                            </SelectContent>
                          </Select>
                          <Input
                            type="number"
                            min={0}
                            value={t.quantity}
                            onChange={(e) =>
                              updateTool(i, {
                                quantity: Number(e.target.value),
                              })
                            }
                            className="w-24 h-9"
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeTool(i)}
                          >
                            Remove
                          </Button>
                        </div>
                      ))}
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={addToolRow}
                        >
                          + Add Tool
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => setNotPlacedOpen(true)}
                        >
                          Generate Suggestion
                        </Button>
                      </div>

                      {/* Not placed dialog (stub) */}
                      <Dialog
                        open={notPlacedOpen}
                        onOpenChange={setNotPlacedOpen}
                      >
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Items not placed</DialogTitle>
                            <DialogDescription>
                              We couldn’t place some items with the current box.
                              Try switching to Medium or add another box.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="text-sm text-muted-foreground">
                            (Stub) This will list remaining items once Smart
                            logic is connected.
                          </div>
                          <DialogFooter>
                            <Button
                              variant="outline"
                              onClick={() => setNotPlacedOpen(false)}
                            >
                              Close
                            </Button>
                            <Button
                              onClick={() => alert("Switch to Medium (stub)")}
                            >
                              Switch to Medium
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </CardContent>
                  </Card>
                )}

                {/* Overview */}
                <Card className="mt-3">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {Object.keys(added).length === 0 ? (
                      <p className="text-xs text-muted-foreground">
                        No modules yet.
                      </p>
                    ) : (
                      <ul className="pl-4 list-disc text-xs space-y-1">
                        {Object.entries(added).map(([sku, qty]) => {
                          const mod = DEMO_CATALOG.find((m) => m.sku === sku);
                          return (
                            <li key={sku}>
                              {sku} · {mod?.name} × {qty}
                            </li>
                          );
                        })}
                      </ul>
                    )}
                    <div className="text-xs mt-2 text-muted-foreground">
                      Subtotal ~ €{subtotal()}
                    </div>
                    <Button
                      className="mt-3 bg-accent-red hover:bg-accent-red/90 text-white"
                      size="sm"
                      onClick={() => {
                        toast("Pushed to cart", {
                          description: "Cart wiring coming soon.",
                          action: {
                            label: "Undo",
                            onClick: () => console.log("Undo"),
                          },
                        });
                      }}
                    >
                      Push to Cart
                    </Button>
                  </CardContent>
                </Card>

                {/* Conflicts details could go here when logic is ready */}
              </TabsContent>

              <TabsContent value="box-2" className="mt-3">
                <p className="text-sm text-muted-foreground">
                  Add another box to configure more space.
                </p>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
