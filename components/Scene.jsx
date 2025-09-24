"use client";
import React from "react";
import Customizer from "./Customizer";
import { HiOutlinePlus, HiOutlineMinus } from "react-icons/hi2";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, Stage } from "@react-three/drei";

export default function Scene() {
  return (
    <>
      <div className="w-screen h-screen overflow-x-hidden flex flex-col justify-center items-center md:flex-row bg-beige-100 text-black">
        {/* LEFT: canvas / playfield */}
        <div className="w-screen md:w-[70%] h-[50%] md:h-screen rounded-md relative">
          <div className="w-full h-full ">
            <Canvas>
              <OrbitControls
                enablePan={false}
                enableZoom={false}
                maxPolarAngle={Math.PI / 2}
                minPolarAngle={Math.PI / 2}
              />
              <Stage
                environment="city"
                adjustCamera={false}
                contactShadow={{ blur: 2, opacity: 0.5 }}
              >
                <mesh>
                  <boxGeometry args={[0.5, 0.5, 0.5]} />
                  <meshStandardMaterial color="orange" />
                </mesh>
              </Stage>
            </Canvas>
          </div>
          {/* Zoom controls */}
          <div className="absolute bottom-5 right-5 flex flex-col gap-4">
            {/* Zoom In */}
            <button
              aria-label="Zoom in"
              className="bg-black text-white border border-black/10 shadow p-3 rounded-full
                         transition-transform duration-200 ease-out will-change-transform
                         hover:scale-120 active:scale-95
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-red"
            >
              <HiOutlinePlus className="h-5 w-5" />
            </button>

            {/* Zoom Out */}
            <button
              aria-label="Zoom out"
              className="bg-black text-white border border-black/10 shadow p-3 rounded-full
                         transition-transform duration-200 ease-out will-change-transform
                         hover:scale-70 active:scale-85
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-red"
            >
              <HiOutlineMinus className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* RIGHT: panel */}
        <div className="w-full bg-white border border-black/10 md:w-[30%] h-[50%] md:h-screen">
          <Customizer />
        </div>
      </div>
    </>
  );
}
