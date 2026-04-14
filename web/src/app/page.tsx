import DeviceTiltText from "@/components/DeviceTiltText";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-8 overflow-hidden">
      <DeviceTiltText>
        <main className="flex flex-col items-center space-y-6 text-center">
          <h1 className="text-5xl font-extrabold tracking-tighter md:text-8xl">
            XIN & PAN
          </h1>
          <p className="max-w-xl text-lg font-light tracking-wide text-zinc-400 md:text-2xl uppercase">
            Portfolio &middot; Redesign in Progress
          </p>
          <div className="mt-8 h-1 w-24 animate-pulse bg-white"></div>
          <p className="mt-12 text-sm text-zinc-600">
            Where Creativity Meets Code.
          </p>
        </main>
      </DeviceTiltText>
    </div>
  );
}
