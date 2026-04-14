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

    const rect = e.currentTarget.getBoundingClientRect();
    setCoords({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setRipple(true);

    // 等待波纹动画铺满全屏后再跳转
    setTimeout(() => {
      router.push(href);
    }, 800);
  };

  return (
    <button
      onClick={handleClick}
      className="group relative overflow-hidden rounded-full border border-white/20 bg-transparent px-8 py-3 text-sm font-medium uppercase tracking-widest text-white transition-all hover:bg-white/5 active:scale-95"
    >
      <span className="relative z-10">{children}</span>

      {rippling && (
        <span
          className="absolute z-0 animate-ripple rounded-full bg-white"
          style={{
            left: coords.x,
            top: coords.y,
            transform: "translate(-50%, -50%)",
          }}
        />
      )}
    </button>
  );
}
