import type { Metadata } from "next";
import localFont from "next/font/local";
import CloudSyncWidget from "@/components/CloudSyncWidget";
import "./globals.css";

const polonium = localFont({
  src: "./fonts/Polonium.otf",
  variable: "--font-polonium",
  display: "swap",
});

export const metadata: Metadata = {
  title: "XIN & PAN | Portfolio",
  description: "Creative Portfolio of Xin Yu and Jingru Pan",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full antialiased ${polonium.variable}`}>
      <body className="min-h-full bg-black text-white selection:bg-white selection:text-black">
        {children}
        <CloudSyncWidget />
      </body>
    </html>
  );
}
