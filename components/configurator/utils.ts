// utils.ts
export type BoxSize = "S" | "M" | "L";
export type Mode = "manual" | "smart" | "custom";

export const DEMO_CATALOG = [
  {
    sku: "MOD-1x1",
    name: "1×1 Module",
    size: "1×1",
    fits: ["S", "M", "L"] as BoxSize[],
    price: 19,
  },
  {
    sku: "MOD-1x2",
    name: "1×2 Module",
    size: "1×2",
    fits: ["M", "L"] as BoxSize[],
    price: 29,
  },
  {
    sku: "MOD-2x2",
    name: "2×2 Module",
    size: "2×2",
    fits: ["L"] as BoxSize[],
    price: 49,
  },
] as const;

export const UI_COPY = {
  meters: { used: "Used", free: "Free", conflicts: "Conflicts" },
} as const;

export const BOX_GRID_LABEL = {
  S: "4×4",
  M: "4×6",
  L: "4×8",
} as const satisfies Record<BoxSize, string>;

export const BOX_CAPACITY = {
  S: 16,
  M: 24,
  L: 32,
} as const satisfies Record<BoxSize, number>;

export function money(n: number) {
  return n.toLocaleString(undefined, { style: "currency", currency: "EUR" });
}

export function calcSubtotal(added: Record<string, number>) {
  return Object.entries(added).reduce((sum, [sku, qty]) => {
    const mod = DEMO_CATALOG.find((m) => m.sku === sku);
    return sum + (mod ? mod.price * qty : 0);
  }, 0);
}

export function calcUsed(added: Record<string, number>) {
  return Object.values(added).reduce((a, b) => a + b, 0);
}

export interface ActiveBox {
  id: string;
  mode?: Mode;
  step: number;
  size?: BoxSize;
  added: Record<string, number>;
  tools: { toolType: string; quantity: number }[];
  custom: {
    name: string;
    email: string;
    phone: string;
    length: string;
    width: string;
    height: string;
    notes: string;
  };
}

export function makeEmptyBox(n: number): ActiveBox {
  return {
    id: `box-${n}`,
    mode: undefined,
    step: 0,
    size: undefined,
    added: {},
    tools: [{ toolType: "knife", quantity: 6 }],
    custom: {
      name: "",
      email: "",
      phone: "",
      length: "",
      width: "",
      height: "",
      notes: "",
    },
  };
}
