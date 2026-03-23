import { Suspense } from "react";

import LibraryClient from "./LibraryClient";

export default function LibraryPage() {
  return (
    <Suspense
      fallback={<div className="text-sm text-zinc-600">加载中…</div>}
    >
      <LibraryClient />
    </Suspense>
  );
}
