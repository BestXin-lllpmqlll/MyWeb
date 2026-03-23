"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

import { portfolio } from "@/data/portfolio";

export default function LibraryClient() {
  const searchParams = useSearchParams();
  const qRaw = searchParams.get("q") ?? "";
  const q = qRaw.trim().toLowerCase();

  const sections = useMemo(() => {
    const normalize = (s: string) => s.toLowerCase();
    const match = (s: string) => normalize(s).includes(q);

    if (!q) return portfolio;

    return portfolio.filter((section) => {
      if (match(section.title)) return true;

      const members = section.members ?? [];
      for (const m of members) {
        if (match(m.name)) return true;
        if (m.emails.some((e) => match(e))) return true;
        if (m.items.some((i) => match(i.title) || match(i.storedName)))
          return true;
      }

      const items = section.items ?? [];
      if (items.some((i) => match(i.title) || match(i.storedName))) return true;

      return false;
    });
  }, [q]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight">作品集</h1>
        <p className="text-sm text-zinc-600">
          {q ? `搜索：${qRaw}` : "成员作品集与商业项目"}
        </p>
      </div>

      <form className="flex gap-2" method="get">
        <input
          name="q"
          defaultValue={qRaw}
          placeholder="搜索成员 / 邮箱 / 标题"
          className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-2 text-sm outline-none focus:border-zinc-900"
        />
        <button
          type="submit"
          className="rounded-xl bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800"
        >
          搜索
        </button>
      </form>

      {sections.length === 0 ? (
        <div className="rounded-2xl border border-zinc-200 bg-white p-8 text-sm text-zinc-600">
          未找到匹配结果。请调整搜索词，或在 src/data/portfolio.ts 里维护数据后重新部署。
        </div>
      ) : null}

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
