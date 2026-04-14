"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

import { withBasePath } from "@/lib/withBasePath";

export default function PdfScrollViewer(props: {
  title: string;
  storedName: string;
}) {
  const { title, storedName } = props;
  const url = useMemo(() => {
    return withBasePath(`/pdfs/${encodeURIComponent(storedName)}`);
  }, [storedName]);

  const pagesRef = useRef<HTMLDivElement | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "ready" | "error">(
    "idle",
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    let destroyTask: (() => void) | null = null;
    const pagesEl = pagesRef.current;

    async function run() {
      setStatus("loading");
      setErrorMessage(null);
      if (!pagesEl) return;
      pagesEl.replaceChildren();

      try {
        const pdfjs = await import("pdfjs-dist/build/pdf.mjs");
        const loadingTask = pdfjs.getDocument({ url, disableWorker: true });
        destroyTask = () => loadingTask.destroy();
        const pdf = await loadingTask.promise;

        const containerWidth = Math.max(320, pagesEl.clientWidth);

        for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
          if (cancelled) return;
          const page = await pdf.getPage(pageNumber);
          const unscaled = page.getViewport({ scale: 1 });
          const scale = containerWidth / unscaled.width;
          const viewport = page.getViewport({ scale });

          const wrapper = document.createElement("div");
          wrapper.className =
            "w-full overflow-hidden rounded-2xl border border-zinc-200 bg-white";

          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          if (!ctx) throw new Error("NO_CANVAS_CONTEXT");

          canvas.width = Math.floor(viewport.width);
          canvas.height = Math.floor(viewport.height);
          canvas.style.width = "100%";
          canvas.style.height = "auto";

          wrapper.appendChild(canvas);
          pagesEl.appendChild(wrapper);

          const renderTask = page.render({ canvasContext: ctx, viewport });
          await renderTask.promise;
        }

        if (cancelled) return;
        setStatus("ready");
      } catch (e: unknown) {
        if (cancelled) return;
        setErrorMessage(e instanceof Error ? e.message : String(e));
        setStatus("error");
      }
    }

    void run();

    return () => {
      cancelled = true;
      destroyTask?.();
      pagesEl?.replaceChildren();
    };
  }, [url]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-zinc-50">
      <div className="shrink-0 border-b border-zinc-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3">
          <div className="min-w-0 truncate text-sm font-medium text-zinc-900">
            {title}
          </div>
          <div className="flex shrink-0 items-center gap-2">
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

      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-5xl px-4 py-6">
          {status === "loading" ? (
            <div className="text-sm text-zinc-600">加载中…</div>
          ) : null}
          {status === "error" ? (
            <div className="text-sm text-red-600">
              加载失败：请确认 PDF 文件存在且可访问（public/pdfs）。
              {errorMessage ? (
                <div className="mt-2 break-all text-xs text-zinc-600">
                  {errorMessage}
                </div>
              ) : null}
            </div>
          ) : null}
          <div ref={pagesRef} className="flex flex-col gap-6" />
        </div>
      </div>
    </div>
  );
}
