import { create } from "zustand";

const useExportStore = create((set) => ({
  selectedFormat: "JPEG",
  isExportModalOpen: false,
  setIsExportModalOpen: (isOpen) => set({ isExportModalOpen: isOpen }),

  setSelectedFormat: (format) => set({ selectedFormat: format }),
}));

export default useExportStore;
