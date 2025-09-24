// config/ordo.js — central product + layout config for ORDO
// Drop-in: import into your store and UI. Keeps UI + logic consistent with spec.

/**
 * @typedef {"S"|"M"|"L"} BoxKey
 */

/**
 * @typedef {{ w: number, h: number }} Footprint
 */

/**
 * @typedef {{
 *   sku: string,
 *   name: string,
 *   footprint: Footprint,
 *   fitsInside: BoxKey[],
 *   priceIncl: number,
 *   capacityMap?: Record<string, number>
 * }} ModuleConfig
 */

export const BOX_SPECS = {
  S: { sku: "BOX-S", name: "Small", cubes: 16, cols: 4, rows: 4 },
  M: { sku: "BOX-M", name: "Medium", cubes: 24, cols: 6, rows: 4 },
  L: { sku: "BOX-L", name: "Large", cubes: 32, cols: 8, rows: 4 },
};

/** @type {ModuleConfig[]} */
export const MODULES = [
  {
    sku: "MOD-1x1",
    name: "1×1 Module",
    footprint: { w: 1, h: 1 },
    fitsInside: ["S", "M", "L"],
    priceIncl: 19,
    capacityMap: { knife: 4, spoon: 6, ladle: 2 },
  },
  {
    sku: "MOD-1x2",
    name: "1×2 Module",
    footprint: { w: 1, h: 2 },
    fitsInside: ["M", "L"],
    priceIncl: 29,
    capacityMap: { knife: 8, spoon: 10, ladle: 4 },
  },
  {
    sku: "MOD-2x2",
    name: "2×2 Module",
    footprint: { w: 2, h: 2 },
    fitsInside: ["L"],
    priceIncl: 49,
    capacityMap: { knife: 16, spoon: 20, ladle: 8 },
  },
];

// ---- Lightweight helpers for the UI/store ----

/** @param {BoxKey} box */
export const modulesForBox = (box) =>
  MODULES.filter((m) => m.fitsInside.includes(box));

/** @param {string} sku */
export const moduleBySku = (sku) => MODULES.find((m) => m.sku === sku);

/** @param {string} sku */
export const modulePrice = (sku) => moduleBySku(sku)?.priceIncl ?? 0;

/** @param {string} sku */
export const moduleFootprint = (sku) =>
  moduleBySku(sku)?.footprint ?? { w: 1, h: 1 };

/** @param {string} sku @param {string} toolType */
export const capacityFor = (sku, toolType) =>
  moduleBySku(sku)?.capacityMap?.[toolType] ?? 0;

// Shim to keep your current UI that expects DEMO_CATALOG working.
// You can delete this once you migrate the UI to read MODULES directly.
export const DEMO_CATALOG = MODULES.map((m) => ({
  sku: m.sku,
  name: m.name,
  size: `${m.footprint.w}×${m.footprint.h}`,
  fits: m.fitsInside,
  price: m.priceIncl,
}));

export const UI_COPY = {
  meters: { used: "Used", free: "Free", conflicts: "Conflicts" },
  conflicts: {
    tooLargeForBox: "Module is not compatible with this box size",
    overlaps: "Module overlaps another placement",
    outOfBounds: "Module exceeds box boundary",
  },
};
