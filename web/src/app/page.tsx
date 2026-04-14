"use client";

import DeviceTiltText from "@/components/DeviceTiltText";
import DynamicBackground from "@/components/DynamicBackground";
import LongPressScreen from "@/components/LongPressScreen";
import Typewriter from "@/components/Typewriter";

export default function Home() {
  return (
    <LongPressScreen href="/main">
      {(isPressing: boolean) => (
        <div className="flex min-h-[100dvh] flex-col items-center justify-center p-4 sm:p-8 overflow-hidden relative">
          <div className="fixed inset-0 z-[-1]">
            <DynamicBackground isPressing={isPressing} />
          </div>
          <DeviceTiltText>
            <main className="flex flex-col items-center space-y-4 sm:space-y-6 text-center z-10 relative px-4 w-full">
              <div className={`transition-transform duration-100 flex flex-col items-center justify-center ${isPressing ? "animate-shake-vibrate" : "scale-100"}`}>
                <h1 className="text-[2.2rem] leading-tight sm:text-5xl md:text-7xl font-extrabold tracking-tight sm:tracking-[0.1em] text-white mix-blend-plus-lighter drop-shadow-md pointer-events-none min-h-[1.5em] flex items-center justify-center w-full px-2 break-words">
                  <Typewriter words={["XIN & PAN", "XINYU & PANJINGRU"]} />
                </h1>
                <p className="max-w-[280px] sm:max-w-xl text-sm sm:text-lg md:text-2xl font-light tracking-wide text-zinc-300 uppercase pointer-events-none mt-4 text-center">
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
