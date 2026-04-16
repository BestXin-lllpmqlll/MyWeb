"use client";

import DeviceTiltText from "@/components/DeviceTiltText";
import DynamicBackground from "@/components/DynamicBackground";
import LongPressScreen from "@/components/LongPressScreen";
import Typewriter from "@/components/Typewriter";

export default function Home() {
  return (
    <LongPressScreen href="/main">
      {(isPressing: boolean, isSuccess: boolean) => (
        <div className="flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden relative w-full perspective-1000 bg-black">
          <DeviceTiltText>
            <div className="flex flex-col items-center justify-center w-full min-h-[100dvh] relative transform-style-3d">
              {/* Background Layer (scaled up significantly to prevent edge clipping when rotated) */}
              <div className="absolute inset-0 z-[-1] translate-z--500 pointer-events-none flex items-center justify-center scale-[1.5]">
                <DynamicBackground isSuccess={isSuccess} />
              </div>
              
              {/* Foreground Text Layer */}
              <main className="flex flex-col items-center space-y-4 sm:space-y-6 text-center z-10 relative px-4 w-full">
                <div className={`transition-transform duration-100 flex flex-col items-center justify-center ${isPressing ? "animate-shake-vibrate" : "scale-100"}`}>
                  <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-[0.05em] sm:tracking-[0.1em] text-white mix-blend-plus-lighter drop-shadow-md pointer-events-none min-h-[1.2em] flex items-center justify-center w-full">
                    <Typewriter words={[
                      "XIN & PAN", 
                      "(づ￣ 3￣)づ", 
                      "XIN & PAN", 
                      "(✧∇✧)", 
                      "XIN & PAN", 
                      "(≧∇≦)ﾉ", 
                      "XIN & PAN", 
                      "(o^^o)", 
                      "XIN & PAN", 
                      "(●'◡'●)", 
                      "XIN & PAN", 
                      "( ´ ▽ ` )", 
                      "XIN & PAN", 
                      "(p≧w≦q)", 
                      "XIN & PAN", 
                      "(★ ω ★)", 
                      "XIN & PAN", 
                      "(*/ω＼*)", 
                      "XIN & PAN", 
                      "o(*￣▽￣*)o", 
                      "XIN & PAN", 
                      "( •̀ ω •́ )✧", 
                      "XIN & PAN", 
                      "(*^▽^*)"
                    ]} />
                  </h1>
                  <p className="max-w-[280px] sm:max-w-xl text-sm sm:text-lg md:text-2xl font-light tracking-wide text-zinc-300 uppercase pointer-events-none mt-4 text-center">
                    Creative Portfolio
                  </p>
                </div>
              </main>
            </div>
          </DeviceTiltText>
        </div>
      )}
    </LongPressScreen>
  );
}
