import DeviceTiltText from "@/components/DeviceTiltText";
import DynamicBackground from "@/components/DynamicBackground";
import LongPressScreen from "@/components/LongPressScreen";

export default function Home() {
  return (
    <LongPressScreen href="/main">
      <div className="flex min-h-[100dvh] flex-col items-center justify-center p-4 sm:p-8 overflow-hidden bg-black relative">
        <DynamicBackground />
        <DeviceTiltText>
          <main className="flex flex-col items-center space-y-4 sm:space-y-6 text-center z-10 relative px-4">
          <h1 className="text-5xl sm:text-6xl md:text-8xl font-polonium font-extrabold tracking-tighter text-white mix-blend-plus-lighter drop-shadow-md pointer-events-none">
            XIN &amp; PAN
          </h1>
          <p className="max-w-[280px] sm:max-w-xl text-sm sm:text-lg md:text-2xl font-light tracking-wide text-zinc-300 uppercase pointer-events-none">
              Creative Portfolio
            </p>
            <div className="mt-12 sm:mt-16 flex flex-col items-center gap-4 animate-pulse pointer-events-none">
              <div className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center">
                <div className="w-4 h-4 rounded-full bg-white/50" />
              </div>
              <p className="text-xs sm:text-sm text-zinc-400 font-medium tracking-[0.2em] uppercase">
                长按屏幕任意位置进入
              </p>
            </div>
          </main>
        </DeviceTiltText>
      </div>
    </LongPressScreen>
  );
}
