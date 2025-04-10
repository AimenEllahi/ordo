import { create } from "zustand";

const useColorsStore = create((set) => ({
  garmentColor: "#FFFFFF",
  frontColor: "#FFFFFF",
  backColor: "#FFFFFF",
  collarColor: "#FFFFFF",
  leftShoulderColor: "#FFFFFF",
  rightShoulderColor: "#FFFFFF",
  resetColors: () =>
    set({
      garmentColor: "#FFFFFF",
      frontColor: "#FFFFFF",
      backColor: "#FFFFFF",
      collarColor: "#FFFFFF",
      leftShoulderColor: "#FFFFFF",
      rightShoulderColor: "#FFFFFF",
    }),
  setGarmentColor: (color) => set({ garmentColor: color }),
  setFrontColor: (color) => set({ frontColor: color }),
  setBackColor: (color) => set({ backColor: color }),
  setCollarColor: (color) => set({ collarColor: color }),
  setLeftShoulderColor: (color) => set({ leftShoulderColor: color }),
  setRightShoulderColor: (color) => set({ rightShoulderColor: color }),
}));

export default useColorsStore;
