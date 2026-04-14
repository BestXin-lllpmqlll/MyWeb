"use client";

import { useEffect, useState, useCallback, ReactNode, useRef } from "react";

export default function DeviceTiltText({ children }: { children: ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const targetTilt = useRef({ x: 0, y: 0, rotateX: 0, rotateY: 0 });
  const currentTilt = useRef({ x: 0, y: 0, rotateX: 0, rotateY: 0 });

  const [needsPermission, setNeedsPermission] = useState(false);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMobile(typeof window !== "undefined" && "ontouchstart" in window);
  }, []);

  useEffect(() => {
    let animationFrameId: number = 0;

    const updateTransform = () => {
      const lerpFactor = 0.1; // Adjust for smoothness vs responsiveness
      
      currentTilt.current.x += (targetTilt.current.x - currentTilt.current.x) * lerpFactor;
      currentTilt.current.y += (targetTilt.current.y - currentTilt.current.y) * lerpFactor;
      currentTilt.current.rotateX += (targetTilt.current.rotateX - currentTilt.current.rotateX) * lerpFactor;
      currentTilt.current.rotateY += (targetTilt.current.rotateY - currentTilt.current.rotateY) * lerpFactor;

      if (containerRef.current) {
        const { x, y, rotateX, rotateY } = currentTilt.current;
        containerRef.current.style.transform = `perspective(1000px) translate3d(${x}px, ${y}px, 0) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      }

      animationFrameId = requestAnimationFrame(updateTransform);
    };

    animationFrameId = requestAnimationFrame(updateTransform);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleOrientation = useCallback((event: DeviceOrientationEvent) => {
    const gamma = event.gamma || 0;
    const beta = event.beta || 0;

    const clampedGamma = Math.max(-45, Math.min(45, gamma));
    
    // Assume user holds phone at ~45 degrees, normalize around that
    const normalizedBeta = beta - 45;
    const clampedBeta = Math.max(-45, Math.min(45, normalizedBeta));

    // Increase multiplier for a more pronounced "晃动" (wobble/shake) effect
    const rotateY = clampedGamma * 0.6; 
    const rotateX = -clampedBeta * 0.6; 

    const x = clampedGamma * 2.0;
    const y = clampedBeta * 2.0;

    targetTilt.current = { x, y, rotateX, rotateY };
  }, []);

  const handleMouseMove = useCallback((event: MouseEvent) => {
    if (isMobile) return;
    
    const x = (event.clientX / window.innerWidth) * 2 - 1;
    const y = (event.clientY / window.innerHeight) * 2 - 1;
    
    targetTilt.current = { 
      x: x * 30, 
      y: y * 30,
      rotateX: -y * 15,
      rotateY: x * 15
    };
  }, [isMobile]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (typeof window !== "undefined" && typeof (window as any).DeviceOrientationEvent !== "undefined") {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (typeof (window as any).DeviceOrientationEvent.requestPermission === "function") {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setNeedsPermission(true);
      } else {
        // Non-iOS 13+ devices
        window.addEventListener("deviceorientation", handleOrientation);
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setPermissionGranted(true);
      }
    }
    
    // Always add mouse listener for desktop fallback
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("deviceorientation", handleOrientation);
        window.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, [handleOrientation, handleMouseMove]);

  const requestAccess = async () => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (typeof (window as any).DeviceOrientationEvent.requestPermission === "function") {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const permissionState = await (window as any).DeviceOrientationEvent.requestPermission();
        if (permissionState === "granted") {
          window.addEventListener("deviceorientation", handleOrientation);
          setPermissionGranted(true);
          setNeedsPermission(false);
        }
      }
    } catch (error) {
      console.error("Device orientation permission error:", error);
    }
  };

  return (
    <>
      {needsPermission && !permissionGranted && isMobile && (
        <button
          onClick={requestAccess}
          className="absolute top-6 right-4 sm:top-8 sm:right-8 z-50 rounded-full border border-zinc-700 px-4 py-2 text-xs text-zinc-400 transition-colors hover:border-white hover:text-white"
        >
          开启陀螺仪动效
        </button>
      )}

      <div
        ref={containerRef}
        style={{
          willChange: "transform",
        }}
      >
        {children}
      </div>
    </>
  );
}
