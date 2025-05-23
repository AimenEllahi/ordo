import { useEffect, useRef } from "react";
import { useThree } from "@react-three/fiber";

const CustomControls = ({
  modelRef,
  mode,
  minZoom = -5,
  maxZoom = 0.7,
  watchRef,
}) => {
  const isDragging = useRef(false);
  const lastMouse = useRef({ x: 0, y: 0 });
  const timeoutRef = useRef();
  const { camera, size, gl, setSize } = useThree();

  useEffect(() => {
    if (!watchRef?.current) return;

    const observer = new ResizeObserver(() => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        const { width, height } = watchRef.current.getBoundingClientRect();
        setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        gl.setSize(width, height);
      }, 1); // adjust timing as needed
    });

    observer.observe(watchRef.current);
    return () => {
      observer.disconnect();
      clearTimeout(timeoutRef.current);
    };
  }, [watchRef, setSize, camera, gl]);
  useEffect(() => {
    const target = document.querySelector("#canvas-container");

    const onMouseDown = (e) => {
      isDragging.current = true;
      lastMouse.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e) => {
      if (!isDragging.current || !modelRef.current) return;

      const deltaX = e.clientX - lastMouse.current.x;
      const deltaY = e.clientY - lastMouse.current.y;

      if (mode === "cursor") {
        // Rotate
        const rotSpeed = 0.005;
        modelRef.current.rotation.y += deltaX * rotSpeed;
        modelRef.current.rotation.x += deltaY * rotSpeed;
      }

      if (mode === "hand") {
        // Drag
        const dragSpeed = 0.005;
        modelRef.current.position.x += deltaX * dragSpeed;
        modelRef.current.position.y -= deltaY * dragSpeed;
      }

      lastMouse.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging.current = false;
    };

    const onWheel = (e) => {
      if (!modelRef.current) return;

      const zoomSpeed = 0.1;
      const delta = e.deltaY * zoomSpeed * 0.01;
      const newZ = modelRef.current.position.z + delta;

      // Clamp the zoom value
      modelRef.current.position.z = Math.min(Math.max(newZ, minZoom), maxZoom);
    };

    target.addEventListener("mousedown", onMouseDown);
    target.addEventListener("mousemove", onMouseMove);
    target.addEventListener("mouseup", onMouseUp);
    target.addEventListener("wheel", onWheel, { passive: true });

    return () => {
      target.removeEventListener("mousedown", onMouseDown);
      target.removeEventListener("mousemove", onMouseMove);
      target.removeEventListener("mouseup", onMouseUp);
      target.removeEventListener("wheel", onWheel);
    };
  }, [mode]);

  return null;
};

export default CustomControls;
