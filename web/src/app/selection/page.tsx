"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SelectionPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [selectedCard, setSelectedCard] = useState<number | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSelect = (id: number, route: string | null) => {
    if (!route || selectedCard !== null) return;
    setSelectedCard(id);
    
    setTimeout(() => {
      router.push(route);
    }, 1200); // 1.2s delay for the card to shine and expand
  };

  const cards = [
    { id: 0, title: "LOCKED", desc: "Sealed Destiny", route: null, baseTransform: "rotate(-12deg) translateX(-140px) translateY(40px)" },
    { id: 1, title: "PORTFOLIO", desc: "Enter The Realm", route: "/main", baseTransform: "rotate(0deg) translateX(0px) translateY(0px)" },
    { id: 2, title: "MYSTERY", desc: "Unknown Path", route: null, baseTransform: "rotate(12deg) translateX(140px) translateY(40px)" },
  ];

  return (
    <div className="relative min-h-[100dvh] w-full bg-[#050505] overflow-hidden flex flex-col items-center justify-center">
      
      <div className={`absolute top-24 transition-opacity duration-1000 ${mounted && selectedCard === null ? "opacity-100" : "opacity-0"}`}>
        <h1 className="text-zinc-400 text-sm sm:text-xl tracking-[0.3em] uppercase font-light text-center">Choose Your Path</h1>
      </div>

      <div className="relative w-full max-w-4xl h-[500px] flex items-center justify-center mt-12">
        {cards.map((card, i) => {
          const isSelected = selectedCard === card.id;
          const isNotSelected = selectedCard !== null && !isSelected;

          return (
            <div
              key={card.id}
              className="absolute transition-all duration-700 ease-out"
              style={{
                transform: isSelected 
                  ? "rotate(0deg) translateX(0px) translateY(-40px) scale(1.2)" 
                  : card.baseTransform,
                zIndex: isSelected ? 50 : 10,
                opacity: isNotSelected ? 0 : 1,
                animation: mounted && selectedCard === null ? `card-enter 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.15}s both` : "none",
              }}
            >
              <div 
                onClick={() => handleSelect(card.id, card.route)}
                className={`w-48 sm:w-64 h-72 sm:h-96 rounded-xl border flex flex-col items-center justify-center p-6 text-center transition-all duration-300 relative overflow-hidden group
                  ${isSelected 
                    ? "border-white shadow-[0_0_60px_rgba(255,255,255,0.4)] bg-zinc-900" 
                    : `border-zinc-700 bg-zinc-900/90 ${card.route ? 'hover:border-zinc-300 hover:bg-zinc-800 hover:-translate-y-6 hover:rotate-0 hover:z-40 hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)] cursor-pointer' : 'hover:border-red-900/50 hover:bg-black cursor-not-allowed opacity-80 hover:opacity-100 hover:-translate-y-2'}`
                  }
                `}
              >
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none"></div>
                
                {/* Inner Frame */}
                <div className={`absolute inset-3 border rounded-lg pointer-events-none transition-colors duration-500
                  ${isSelected ? "border-white/40 animate-pulse" : "border-white/5 group-hover:border-white/20"}
                `}></div>
                
                {/* Content */}
                <div className={`transition-all duration-500 ${isSelected ? "scale-110" : "scale-100"}`}>
                  <h2 className={`text-xl sm:text-2xl font-bold tracking-widest mb-3 transition-colors ${isSelected ? "text-white" : "text-zinc-300 group-hover:text-white"}`}>
                    {card.title}
                  </h2>
                  <p className={`text-[10px] sm:text-xs uppercase tracking-widest transition-colors ${isSelected ? "text-zinc-300" : "text-zinc-500 group-hover:text-zinc-400"}`}>
                    {card.desc}
                  </p>
                </div>

                {/* Shine Effect on Hover (only for valid route) */}
                {card.route && !isSelected && (
                  <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 pointer-events-none"></div>
                )}

                {/* Flash Effect on Select */}
                {isSelected && (
                  <div className="absolute inset-0 bg-white animate-[flash_1.2s_ease-out_forwards] pointer-events-none"></div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}