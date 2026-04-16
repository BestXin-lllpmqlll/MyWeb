"use client";

import { useEffect, useState, useCallback, ReactNode, useRef } from "react";

export default function DeviceTiltText({ children, background }: { children: ReactNode, background?: ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const foregroundRef = useRef<HTMLDivElement>(null);
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
    let animationFrameId: number;

    const updateTransform = () => {
      // Decrease lerp factor for a more delayed, "floating" response
      const lerpFactor = 0.015; 
      
      currentTilt.current.x += (targetTilt.current.x - currentTilt.current.x) * lerpFactor;
      currentTilt.current.y += (targetTilt.current.y - currentTilt.current.y) * lerpFactor;
      currentTilt.current.rotateX += (targetTilt.current.rotateX - currentTilt.current.rotateX) * lerpFactor;
      currentTilt.current.rotateY += (targetTilt.current.rotateY - currentTilt.current.rotateY) * lerpFactor;

      // If we have separated background/foreground, container doesn't rotate
      // Otherwise, container rotates (for backward compatibility)
      if (containerRef.current && !background) {
        const { x, y, rotateX, rotateY } = currentTilt.current;
        containerRef.current.style.transform = `perspective(1000px) translate3d(${x}px, ${y}px, 0) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      }

      if (backgroundRef.current && background) {
        const { x, y, rotateX, rotateY } = currentTilt.current;
        // Background moves/rotates slower (e.g. 15% of foreground) to simulate extreme distance
        backgroundRef.current.style.transform = `perspective(1000px) translate3d(${x * 0.15}px, ${y * 0.15}px, -500px) rotateX(${rotateX * 0.15}deg) rotateY(${rotateY * 0.15}deg)`;
      }

      if (foregroundRef.current && background) {
        const { x, y, rotateX, rotateY } = currentTilt.current;
        foregroundRef.current.style.transform = `perspective(1000px) translate3d(${x}px, ${y}px, 0) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      }

      animationFrameId = requestAnimationFrame(updateTransform);
    };

    animationFrameId = requestAnimationFrame(updateTransform);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [background]);

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

    // Limit rotation to max 15 degrees
    const clampedRotateY = Math.max(-15, Math.min(15, rotateY));
    const clampedRotateX = Math.max(-15, Math.min(15, rotateX));

    // Limit translation to max 10% of screen width
    const maxTranslation = typeof window !== "undefined" ? window.innerWidth * 0.1 : 30;
    
    // Map the max 45 degree angle to the max translation allowed
    // gamma/beta are in [-45, 45], so dividing by 45 gives [-1, 1]
    const x = (clampedGamma / 45) * maxTranslation;
    const y = (clampedBeta / 45) * maxTranslation;

    targetTilt.current = { x, y, rotateX: clampedRotateX, rotateY: clampedRotateY };
  }, []);

  const handleMouseMove = useCallback((event: MouseEvent) => {
    if (isMobile) return;
    
    const x = (event.clientX / window.innerWidth) * 2 - 1;
    const y = (event.clientY / window.innerHeight) * 2 - 1;
    
    // Also limit mouse rotation to max 15 degrees
    const rotateY = x * 15;
    const rotateX = -y * 15;
    const clampedRotateY = Math.max(-15, Math.min(15, rotateY));
    const clampedRotateX = Math.max(-15, Math.min(15, rotateX));

    // Limit translation to max 10% of screen width
    const maxTranslation = typeof window !== "undefined" ? window.innerWidth * 0.1 : 30;

    targetTilt.current = { 
      x: x * maxTranslation, 
      y: y * maxTranslation,
      rotateX: clampedRotateX,
      rotateY: clampedRotateY
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
        } else {
          alert("需要允许陀螺仪权限才能体验动效哦");
        }
      } else {
        alert("当前环境不支持陀螺仪授权，请确保在 HTTPS 域名（如线上环境）下访问");
      }
    } catch (error) {
      console.error("Device orientation permission error:", error);
      alert("陀螺仪授权失败，请确保使用 HTTPS 协议访问（如 GitHub Pages 线上地址）");
    }
  };

  return (
    <>
      {needsPermission && !permissionGranted && isMobile && (
        <button
          onClick={requestAccess}
          onPointerDown={(e) => e.stopPropagation()} // 防止触发全局长按
          className="absolute top-6 right-4 sm:top-8 sm:right-8 z-50 rounded-full border border-zinc-700 px-4 py-2 text-xs text-zinc-400 transition-colors hover:border-white hover:text-white"
        >
          开启陀螺仪动效
        </button>
      )}

      <div
        ref={containerRef}
        style={{
          willChange: "transform",
          transformStyle: "preserve-3d",
        }}
        className="w-full h-full relative"
      >
        {background && (
          <div 
            ref={backgroundRef}
            className="absolute inset-0 pointer-events-none"
            style={{
              willChange: "transform",
              transformStyle: "preserve-3d",
            }}
          >
            {background}
          </div>
        )}
        <div
          ref={foregroundRef}
          className="w-full h-full"
          style={{
            willChange: "transform",
            transformStyle: "preserve-3d",
          }}
        >
          {children}
        </div>
      </div>
    </>
  );
}
