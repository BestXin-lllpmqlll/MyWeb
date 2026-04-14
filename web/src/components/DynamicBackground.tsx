export default function DynamicBackground() {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-zinc-950">
      {/* 模糊层 */}
      <div className="absolute inset-0 bg-zinc-950/80 backdrop-blur-[100px] z-10" />
      
      <div className="absolute top-0 -left-4 w-96 h-96 bg-purple-500 rounded-full mix-blend-screen filter blur-[80px] opacity-30 animate-blob" />
      <div className="absolute top-0 -right-4 w-96 h-96 bg-blue-500 rounded-full mix-blend-screen filter blur-[80px] opacity-30 animate-blob animation-delay-2000" />
      <div className="absolute -bottom-8 left-20 w-96 h-96 bg-pink-500 rounded-full mix-blend-screen filter blur-[80px] opacity-30 animate-blob animation-delay-4000" />
    </div>
  );
}