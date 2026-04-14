"use client";

import Link from "next/link";

import { portfolio } from "@/data/portfolio";

export default function LibraryClient() {
  const sections = portfolio;

  return (
    <div className="flex min-h-screen flex-col bg-white text-black p-8 sm:p-16 animate-in fade-in duration-1000">
      <header className="flex items-center justify-between mb-16">
        <div className="text-xl font-bold tracking-tighter">XIN & PAN</div>
        <nav className="flex items-center gap-6 text-sm font-medium uppercase tracking-widest text-zinc-500">
          <Link href="/" className="hover:text-black transition-colors">Home</Link>
          <Link href="/main" className="hover:text-black transition-colors">Honors</Link>
          <span className="text-black">Library</span>
        </nav>
      </header>

      <main className="flex-1 flex flex-col max-w-5xl mx-auto w-full">
        <div className="mb-20 text-center">
          <h1 className="text-4xl sm:text-6xl font-light tracking-tight mb-6">
            Selected <span className="font-bold">Works.</span>
          </h1>
          <p className="text-lg text-zinc-500 max-w-2xl mx-auto leading-relaxed">
            成员作品集与精选商业项目
          </p>
        </div>

        <div className="flex flex-col gap-12">
          {sections.map((section) => (
            <section
              key={section.id}
              className="flex flex-col gap-6"
            >
              <div className="flex items-center justify-between border-b border-zinc-200 pb-4">
                <h2 className="text-2xl font-semibold tracking-tight text-zinc-900">
                  {section.title}
                </h2>
                <div className="text-xs text-zinc-400">
                  更新于 {new Date(section.updatedAt).toLocaleDateString()}
                </div>
              </div>

              {section.members ? (
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {section.members.map((m) => (
                    <li key={m.id} className="p-6 rounded-2xl bg-zinc-50 border border-zinc-100 hover:border-zinc-200 transition-colors">
                      <div className="flex flex-col gap-1 mb-6">
                        <div className="text-lg font-medium text-zinc-900">
                          {m.name}
                        </div>
                        <div className="text-sm text-zinc-500">
                          {m.emails.join(" · ")}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-3">
                        {m.items.map((i) => (
                          <Link
                            key={i.id}
                            className="rounded-full bg-white border border-zinc-200 px-4 py-2 text-sm font-medium hover:bg-zinc-900 hover:text-white hover:border-zinc-900 transition-all shadow-sm"
                            href={`/view/${encodeURIComponent(i.id)}`}
                          >
                            {i.title}
                          </Link>
                        ))}
                      </div>
                    </li>
                  ))}
                </ul>
              ) : null}

              {section.items ? (
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {section.items.map((i) => (
                    <li key={i.id} className="group flex flex-col justify-between p-6 rounded-2xl bg-zinc-50 border border-zinc-100 hover:bg-zinc-100 hover:border-zinc-200 transition-all">
                      <div className="text-base font-medium text-zinc-900 mb-6 group-hover:text-black transition-colors">
                        {i.title}
                      </div>
                      <Link
                        className="self-start rounded-full bg-white border border-zinc-200 px-4 py-2 text-sm font-medium hover:bg-zinc-900 hover:text-white hover:border-zinc-900 transition-all shadow-sm"
                        href={`/view/${encodeURIComponent(i.id)}`}
                      >
                        全屏查看
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </div>
      </main>
    </div>
  );
}
