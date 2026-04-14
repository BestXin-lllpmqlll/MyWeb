import { notFound } from "next/navigation";

import { portfolio } from "@/data/portfolio";

import PdfScrollViewer from "./PdfScrollViewer";

export const dynamicParams = false;
export const dynamic = "force-static";

function allItemIds() {
  const ids: string[] = [];
  for (const section of portfolio) {
    for (const m of section.members ?? []) {
      for (const i of m.items) ids.push(i.id);
    }
    for (const i of section.items ?? []) ids.push(i.id);
  }
  return ids;
}

export function generateStaticParams() {
  return allItemIds().map((id) => ({ id }));
}

function findItemById(id: string) {
  for (const section of portfolio) {
    for (const m of section.members ?? []) {
      const item = m.items.find((i) => i.id === id);
      if (item) {
        return { title: `${m.name} · ${item.title}`, storedName: item.storedName };
      }
    }
    const item = (section.items ?? []).find((i) => i.id === id);
    if (item) return { title: `${section.title} · ${item.title}`, storedName: item.storedName };
  }
  return null;
}

export default async function ViewPdfPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const found = findItemById(id);
  if (!found) notFound();

  return <PdfScrollViewer title={found.title} storedName={found.storedName} />;
}

