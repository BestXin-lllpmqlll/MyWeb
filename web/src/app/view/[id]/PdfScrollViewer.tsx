"use client";

import Link from "next/link";
import { useMemo } from "react";

import { withBasePath } from "@/lib/withBasePath";

export default function PdfScrollViewer(props: {
  title: string;
  storedName: string;
}) {
  const { title, storedName } = props;
  const url = useMemo(() => {
    return withBasePath(`/pdfs/${encodeURIComponent(storedName)}`);
  }, [storedName]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-zinc-50">
      <div className="shrink-0 border-b border-zinc-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3">
          <div className="min-w-0 truncate text-sm font-medium text-zinc-900">
            {title}
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-zinc-300 px-3 py-1 text-xs font-medium hover:bg-zinc-50"
            >
              新窗口打开
            </a>
            <a
              href={url}
              download
              className="rounded-full border border-zinc-300 px-3 py-1 text-xs font-medium hover:bg-zinc-50"
            >
              下载
            </a>
            <Link
              href="/library"
              className="rounded-full border border-zinc-300 px-3 py-1 text-xs font-medium hover:bg-zinc-50"
            >
              返回作品集
            </Link>
            <Link
              href="/"
              className="rounded-full border border-zinc-300 px-3 py-1 text-xs font-medium hover:bg-zinc-50"
            >
              返回主页
            </Link>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        <iframe title={title} src={url} className="h-full w-full" />
      </div>
    </div>
  );
}
