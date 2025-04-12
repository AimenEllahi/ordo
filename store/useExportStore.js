import { create } from "zustand";

const useExportStore = create((set) => ({
  selectedFormat: "JPEG",
  setSelectedFormat: (format) => set({ selectedFormat: format }),
}));

export default useExportStore;
