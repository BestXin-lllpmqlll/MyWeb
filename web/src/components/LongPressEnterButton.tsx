"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

const getNow = () => Date.now();

export default function LongPressEnterButton({ href }: { href: string }) {
  const [isPressing, setIsPressing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [rippling, setRipple] = useState(false);
  const [coords, setCoords] = useState({ x: -1, y: -1 });
  const router = useRouter();

  const pressTimerRef = useRef<number | null>(null);
  const vibrateIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);
  const DURATION = 1000; // 长按 1 秒触发

  const triggerSuccess = () => {
    if (rippling) return;
    
    // 成功时的长震动反馈
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate([200]);
    }

    setCoords({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
    setRipple(true);

    setTimeout(() => {
      router.push(href);
    }, 1000);
  };

  const updateProgress = () => {
    if (!startTimeRef.current) return;
    
    const elapsed = getNow() - startTimeRef.current;
    const currentProgress = Math.min((elapsed / DURATION) * 100, 100);
    setProgress(currentProgress);

    if (currentProgress >= 100) {
      stopPressing();
      triggerSuccess();
    } else {
      pressTimerRef.current = requestAnimationFrame(updateProgress);
    }
  };

  const startPressing = (e: React.PointerEvent<HTMLButtonElement>) => {
    // 防止右键触发
    if (e.button !== 0 && e.pointerType === "mouse") return;
    
    e.preventDefault();
    if (rippling) return;

    setIsPressing(true);
    setProgress(0);
    startTimeRef.current = getNow();
    
    // 启动动画循环
    pressTimerRef.current = requestAnimationFrame(updateProgress);

    // 启动震动反馈 (每 150ms 震动一次，提供颗粒感)
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate(30); // 初始震动
      vibrateIntervalRef.current = setInterval(() => {
        navigator.vibrate(30);
      }, 150);
    }
  };

  const stopPressing = () => {
    setIsPressing(false);
    startTimeRef.current = 0;
    
    if (pressTimerRef.current) {
      cancelAnimationFrame(pressTimerRef.current);
      pressTimerRef.current = null;
    }
    
    if (vibrateIntervalRef.current) {
      clearInterval(vibrateIntervalRef.current);
      vibrateIntervalRef.current = null;
    }

    // 重置进度
    setProgress(0);
  };

  // 组件卸载时清理定时器
  useEffect(() => {
    return () => {
      if (pressTimerRef.current) cancelAnimationFrame(pressTimerRef.current);
      if (vibrateIntervalRef.current) clearInterval(vibrateIntervalRef.current);
    };
  }, []);

  return (
    <>
      <button
        onPointerDown={startPressing}
        onPointerUp={stopPressing}
        onPointerLeave={stopPressing}
        onPointerCancel={stopPressing}
        onContextMenu={(e) => e.preventDefault()} // 防止长按出现右键菜单
        // touch-none 和 select-none 阻止移动端默认的长按行为
        className="group relative flex w-40 items-center justify-center overflow-hidden rounded-full border border-white/20 bg-transparent px-8 py-3 text-sm font-medium tracking-widest text-white transition-all select-none touch-none hover:bg-white/5 z-10"
        style={{ WebkitTouchCallout: "none" }}
      >
        {/* 背景进度填充 */}
        <div 
          className="absolute left-0 top-0 bottom-0 bg-white/20"
          style={{ 
            width: `${progress}%`,
            transition: isPressing ? 'none' : 'width 0.3s ease-out'
          }}
        />
        
        <span className={`relative z-10 transition-transform ${isPressing ? 'scale-95 animate-shake-vibrate' : 'scale-100'}`}>
          长按进入
        </span>
      </button>

      {rippling && (
        <div
          className="fixed inset-0 z-50 pointer-events-none overflow-hidden"
          aria-hidden="true"
        >
          <span
            className="absolute animate-blur-ripple rounded-full bg-white/20 backdrop-blur-3xl"
            style={{
              left: coords.x,
              top: coords.y,
              transform: "translate(-50%, -50%)",
              boxShadow: "0 0 100px 100px rgba(255, 255, 255, 0.2)",
            }}
          />
        </div>
      )}
    </>
  );
}
