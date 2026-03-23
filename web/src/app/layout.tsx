import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "辛宇 潘镜如个人网站",
  description: "成员信息与作品集",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-zinc-50 text-zinc-900">
        <header className="border-b border-zinc-200 bg-white">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
            <Link href="/" className="text-base font-semibold tracking-tight">
              辛宇 · 潘镜如
            </Link>
            <nav className="flex items-center gap-4 text-sm">
              <Link href="/library" className="hover:underline">
                作品集
              </Link>
            </nav>
          </div>
        </header>
        <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-6 py-10">
          {children}
        </main>
        <footer className="border-t border-zinc-200 bg-white">
          <div className="mx-auto max-w-5xl px-6 py-6 text-xs text-zinc-500">
            © {new Date().getFullYear()} 辛宇 · 潘镜如
          </div>
        </footer>
      </body>
    </html>
  );
}
