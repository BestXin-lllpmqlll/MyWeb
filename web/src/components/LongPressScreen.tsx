"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

const getNow = () => Date.now();

export default function LongPressScreen({ href, children }: { href: string; children: React.ReactNode | ((isPressing: boolean) => React.ReactNode) }) {
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
      pressTimerRef.current = requestAnimationFrame(() => updateProgress());
    }
  };

  const startPressing = (e: React.PointerEvent<HTMLDivElement>) => {
    // 防止右键触发
    if (e.button !== 0 && e.pointerType === "mouse") return;
    
    // 如果点击的是链接或按钮，不拦截（虽然首页目前没有其它按钮，但为了扩展性）
    const target = e.target as HTMLElement;
    if (target.closest("a") || target.closest("button")) {
      return;
    }
    
    e.preventDefault();
    if (rippling) return;

    setIsPressing(true);
    setProgress(0);
    setCoords({ x: e.clientX, y: e.clientY }); // 保存点击位置
    startTimeRef.current = getNow();
    
    // 启动动画循环
    pressTimerRef.current = requestAnimationFrame(() => updateProgress());

    // 启动震动反馈 (每 150ms 震动一次)
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate(30);
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
    <div
      onPointerDown={startPressing}
      onPointerUp={stopPressing}
      onPointerLeave={stopPressing}
      onPointerCancel={stopPressing}
      onContextMenu={(e) => e.preventDefault()} // 防止长按出现右键菜单
      className="relative w-full min-h-[100dvh] overflow-hidden select-none touch-none transition-transform scale-100"
      style={{ WebkitTouchCallout: "none" }}
    >
      {/* 底部进度条视觉反馈 */}
      <div 
        className="fixed bottom-0 left-0 h-1 bg-white/50 z-50 pointer-events-none"
        style={{ 
          width: `${progress}%`,
          transition: isPressing ? 'none' : 'width 0.3s ease-out'
        }}
      />

      {/* 当按压时，稍微给全屏加上一个暗角或变暗的效果 */}
      <div 
        className="fixed inset-0 bg-black/20 z-40 pointer-events-none transition-opacity duration-300"
        style={{ opacity: isPressing ? 1 : 0 }}
      />

      {/* 实际页面内容 */}
      {typeof children === 'function' ? children(isPressing) : children}

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
    </div>
  );
}
