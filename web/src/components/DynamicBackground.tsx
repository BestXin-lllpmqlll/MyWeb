"use client";

import { useEffect, useState } from "react";

interface Particle {
  id: number;
  left: number;
  top: number;
  size: number;
  depth: number;
  duration: number;
  delay: number;
  rotationOffset: number;
}

export default function DynamicBackground({ isSuccess }: { isSuccess?: boolean }) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // 客户端生成粒子，避免 SSR 不匹配
    const generated = Array.from({ length: 600 }).map((_, i) => ({
      id: i,
      left: Math.random() * 120 - 10, // -10% to 110%
      top: Math.random() * 120 - 10,
      size: Math.random() * 15 + 8, // 8px to 23px
      depth: Math.random() * 4 + 1, // 1 (近) 到 5 (远)
      duration: Math.random() * 20 + 15, // 15s to 35s
      delay: Math.random() * -30,
      rotationOffset: Math.random() * 90 - 45, // 随机初始旋转角度
    }));
    setParticles(generated);
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-zinc-950">
      {/* 背景柔光模糊层 */}
      <div className="absolute inset-0 bg-zinc-950/40 backdrop-blur-[60px] sm:backdrop-blur-[100px] z-10" />

      {/* 45度像素方块遮罩层（边缘透明） */}
      <div 
        className="absolute inset-0 z-20 pointer-events-none mix-blend-screen"
        style={{
          WebkitMaskImage: 'radial-gradient(circle at center, black 30%, transparent 70%)',
          maskImage: 'radial-gradient(circle at center, black 30%, transparent 70%)'
        }}
      >
        {/* 旋转波浪式聚集动画包裹层（进入成功时触发） */}
        <div
          className="absolute inset-0 transition-all duration-[2500ms]"
          style={{ 
            opacity: isSuccess ? 0 : 1,
            transitionTimingFunction: 'ease-in'
          }}
        >
          {/* 数字生命粒子阵列，散落且具有深度和上下浮动感 */}
          {particles.map((p) => {
            const baseBlur = Math.max(0, p.depth - 1.5);
            const baseOpacity = Math.min(0.6, 1.2 / p.depth);
            
            // 点击进入时的最终状态：向中心聚拢，增加模糊和缩小
            const blur = isSuccess ? baseBlur + 8 : baseBlur;
            const opacity = isSuccess ? 0 : baseOpacity;

            return (
              <div
                key={p.id}
                className="absolute transition-all ease-in"
                style={{
                  left: isSuccess ? '50%' : `${p.left}%`,
                  top: isSuccess ? '50%' : `${p.top}%`,
                  opacity,
                  filter: `blur(${blur}px)`,
                  transitionDuration: isSuccess ? '2500ms' : '0ms',
                  transform: 'translate(-50%, -50%)',
                  zIndex: Math.round(10 / p.depth),
                }}
              >
                {/* 旋转容器 */}
                <div
                  className="transition-all ease-in"
                  style={{
                    transitionDuration: isSuccess ? '2500ms' : '0ms',
                    transform: isSuccess 
                      ? `rotate(${720 + p.rotationOffset}deg) scale(0)` 
                      : `rotate(${45 + p.rotationOffset}deg) scale(1)`,
                  }}
                >
                  {/* 上下浮动动画层 */}
                  <div
                    className="bg-white shadow-[0_0_15px_rgba(255,255,255,0.6)]"
                    style={{
                      width: p.size,
                      height: p.size,
                      animation: isSuccess ? 'none' : `float-particle ${p.duration}s ease-in-out ${p.delay}s infinite alternate`,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}