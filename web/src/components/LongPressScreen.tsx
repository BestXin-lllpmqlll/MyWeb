"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

const getNow = () => Date.now();

export default function LongPressScreen({ href, children }: { href: string; children: React.ReactNode | ((isPressing: boolean, isSuccess: boolean) => React.ReactNode) }) {
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
    }, 2500); // 增加时间，以完整展示缓慢漩涡动画
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
    
    // 如果点击的是链接或按钮，不拦截
    const target = e.target as HTMLElement;
    if (target.closest("a") || target.closest("button") || target.closest(".no-long-press")) {
      return;
    }
    
    e.preventDefault();
    if (rippling) return;

    setCoords({ x: e.clientX, y: e.clientY }); // 保存点击位置
    triggerSuccess(); // 点击直接触发成功
  };

  return (
    <div
      onClick={(e) => startPressing(e as unknown as React.PointerEvent<HTMLDivElement>)}
      onContextMenu={(e) => e.preventDefault()} // 防止右键菜单
      className="relative w-full min-h-[100dvh] overflow-hidden select-none cursor-pointer transition-transform scale-100"
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
      {typeof children === 'function' ? children(isPressing, rippling) : children}

      {rippling && (
        <div
          className="fixed inset-0 z-50 pointer-events-none bg-black animate-fade-in-black"
          aria-hidden="true"
        />
      )}
    </div>
  );
}
