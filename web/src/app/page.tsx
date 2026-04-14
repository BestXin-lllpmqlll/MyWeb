import DeviceTiltText from "@/components/DeviceTiltText";
import DynamicBackground from "@/components/DynamicBackground";

export default function Home() {
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center p-4 sm:p-8 overflow-hidden">
      <DynamicBackground />
      <DeviceTiltText>
        <main className="flex flex-col items-center space-y-4 sm:space-y-6 text-center z-10 relative px-4">
          <h1 className="text-5xl sm:text-6xl md:text-8xl font-extrabold tracking-tighter text-white mix-blend-plus-lighter drop-shadow-md">
            XIN & PAN
          </h1>
          <p className="max-w-[280px] sm:max-w-xl text-sm sm:text-lg md:text-2xl font-light tracking-wide text-zinc-300 uppercase">
            Portfolio &middot; Redesign in Progress
          </p>
          <div className="mt-6 sm:mt-8 h-1 w-16 sm:w-24 animate-pulse bg-white/80 rounded-full shadow-[0_0_15px_rgba(255,255,255,0.5)]"></div>
          <p className="mt-8 sm:mt-12 text-xs sm:text-sm text-zinc-400 font-medium">
            Where Creativity Meets Code.
          </p>
        </main>
      </DeviceTiltText>
    </div>
  );
}
