export default function DynamicBackground({ isPressing }: { isPressing?: boolean }) {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-zinc-950">
      {/* 背景柔光模糊层 */}
      <div className="absolute inset-0 bg-zinc-950/40 backdrop-blur-[60px] sm:backdrop-blur-[100px] z-10" />

      {/* 45度像素方块遮罩层（边缘透明） */}
      <div 
        className="absolute inset-0 z-20 pointer-events-none mix-blend-screen"
        style={{
          WebkitMaskImage: 'radial-gradient(circle at center, black 20%, transparent 80%)',
          maskImage: 'radial-gradient(circle at center, black 20%, transparent 80%)'
        }}
      >
        {/* 斜着45度的像素阵列，长按时加速 */}
        <div 
          className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] pointer-events-none mix-blend-screen transition-all duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)]"
          style={{
            opacity: isPressing ? 0.6 : 0.3,
            filter: isPressing ? 'blur(0px)' : 'blur(2px)',
            transform: 'rotate(-45deg)',
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Crect x='0' y='0' width='30' height='30' fill='rgba(255,255,255,0.9)'/%3E%3C/svg%3E")`,
            backgroundSize: '80px 80px',
            animation: isPressing 
              ? 'pixel-move-diagonal 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite' // 极大加速且富有超强弹性(Back)
              : 'pixel-move-diagonal 20s linear infinite', // 平缓默认速度
          }}
        />
      </div>
    </div>
  );
}