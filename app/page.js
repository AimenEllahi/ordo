"use client";
import Scene from "@/components/3D/Scene";
import RightBar from "@/components/RightBar/RightBar";
import Sidebar from "@/components/Sidebar/Sidebar";
import { Toaster } from "react-hot-toast";

export default function Home() {
  return (
    <div className='flex'>
      <Sidebar />
      <Scene />
      <RightBar />
      <Toaster />
    </div>
  );
}
