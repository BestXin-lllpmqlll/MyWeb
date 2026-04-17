"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SelectionPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  // 记录移动端当前激活（hover状态）的卡牌
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    // 简单检测是否为移动端设备 (通过触摸屏或屏幕宽度)
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches || ("ontouchstart" in window));
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleInteraction = (id: number, route: string | null) => {
    if (!route || selectedCard !== null) return;

    if (isMobile) {
      // 移动端逻辑：第一次点击激活 Hover 状态，第二次点击才选中
      if (activeCard !== id) {
        setActiveCard(id);
        return; // 仅激活，不跳转
      }
    }

    // PC端或移动端第二次点击：执行选中并跳转
    setSelectedCard(id);
    
    setTimeout(() => {
      router.push(route);
    }, 1200); // 1.2s delay for the card to shine and expand
  };

  const getBaseTransform = (id: number) => {
    // 根据是否为移动端调整卡牌之间的间距，避免手机端横向溢出屏幕
    // 原本 PC 端 offset 是 140，现在加大到 220 甚至 260
    const offset = isMobile ? 140 : 260; 
    if (id === 0) return `rotate(-12deg) translateX(-${offset}px) translateY(40px)`;
    if (id === 1) return `rotate(0deg) translateX(0px) translateY(0px)`;
    if (id === 2) return `rotate(12deg) translateX(${offset}px) translateY(40px)`;
    return "";
  };

  const cardsData = [
    { id: 0, title: "LOCKED", desc: "Sealed Destiny", route: null },
    { id: 1, title: "PORTFOLIO", desc: "Enter The Realm", route: "/main" },
    { id: 2, title: "MYSTERY", desc: "Unknown Path", route: null },
  ];

  return (
    <div className="relative min-h-[100dvh] w-full bg-[#050505] overflow-hidden flex flex-col items-center justify-center">
      
      <div className={`absolute top-24 transition-opacity duration-1000 ${mounted && selectedCard === null ? "opacity-100" : "opacity-0"}`}>
        <h1 className="text-zinc-400 text-sm sm:text-xl tracking-[0.3em] uppercase font-light text-center">Choose Your Path</h1>
      </div>

      <div className="relative w-full max-w-4xl h-[500px] flex items-center justify-center mt-12">
        {cardsData.map((card, i) => {
          const isSelected = selectedCard === card.id;
          const isNotSelected = selectedCard !== null && !isSelected;
          const baseTransform = getBaseTransform(card.id);
          
          // 在移动端，被 active 的卡片视为拥有 hover 效果
          const isHoveredInMobile = isMobile && activeCard === card.id;

          return (
            <div
              key={card.id}
              className={`absolute transition-all duration-700 ease-out group/wrapper ${isSelected ? "" : "hover:z-50"} ${isHoveredInMobile ? "z-50" : ""}`}
              style={{
                transform: isSelected 
                  ? "rotate(0deg) translateX(0px) translateY(-40px) scale(1.2)" 
                  : (isHoveredInMobile && card.route) // 移动端激活有效卡片时模拟 hover 状态的回正放大
                    ? "rotate(0deg) translateX(0px) translateY(-24px) scale(1.05)"
                    : baseTransform,
                zIndex: isSelected || isHoveredInMobile ? 50 : undefined,
                opacity: isNotSelected ? 0 : 1,
                animation: mounted && selectedCard === null ? `card-enter 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.15}s both` : "none",
              }}
            >
              <div 
                onClick={() => handleInteraction(card.id, card.route)}
                className={`w-48 sm:w-64 h-72 sm:h-96 rounded-xl border flex flex-col items-center justify-center p-6 text-center transition-all duration-300 relative overflow-hidden group
                  ${isSelected 
                    ? "border-white shadow-[0_0_60px_rgba(255,255,255,0.4)] bg-zinc-900" 
                    : `border-zinc-700 bg-zinc-900 ${
                        card.route 
                          ? (isHoveredInMobile 
                              ? 'border-zinc-300 bg-zinc-800 shadow-[0_20px_40px_rgba(0,0,0,0.5)] cursor-pointer' // 移动端模拟 hover
                              : 'md:hover:border-zinc-300 md:hover:bg-zinc-800 md:hover:-translate-y-6 md:hover:rotate-0 md:hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)] cursor-pointer') 
                          : (isHoveredInMobile
                              ? 'border-red-900/50 bg-black cursor-not-allowed opacity-100 -translate-y-2'
                              : 'md:hover:border-red-900/50 md:hover:bg-black cursor-not-allowed md:hover:opacity-100 md:hover:-translate-y-2')
                      }`
                  }
                `}
              >
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none"></div>
                
                {/* Inner Frame */}
                <div className={`absolute inset-3 border rounded-lg pointer-events-none transition-colors duration-500
                  ${isSelected ? "border-white/40 animate-pulse" : `border-white/5 ${isHoveredInMobile ? "border-white/20" : "md:group-hover:border-white/20"}`}
                `}></div>
                
                {/* Content */}
                <div className={`transition-all duration-500 ${isSelected ? "scale-110" : "scale-100"}`}>
                  <h2 className={`text-xl sm:text-2xl font-bold tracking-widest mb-3 transition-colors ${isSelected ? "text-white" : `text-zinc-300 ${isHoveredInMobile ? "text-white" : "md:group-hover:text-white"}`}`}>
                    {card.title}
                  </h2>
                  <p className={`text-[10px] sm:text-xs uppercase tracking-widest transition-colors ${isSelected ? "text-zinc-300" : `text-zinc-500 ${isHoveredInMobile ? "text-zinc-400" : "md:group-hover:text-zinc-400"}`}`}>
                    {card.desc}
                  </p>
                </div>

                {/* Shine Effect on Hover (only for valid route) */}
                {card.route && !isSelected && (
                  <div className={`absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 pointer-events-none ${isHoveredInMobile ? "animate-[shimmer_1.5s_infinite]" : "md:group-hover:animate-[shimmer_1.5s_infinite]"}`}></div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}