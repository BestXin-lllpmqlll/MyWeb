"use client";

import DeviceTiltText from "@/components/DeviceTiltText";
import DynamicBackground from "@/components/DynamicBackground";
import LongPressScreen from "@/components/LongPressScreen";

export default function Home() {
  return (
    <LongPressScreen href="/main">
      {(isPressing: boolean) => (
        <div className="flex min-h-[100dvh] flex-col items-center justify-center p-4 sm:p-8 overflow-hidden relative">
          <div className="fixed inset-0 z-[-1]">
            <DynamicBackground isPressing={isPressing} />
          </div>
          <DeviceTiltText>
            <main className="flex flex-col items-center space-y-4 sm:space-y-6 text-center z-10 relative px-4">
              <div className={`transition-transform duration-100 ${isPressing ? "animate-shake-vibrate" : "scale-100"}`}>
                <h1 className="text-5xl sm:text-6xl md:text-8xl font-extrabold tracking-tighter text-white mix-blend-plus-lighter drop-shadow-md pointer-events-none">
                  XIN &amp; PAN
                </h1>
                <p className="max-w-[280px] sm:max-w-xl text-sm sm:text-lg md:text-2xl font-light tracking-wide text-zinc-300 uppercase pointer-events-none mt-4">
                  Creative Portfolio
                </p>
              </div>
            </main>
          </DeviceTiltText>
        </div>
      )}
    </LongPressScreen>
  );
}
