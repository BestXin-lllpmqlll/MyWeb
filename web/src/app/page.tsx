import DeviceTiltText from "@/components/DeviceTiltText";
import DynamicBackground from "@/components/DynamicBackground";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-8 overflow-hidden">
      <DynamicBackground />
      <DeviceTiltText>
        <main className="flex flex-col items-center space-y-6 text-center z-10 relative">
          <h1 className="text-5xl font-extrabold tracking-tighter md:text-8xl text-white mix-blend-plus-lighter drop-shadow-md">
            XIN & PAN
          </h1>
          <p className="max-w-xl text-lg font-light tracking-wide text-zinc-300 md:text-2xl uppercase">
            Portfolio &middot; Redesign in Progress
          </p>
          <div className="mt-8 h-1 w-24 animate-pulse bg-white/80 rounded-full shadow-[0_0_15px_rgba(255,255,255,0.5)]"></div>
          <p className="mt-12 text-sm text-zinc-400 font-medium">
            Where Creativity Meets Code.
          </p>
        </main>
      </DeviceTiltText>
    </div>
  );
}
