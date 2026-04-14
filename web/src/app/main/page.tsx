export default function Main() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-black p-8 sm:p-16 animate-in fade-in duration-1000">
      <header className="flex items-center justify-between mb-16">
        <div className="text-xl font-bold tracking-tighter">XIN & PAN</div>
        <nav className="text-sm font-medium uppercase tracking-widest text-zinc-500">
          Portfolio
        </nav>
      </header>
      
      <main className="flex-1 flex flex-col items-start max-w-4xl">
        <h1 className="text-4xl sm:text-6xl font-light tracking-tight mb-8">
          Welcome to the <br/>
          <span className="font-bold">Next Chapter.</span>
        </h1>
        <p className="text-lg text-zinc-600 max-w-2xl leading-relaxed mb-12">
          This is the main landing area after the ripple transition. The page background is now white to seamlessly match the white ripple expansion from the landing screen, creating a smooth, theatrical entrance effect.
        </p>
        
        <div className="h-[1px] w-full bg-zinc-200 my-8"></div>
        
        <p className="text-sm text-zinc-400">
          You can start building your grid layout, horizontal scrolling gallery, or interactive 3D cards here.
        </p>
      </main>
    </div>
  );
}