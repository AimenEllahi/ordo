import { create } from "zustand";
import { DEMO_CATALOG } from "../lib/Config";

const BOX_CUBES = { S: 16, M: 24, L: 32 };

export const useCustomizerStore = create((set, get) => ({
  // state
  boxSize: "S", // 'S' | 'M' | 'L'
  mode: "manual", // 'manual' | 'smart'
  added: {}, // { sku: qty }
  tools: [{ toolType: "knife", quantity: 6 }],

  // derived helpers
  boxCubes: () => BOX_CUBES[get().boxSize],
  used: () => {
    const { added } = get();
    return Object.entries(added).reduce((sum, [sku, qty]) => {
      const mod = DEMO_CATALOG.find((m) => m.sku === sku);
      if (!mod) return sum;
      const [w, h] = mod.size.split("×").map(Number);
      return sum + w * h * qty;
    }, 0);
  },
  free: () => get().boxCubes() - get().used(),
  subtotal: () => {
    const { added } = get();
    return Object.entries(added).reduce((sum, [sku, qty]) => {
      const mod = DEMO_CATALOG.find((m) => m.sku === sku);
      return sum + (mod?.price || 0) * qty;
    }, 0);
  },

  // actions
  setBoxSize: (sz) => set({ boxSize: sz, added: {} }),
  setMode: (m) => set({ mode: m }),

  addModule: (sku) =>
    set((s) => ({ added: { ...s.added, [sku]: (s.added[sku] || 0) + 1 } })),

  removeModule: (sku) =>
    set((s) => {
      if (!s.added[sku]) return s;
      const next = { ...s.added, [sku]: s.added[sku] - 1 };
      if (next[sku] <= 0) delete next[sku];
      return { added: next };
    }),

  clearModules: () => set({ added: {} }),

  addToolRow: () =>
    set((s) => ({ tools: [...s.tools, { toolType: "knife", quantity: 1 }] })),
  updateTool: (index, patch) =>
    set((s) => ({
      tools: s.tools.map((t, i) => (i === index ? { ...t, ...patch } : t)),
    })),
  removeTool: (index) =>
    set((s) => ({ tools: s.tools.filter((_, i) => i !== index) })),
}));
