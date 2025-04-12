import { create } from "zustand";

const useBackgroundStore = create((set) => ({
  backgroundColor: "#818181",
  backgroundImage: null,
  backgroundType: "color",
  backgroundRatio: "16:9",
  cameraAnimation: "Static",
  setCameraAnimation: (animation) => set({ cameraAnimation: animation }),
  setBackgroundRatio: (ratio) => set({ backgroundRatio: ratio }),
  setBackgroundType: (type) => set({ backgroundType: type }),
  setBackgroundColor: (color) => set({ backgroundColor: color }),
  setBackgroundImage: (imageUrl) => set({ backgroundImage: imageUrl }),
}));

export default useBackgroundStore;
