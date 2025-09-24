// utils/conflicts.js
import { BOX_SPECS, moduleFootprint, MODULES } from "@/lib/Config";

/** @typedef {"S"|"M"|"L"} BoxKey */

export function findIncompatibleSkus(boxKey, addedMap) {
  // addedMap: { sku: qty }
  const allowed = new Set(
    MODULES.filter((m) => m.fitsInside.includes(boxKey)).map((m) => m.sku)
  );
  const incompatible = [];
  for (const [sku, qty] of Object.entries(addedMap || {})) {
    if (!allowed.has(sku) && qty > 0) {
      incompatible.push({ sku, qty, reason: "tooLargeForBox" });
    }
  }
  return incompatible;
}

export function estimateUsedCubes(addedMap) {
  let cubes = 0;
  for (const [sku, qty] of Object.entries(addedMap || {})) {
    const fp = moduleFootprint(sku); // {w,h}
    cubes += fp.w * fp.h * qty;
  }
  return cubes;
}

export function capacityConflicts(boxKey, addedMap) {
  const used = estimateUsedCubes(addedMap);
  const cap = BOX_SPECS[boxKey].cubes;
  if (used > cap) {
    return [{ type: "overCapacity", used, cap }];
  }
  return [];
}

/**
 * Returns { count, list } to render in the UI.
 */
export function getConflicts(boxKey, addedMap) {
  const incompatible = findIncompatibleSkus(boxKey, addedMap).map((x) => ({
    type: "tooLargeForBox",
    sku: x.sku,
    qty: x.qty,
  }));
  const overcap = capacityConflicts(boxKey, addedMap);
  const list = [...incompatible, ...overcap];
  return { count: list.length, list };
}
