"use client";

import { useEffect, useState, useCallback, ReactNode } from "react";

export default function DeviceTiltText({ children }: { children: ReactNode }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0, rotateX: 0, rotateY: 0 });
  const [needsPermission, setNeedsPermission] = useState(false);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if touch device
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMobile(typeof window !== "undefined" && "ontouchstart" in window);
  }, []);

  const handleOrientation = useCallback((event: DeviceOrientationEvent) => {
    const gamma = event.gamma || 0;
    const beta = event.beta || 0;

    const clampedGamma = Math.max(-45, Math.min(45, gamma));
    
    // Assume user holds phone at ~45 degrees, normalize around that
    const normalizedBeta = beta - 45;
    const clampedBeta = Math.max(-45, Math.min(45, normalizedBeta));

    // For rotation, we can map gamma to rotateY and clampedBeta to rotateX
    const rotateY = clampedGamma * 0.5; // Max 22.5 deg
    const rotateX = -clampedBeta * 0.5; // Max 22.5 deg

    const x = clampedGamma * 1.5;
    const y = clampedBeta * 1.5;

    setTilt({ x, y, rotateX, rotateY });
  }, []);

  const handleMouseMove = useCallback((event: MouseEvent) => {
    if (isMobile) return;
    
    // Normalize mouse position to -1 to 1
    const x = (event.clientX / window.innerWidth) * 2 - 1;
    const y = (event.clientY / window.innerHeight) * 2 - 1;
    
    setTilt({ 
      x: x * 20, 
      y: y * 20,
      rotateX: -y * 10,
      rotateY: x * 10
    });
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
          className="absolute top-4 right-4 z-50 rounded-full border border-zinc-700 px-4 py-2 text-xs text-zinc-400 transition-colors hover:border-white hover:text-white"
        >
          开启陀螺仪动效
        </button>
      )}

      <div
        style={{
          transform: `perspective(1000px) translate3d(${tilt.x}px, ${tilt.y}px, 0) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
          transition: "transform 0.1s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          willChange: "transform",
        }}
      >
        {children}
      </div>
    </>
  );
}
