"use client";
import { useState } from "react";
import Cross from "../ui/icons/Cross";
import Gallery from "../ui/icons/Gallery";
import Share from "../ui/icons/Share";
import CustomButton from "../ui/CustomButton";
import useExportStore from "@/store/useExportStore";

const ExportModel = ({ isOpen, onClose, formatHandlers }) => {
  const { selectedFormat, setSelectedFormat } = useExportStore();

  const formats = [
    {
      label: ".JPEG (4K Image with selected background)",
      value: "JPEG",
      hasIcon: true,
    },
    {
      label: ".PNG (4K Image with transparent background)",
      value: "PNG",
      hasIcon: true,
    },
    {
      label: ".MP4 (Video with selected background)",
      value: "MP4",
      hasIcon: true,
    },
    {
      label: ".MOV (Video with transparent background)",
      value: "MOV",
      hasIcon: true,
    },
  ];

  const handleDownload = () => {
    const handler = formatHandlers[selectedFormat];
    if (handler) handler();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-md transition-all z-50">
      <div className="bg-white border border-[#D4D4D4] rounded-[20px] p-[50px] w-1/2 shadow-lg text-center relative">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 cursor-pointer"
        >
          <Cross className="w-7 h-7" />
        </button>
        <div className="flex flex-col gap-11">
          <div className="flex flex-col gap-4 items-center">
            <h2 className="text-[31px] font-bold anton-sc-regular ">
              EXPORT YOUR RESULT
            </h2>
            <p className="text-[12px] font-light text-[#818181] text-center">
              *Make sure you selected the correct Ratio before downloading
            </p>
          </div>
          <div className="flex flex-col gap-3.5 mx-auto w-[60%] text-center">
            {formats.map((format) => (
              <button
                key={format.value}
                className={`flex items-center border-black justify-start w-full px-[22px] py-2.5 border-[2px] rounded-[10px] transition text-[14px] font-bold gap-3 ${
                  selectedFormat === format.value
                    ? "bg-black text-white"
                    : "bg-white text-black"
                }`}
                onClick={() => setSelectedFormat(format.value)}
              >
                {format.hasIcon && (
                  <Gallery
                    className="w-4 h-4"
                    color={selectedFormat === format.value ? "white" : "black"}
                  />
                )}
                {format.label}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-[26px] mx-auto w-fit">
          <CustomButton
            text={`Download ${selectedFormat}`}
            icon={<Share />}
            className={"text-[16px]"}
            variant={2}
            onClick={handleDownload}
          />
        </div>
      </div>
    </div>
  );
};

export default ExportModel;
