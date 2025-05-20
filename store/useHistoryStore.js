import { create } from "zustand";

const emptyTexture = {
  front: null,
  back: null,
  collar: null,
  leftShoulder: null,
  rightShoulder: null,
};
const defaultState = {
  backgroundColor: "#818181",
  backgroundImage: null,
  backgroundType: "color",
  backgroundRatio: "16:9",
  cameraAnimation: "Static",
  activeMode: "cursor",
  garmentColor: "#FFFFFF",
  frontColor: "#FFFFFF",
  backColor: "#FFFFFF",
  collarColor: "#FFFFFF",
  leftShoulderColor: "#FFFFFF",
  rightShoulderColor: "#FFFFFF",

  textureObjects: [emptyTexture], // initial snapshot
};

const useHistoryStore = create((set, get) => ({
  // History state
  history: [],
  future: [],
  state: defaultState,

  // Image-related state (from useImageStore)
  uploadedImages: [],
  textureUrl: {},

  // ---- State setters ----
  setState: (newPartialState) => {
    const prevState = get().state;
    const newState = { ...prevState, ...newPartialState };

    set((state) => ({
      history: [...state.history, prevState],
      future: [],
      state: newState,
    }));
  },
  getState: () => get().state,

  // ---- Undo/Redo ----
  undo: () => {
    const { history, state, future } = get();
    if (history.length === 0) return;
    const previous = history[history.length - 1];
    set({
      state: previous,
      history: history.slice(0, -1),
      future: [state, ...future],
    });
  },
  redo: () => {
    const { history, state, future } = get();
    if (future.length === 0) return;
    const next = future[0];
    set({
      state: next,
      history: [...history, state],
      future: future.slice(1),
    });
  },

  // ---- Image-related methods ----
  addImage: (image) =>
    set((state) => ({
      uploadedImages: [...state.uploadedImages, image],
    })),

  removeImage: (url) =>
    set((state) => ({
      uploadedImages: state.uploadedImages.filter((img) => img !== url),
    })),

  setUploadedImages: (images) => set({ uploadedImages: images }),

  setTextureUrl: (areaKey, dataURL) => {
    const current = get().state.textureObjects;
    const lastSnapshot = current[current.length - 1] || emptyTexture;

    const newSnapshot = {
      ...lastSnapshot,
      [areaKey]: dataURL,
    };

    const updatedTextures = [...current, newSnapshot];
    console.log("Updated Textures:", updatedTextures);
    get().setState({
      textureObjects: updatedTextures,
    });
  },
}));

export default useHistoryStore;
