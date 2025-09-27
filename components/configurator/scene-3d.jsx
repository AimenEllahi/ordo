"use client";

import { useMemo, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, Box, Text } from "@react-three/drei";
import { DEMO_CATALOG } from "./utils";

function Scene3DContent({ activeBox }) {
  const boxSize = activeBox?.size;
  const modules = activeBox?.added || {};

  // Calculate box dimensions based on size
  const boxDimensions = useMemo(() => {
    switch (boxSize) {
      case "S":
        return [2, 0.5, 2];
      case "M":
        return [2.5, 0.5, 3];
      case "L":
        return [3, 0.5, 4];
      default:
        return [2, 0.5, 2];
    }
  }, [boxSize]);

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />

      {/* Main Box */}
      <Box args={boxDimensions} position={[0, 0, 0]}>
        <meshStandardMaterial
          color={boxSize ? "#8B5CF6" : "#94A3B8"}
          transparent
          opacity={0.8}
        />
      </Box>

      {/* Box Size Label */}
      {boxSize && (
        <Text
          position={[0, boxDimensions[1] + 0.5, 0]}
          fontSize={0.3}
          color="#374151"
          anchorX="center"
          anchorY="middle"
        >
          {boxSize === "S" ? "Small" : boxSize === "M" ? "Medium" : "Large"} Box
        </Text>
      )}

      {/* Modules visualization */}
      {Object.entries(modules).map(([sku, qty], index) => {
        const module = DEMO_CATALOG.find((m) => m.sku === sku);
        if (!module) return null;

        const moduleSize = module.size;
        let moduleColor = "#10B981";
        if (moduleSize === "1×2") moduleColor = "#F59E0B";
        if (moduleSize === "2×2") moduleColor = "#EF4444";

        return Array.from({ length: qty }).map((_, i) => (
          <Box
            key={`${sku}-${i}`}
            args={[0.3, 0.2, 0.3]}
            position={[
              -boxDimensions[0] / 2 + 0.5 + index * 0.4 + i * 0.1,
              boxDimensions[1] + 0.1,
              -boxDimensions[2] / 2 + 0.5,
            ]}
          >
            <meshStandardMaterial color={moduleColor} />
          </Box>
        ));
      })}

      <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
      <Environment preset="studio" />
    </>
  );
}

export function Scene3D({ activeBox }) {
  return (
    <>
      <div className="absolute inset-0">
        <Canvas camera={{ position: [5, 5, 5], fov: 50 }}>
          <Suspense fallback={null}>
            <Scene3DContent activeBox={activeBox} />
          </Suspense>
        </Canvas>
      </div>

      {/* 3D Scene Info Overlay */}
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur rounded-lg p-3 shadow-sm">
        <div className="text-sm font-medium mb-1">3D Preview</div>
        <div className="text-xs text-muted-foreground">
          {activeBox.size
            ? `${
                activeBox.size === "S"
                  ? "Small"
                  : activeBox.size === "M"
                  ? "Medium"
                  : "Large"
              } Box`
            : "Select a box size"}
        </div>
        {Object.keys(activeBox.added).length > 0 && (
          <div className="text-xs text-muted-foreground mt-1">
            {Object.keys(activeBox.added).length} module type(s) added
          </div>
        )}
      </div>
    </>
  );
}
