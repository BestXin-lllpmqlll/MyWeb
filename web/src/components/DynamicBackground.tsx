export default function DynamicBackground() {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-zinc-950">
      {/* 动态光晕球 */}
      <div className="absolute top-0 -left-10 sm:-left-4 w-64 h-64 sm:w-96 sm:h-96 bg-purple-500 rounded-full mix-blend-screen filter blur-[60px] sm:blur-[80px] opacity-60 animate-blob" />
      <div className="absolute top-0 -right-10 sm:-right-4 w-64 h-64 sm:w-96 sm:h-96 bg-blue-500 rounded-full mix-blend-screen filter blur-[60px] sm:blur-[80px] opacity-60 animate-blob animation-delay-2000" />
      <div className="absolute -bottom-20 sm:-bottom-8 left-10 sm:left-20 w-64 h-64 sm:w-96 sm:h-96 bg-pink-500 rounded-full mix-blend-screen filter blur-[60px] sm:blur-[80px] opacity-60 animate-blob animation-delay-4000" />
      
      {/* 背景柔光模糊层 */}
      <div className="absolute inset-0 bg-zinc-950/40 backdrop-blur-[60px] sm:backdrop-blur-[100px] z-10" />

      {/* 45度像素方块遮罩层（边缘透明） */}
      <div 
        className="absolute inset-0 z-20 pointer-events-none"
        style={{
          WebkitMaskImage: 'radial-gradient(circle at center, black 20%, transparent 80%)',
          maskImage: 'radial-gradient(circle at center, black 20%, transparent 80%)'
        }}
      >
        {/* 斜着45度的像素阵列，高斯模糊，透明度10% */}
        <div 
          className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] opacity-10 blur-[2px] animate-pixel-move-diagonal"
          style={{
            transform: 'rotate(-45deg)',
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Crect x='0' y='0' width='4' height='4' fill='white'/%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}
        />
      </div>
    </div>
  );
}