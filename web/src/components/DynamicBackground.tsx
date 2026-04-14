export default function DynamicBackground() {
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
        {/* 斜着45度的像素阵列，高斯模糊，透明度30% */}
        <div 
          className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] animate-pixel-move-diagonal pointer-events-none mix-blend-screen"
          style={{
            opacity: 0.3,
            filter: 'blur(2px)',
            transform: 'rotate(-45deg)',
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Crect x='0' y='0' width='30' height='30' fill='rgba(255,255,255,0.9)'/%3E%3C/svg%3E")`,
            backgroundSize: '80px 80px'
          }}
        />
      </div>
    </div>
  );
}