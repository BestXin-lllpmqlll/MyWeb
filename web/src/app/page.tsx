import DeviceTiltText from "@/components/DeviceTiltText";
import DynamicBackground from "@/components/DynamicBackground";
import RippleEnterButton from "@/components/RippleEnterButton";

export default function Home() {
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center p-4 sm:p-8 overflow-hidden bg-black relative">
      <DynamicBackground />
      <DeviceTiltText>
        <main className="flex flex-col items-center space-y-4 sm:space-y-6 text-center z-10 relative px-4">
          <h1 className="text-5xl sm:text-6xl md:text-8xl font-extrabold tracking-tighter text-white mix-blend-plus-lighter drop-shadow-md">
            XIN & PAN
          </h1>
          <p className="max-w-[280px] sm:max-w-xl text-sm sm:text-lg md:text-2xl font-light tracking-wide text-zinc-300 uppercase">
            Creative Portfolio
          </p>
          <div className="mt-8 sm:mt-12 flex flex-col items-center gap-6">
            <RippleEnterButton href="/main">
              ENTER
            </RippleEnterButton>
            <p className="text-xs sm:text-sm text-zinc-500 font-medium tracking-widest uppercase mt-4">
              Where Creativity Meets Code
            </p>
          </div>
        </main>
      </DeviceTiltText>
    </div>
  );
}
