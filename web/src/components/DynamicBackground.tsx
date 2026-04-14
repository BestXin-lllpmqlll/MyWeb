export default function DynamicBackground() {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-zinc-950">
      <div className="absolute top-0 -left-10 sm:-left-4 w-64 h-64 sm:w-96 sm:h-96 bg-purple-500 rounded-full mix-blend-screen filter blur-[60px] sm:blur-[80px] opacity-60 animate-blob" />
      <div className="absolute top-0 -right-10 sm:-right-4 w-64 h-64 sm:w-96 sm:h-96 bg-blue-500 rounded-full mix-blend-screen filter blur-[60px] sm:blur-[80px] opacity-60 animate-blob animation-delay-2000" />
      <div className="absolute -bottom-20 sm:-bottom-8 left-10 sm:left-20 w-64 h-64 sm:w-96 sm:h-96 bg-pink-500 rounded-full mix-blend-screen filter blur-[60px] sm:blur-[80px] opacity-60 animate-blob animation-delay-4000" />
      
      {/* 模糊层放到最上面，但透明度要调整，否则会完全盖住下面的发光体 */}
      <div className="absolute inset-0 bg-zinc-950/30 backdrop-blur-[60px] sm:backdrop-blur-[100px] z-10" />
    </div>
  );
}