import { create } from "zustand";

const useImageStore = create((set) => ({
  uploadedImages: [],
 
  addImage: (image) =>
    set((state) => ({ uploadedImages: [...state.uploadedImages, image] })),
  removeImage: (url) =>
    set((state) => ({
      uploadedImages: state.uploadedImages.filter((_, i) => _ !== url),
    })),

  setUploadedImages: (images) => set({ uploadedImages: images }),
  textureUrl: {},
  setTextureUrl: (areaKey, dataURL) =>
    set((state) => ({
      textureUrl: {
        ...state.textureUrl,
        [areaKey]: dataURL, // Update the texture URL for the specific area
      },
    })),
}));

export default useImageStore;
