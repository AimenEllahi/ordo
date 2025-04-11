import React from "react";
import { Html, useProgress } from "@react-three/drei";

export default function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="flex flex-col items-center">
        <div className="loader-bar w-40 h-2 bg-gray-200 rounded-full overflow-hidden mb-2">
          <div
            className="h-full bg-black transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-sm text-black">{progress.toFixed(0)}% loaded</p>
      </div>
    </Html>
  );
}
