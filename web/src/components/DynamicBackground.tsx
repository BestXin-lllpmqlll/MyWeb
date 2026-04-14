export default function DynamicBackground() {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-zinc-950">
      {/* 动态光晕球 */}
      <div className="absolute top-0 -left-10 sm:-left-4 w-64 h-64 sm:w-96 sm:h-96 bg-purple-500 rounded-full mix-blend-screen filter blur-[60px] sm:blur-[80px] opacity-60 animate-blob" />
      <div className="absolute top-0 -right-10 sm:-right-4 w-64 h-64 sm:w-96 sm:h-96 bg-blue-500 rounded-full mix-blend-screen filter blur-[60px] sm:blur-[80px] opacity-60 animate-blob animation-delay-2000" />
      <div className="absolute -bottom-20 sm:-bottom-8 left-10 sm:left-20 w-64 h-64 sm:w-96 sm:h-96 bg-pink-500 rounded-full mix-blend-screen filter blur-[60px] sm:blur-[80px] opacity-60 animate-blob animation-delay-4000" />
      
      {/* 背景柔光模糊层 */}
      <div className="absolute inset-0 bg-zinc-950/40 backdrop-blur-[60px] sm:backdrop-blur-[100px] z-10" />

      {/* 45度像素条纹阵列遮罩 */}
      <div 
        className="absolute inset-0 z-20 mix-blend-overlay opacity-[0.1] animate-pixel-move pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(45deg, #ffffff 25%, transparent 25%, transparent 50%, #ffffff 50%, #ffffff 75%, transparent 75%, transparent)
          `,
          backgroundSize: '16px 16px'
        }}
      />
    </div>
  );
}