"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RippleEnterButton({ href, children }: { href: string; children: React.ReactNode }) {
  const [rippling, setRipple] = useState(false);
  const [coords, setCoords] = useState({ x: -1, y: -1 });
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (rippling) return;

    // 获取相对于视口的中心坐标 (屏幕正中心)
    setCoords({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
    setRipple(true);

    // 等待波纹铺满全屏后再跳转
    setTimeout(() => {
      router.push(href);
    }, 1000);
  };

  return (
    <>
      <button
        onClick={handleClick}
        className="group relative rounded-full border border-white/20 bg-transparent px-8 py-3 text-sm font-medium uppercase tracking-widest text-white transition-all hover:bg-white/5 active:scale-95 z-10"
      >
        <span>{children}</span>
      </button>

      {rippling && (
        <div
          className="fixed inset-0 z-50 pointer-events-none overflow-hidden"
          aria-hidden="true"
        >
          {/* 利用 box-shadow 和 backdrop-filter 制作高斯模糊展开效果 */}
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
