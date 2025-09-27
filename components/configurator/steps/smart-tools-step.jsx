"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

export function SmartToolsStep({ active, patchActive }) {
  return (
    <div className="space-y-3">
      <div className="text-sm font-medium mb-2">Tell us what you have:</div>
      <div className="space-y-2">
        {active.tools.map((t, i) => (
          <div key={i} className="flex items-center gap-2">
            <Select
              value={t.toolType}
              onValueChange={(val) => {
                const next = [...active.tools];
                next[i] = { ...next[i], toolType: val };
                patchActive({ tools: next });
              }}
            >
              <SelectTrigger className="w-[120px] h-8 text-xs">
                <SelectValue placeholder="Select a tool" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="knife">Knife</SelectItem>
                <SelectItem value="spoon">Spoon</SelectItem>
                <SelectItem value="peeler">Peeler</SelectItem>
                <SelectItem value="ladle">Ladle</SelectItem>
              </SelectContent>
            </Select>
            <Input
              type="number"
              min={0}
              value={t.quantity}
              onChange={(e) => {
                const next = [...active.tools];
                next[i] = {
                  ...next[i],
                  quantity: Number(e.target.value),
                };
                patchActive({ tools: next });
              }}
              className="w-16 h-8 text-xs"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const next = active.tools.filter((_, j) => j !== i);
                patchActive({ tools: next });
              }}
              className="h-8 px-2 text-xs"
            >
              Remove
            </Button>
          </div>
        ))}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              patchActive({
                tools: [...active.tools, { toolType: "knife", quantity: 1 }],
              })
            }
            className="h-8 px-2 text-xs"
          >
            + Add Tool
          </Button>
          <Button
            size="sm"
            onClick={() =>
              toast("Suggestions Ready", {
                description: "Layout assistant coming soon.",
              })
            }
            className="h-8 px-2 text-xs"
          >
            Generate Suggestion
          </Button>
        </div>
      </div>
    </div>
  );
}
