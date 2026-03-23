"use client";

import Link from "next/link";

import { portfolio } from "@/data/portfolio";

export default function LibraryClient() {
  const sections = portfolio;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight">作品集</h1>
        <p className="text-sm text-zinc-600">成员作品集与商业项目</p>
      </div>

      <div className="flex flex-col gap-6">
        {sections.map((section) => (
          <section
            key={section.id}
            className="overflow-hidden rounded-2xl border border-zinc-200 bg-white"
          >
            <div className="flex items-center justify-between gap-4 border-b border-zinc-100 px-4 py-3">
              <div className="text-sm font-semibold text-zinc-900">
                {section.title}
              </div>
              <div className="text-xs text-zinc-500">
                更新于 {new Date(section.updatedAt).toLocaleDateString()}
              </div>
            </div>

            {section.members ? (
              <ul className="divide-y divide-zinc-100">
                {section.members.map((m) => (
                  <li key={m.id} className="p-4">
                    <div className="flex flex-col gap-1">
                      <div className="text-sm font-medium text-zinc-900">
                        {m.name}
                      </div>
                      <div className="text-xs text-zinc-500">
                        {m.emails.join(" · ")}
                      </div>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-2">
                      {m.items.map((i) => (
                        <Link
                          key={i.id}
                          className="rounded-full border border-zinc-300 px-3 py-1 text-xs font-medium hover:bg-zinc-50"
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
              <ul className="divide-y divide-zinc-100">
                {section.items.map((i) => (
                  <li key={i.id} className="flex items-center justify-between p-4">
                    <div className="text-sm font-medium text-zinc-900">
                      {i.title}
                    </div>
                    <Link
                      className="rounded-full border border-zinc-300 px-3 py-1 text-xs font-medium hover:bg-zinc-50"
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

      <div>
        <Link href="/" className="text-sm text-zinc-600 hover:underline">
          返回首页
        </Link>
      </div>
    </div>
  );
}
