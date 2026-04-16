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
  isVortex: boolean;
}

export default function DynamicBackground({ isSuccess }: { isSuccess?: boolean }) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // 客户端生成基础粒子，避免 SSR 不匹配
    const baseParticles = Array.from({ length: 60 }).map((_, i) => ({
      id: i,
      left: Math.random() * 120 - 10, // -10% to 110%
      top: Math.random() * 120 - 10,
      size: Math.random() * 15 + 8, // 8px to 23px
      depth: Math.random() * 4 + 1, // 1 (近) 到 5 (远)
      duration: Math.random() * 20 + 15, // 15s to 35s
      delay: Math.random() * -30,
      rotationOffset: Math.random() * 90 - 45, // 随机初始旋转角度
      isVortex: false, // 标记为非漩涡新增粒子
    }));
    
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setParticles(baseParticles);
  }, []);

  useEffect(() => {
    if (isSuccess) {
      // 当点击成功时，额外生成 150 个位于屏幕外围四周的粒子，用于向内漩涡冲刺
      const vortexParticles = Array.from({ length: 150 }).map((_, i) => {
        // 随机生成在屏幕边界之外的一个环形区域
        const angle = Math.random() * Math.PI * 2;
        const radius = 80 + Math.random() * 60; // 80% 到 140% 半径范围
        const left = 50 + Math.cos(angle) * radius;
        const top = 50 + Math.sin(angle) * radius;
        
        return {
          id: 1000 + i, // 避免与基础粒子 id 冲突
          left,
          top,
          size: Math.random() * 10 + 4, // 漩涡粒子稍微小一点 4px to 14px
          depth: Math.random() * 3 + 1, // 深度 1 到 4
          duration: 0, // 漩涡粒子不需要浮动动画时长
          delay: 0,
          rotationOffset: Math.random() * 180 - 90,
          isVortex: true, // 标记为漩涡新增粒子
        };
      });
      
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setParticles(prev => [...prev, ...vortexParticles]);
    }
  }, [isSuccess]);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-zinc-950 w-full h-full">
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
            // 漩涡新增的粒子透明度稍低
            const baseOpacity = p.isVortex ? Math.min(0.4, 0.8 / p.depth) : Math.min(0.6, 1.2 / p.depth);
            
            // 点击进入时的最终状态：向中心聚拢，增加模糊和缩小
            const blur = isSuccess ? baseBlur + (p.isVortex ? 12 : 8) : baseBlur; // 漩涡粒子更模糊，模拟拉丝感
            const opacity = isSuccess ? 0 : baseOpacity;

            return (
              <div
                key={p.id}
                className="absolute transition-all"
                style={{
                  left: isSuccess ? '50%' : `${p.left}%`,
                  top: isSuccess ? '50%' : `${p.top}%`,
                  opacity,
                  filter: `blur(${blur}px)`,
                  transitionDuration: isSuccess ? '2500ms' : '0ms',
                  transitionTimingFunction: 'ease-in-out',
                  transform: 'translate(-50%, -50%)',
                  zIndex: Math.round(10 / p.depth),
                }}
              >
                {/* 旋转容器 */}
                <div
                  className="transition-all"
                  style={{
                    transitionDuration: isSuccess ? '2500ms' : '0ms',
                    transitionTimingFunction: 'ease-in-out',
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
                      animation: `float-particle ${p.duration}s ease-in-out ${p.delay}s infinite alternate`,
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