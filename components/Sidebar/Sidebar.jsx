import { useState } from "react";
import UploadIcon from "@/components/ui/icons/Upload";
import ModelIcon from "@/components/ui/icons/Model";
import ColorIcon from "@/components/ui/icons/Color";
import BackgroundIcon from "@/components/ui/icons/Background";
import CameraIcon from "@/components/ui/icons/Camera";
import RatioIcon from "@/components/ui/icons/Ratio";
import AnimatorIcon from "@/components/ui/icons/Animator";

import UploadCard from "@/components/Upload/UploadCard";
import ModelShirt from "@/components/ModelShirt/Model";
import ColorPicker from "@/components/ColorPicker/ColorPicker";
import Background from "@/components/Background/Background";
import ModelAnimation from "@/components/ModelAnimation/ModelAnimation";
import CameraAnimationSelector from "@/components/CameraAnimator/CameraAnimator";
import SceneRatio from "@/components/SceneRatio/Sceneratio";
import ExportIcon from "@/components/ui/icons/Export";
import { cn } from "@/lib/utils";

import useImageStore from "@/store/useImageStore";
import CustomButton from "../ui/CustomButton";
import useExportStore from "@/store/useExportStore";

const SidebarBtn = ({ children, onClick }) => {
  return (
    <button
      className="hover:bg-gray-100 cursor-pointer  sidebar-btn !px-5"
      onClick={onClick}
    >
      {children}
    </button>
  );
};
const Sidebar = () => {
  const [activeTab, setActiveTab] = useState(null);

  const { setIsExportModalOpen } = useExportStore();
  const toggleTab = (tab) => {
    setActiveTab((prevTab) => (prevTab === tab ? null : tab));
  };

  return (
    <>
      <div className="fixed  z-[10] left-4 top-1/8 flex flex-col items-start pointer-events-auto">
        <div className="flex gap-4 items-start justify-start">
          <div className="bg-white shadow-lg w-fit px-4 py-4 rounded-xl flex flex-col items-center">
            <SidebarBtn
              className="sidebar-btn"
              onClick={() => toggleTab("upload")}
            >
              <UploadIcon
                className={cn(
                  activeTab === "upload" ? "fill-black" : "fill-[#8E8E8E]"
                )}
              />
              <span className="sidebar-text ">Upload</span>
            </SidebarBtn>
            <SidebarBtn
              className="sidebar-btn"
              onClick={() => toggleTab("model")}
            >
              <ModelIcon
                className={cn(
                  activeTab === "model" ? "fill-black" : "fill-[#8E8E8E]"
                )}
              />
              <span className="sidebar-text ">Model</span>
            </SidebarBtn>
            <SidebarBtn
              className="sidebar-btn"
              onClick={() => toggleTab("color")}
            >
              <ColorIcon
                className={cn(
                  activeTab === "color" ? "fill-black" : "fill-[#8E8E8E]"
                )}
              />
              <span className="sidebar-text">Color</span>
            </SidebarBtn>
            <SidebarBtn
              className="sidebar-btn"
              onClick={() => toggleTab("background")}
            >
              <BackgroundIcon
                className={cn(
                  activeTab === "background" ? "fill-black" : "fill-[#8E8E8E]"
                )}
              />
              <span className="sidebar-text">Background</span>
            </SidebarBtn>
            <SidebarBtn
              className="sidebar-btn"
              onClick={() => toggleTab("modelAnimation")}
            >
              <AnimatorIcon
                className={cn(
                  activeTab === "modelAnimation"
                    ? "fill-black"
                    : "fill-[#8E8E8E]"
                )}
              />
              <span className="sidebar-text ">Model Animation</span>
            </SidebarBtn>
            <SidebarBtn
              className="sidebar-btn"
              onClick={() => toggleTab("cameraAnimation")}
            >
              <CameraIcon
                className={cn(
                  activeTab === "cameraAnimation"
                    ? "fill-black"
                    : "fill-[#8E8E8E]"
                )}
              />
              <span className="sidebar-text">Camera Animation</span>
            </SidebarBtn>
            <SidebarBtn
              className="sidebar-btn"
              onClick={() => toggleTab("ratio")}
            >
              <RatioIcon
                className={cn(
                  activeTab === "ratio" ? "fill-black" : "fill-[#8E8E8E]"
                )}
              />
              <span className="sidebar-text">Ratio</span>
            </SidebarBtn>
          </div>
          <div className="absolute left-full translate-x-[16px]">
            <UploadCard isActive={activeTab === "upload"} />

            {activeTab === "model" && <ModelShirt />}
            {activeTab === "color" && <ColorPicker />}
            {activeTab === "background" && <Background />}
            {activeTab === "modelAnimation" && <ModelAnimation />}
            {activeTab === "cameraAnimation" && <CameraAnimationSelector />}
            {activeTab === "ratio" && <SceneRatio />}
          </div>
        </div>
        <CustomButton
          onClick={() => setIsExportModalOpen(true)}
          text="Export"
          icon={<ExportIcon />}
          className=" w-full mt-4 flex justify-center items-center anton-sc-regular font-thin"
          variant={2}
        />

        {/* <div className='fixed bottom-0 items-center left-0 w-screen justify-center flex gap-4'>
          {Object.keys(textureUrl)
            .filter((key) => textureUrl[key] !== null)
            .map((key) => (
              <img
                key={key}
                className='size-40 rotate-180 '
                src={textureUrl[key]}
                alt={key}
              />
            ))}
        </div> */}
      </div>
    </>
  );
};

export default Sidebar;
