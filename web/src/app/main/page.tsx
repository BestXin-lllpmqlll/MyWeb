import Link from "next/link";

export default function Main() {
  const awards = [
    { year: "2025", title: "未来设计师 (NCDA)", award: "省一等奖" },
    { year: "2025", title: "未来设计师 (NCDA)", award: "省二等奖 若干" },
    { year: "2025", title: "米兰设计周高校展", award: "三等奖 若干" },
    { year: "2025", title: "欧莱雅商赛 L'Oréal BrandStorm", award: "TOP 100" },
    { year: "2025", title: "亚洲设计周 东盟-中国", award: "TOP100" },
    { year: "2024", title: "上海国际大学生广告节", award: "三等奖" },
    { year: "2024", title: "中国平面设计协会CGDA", award: "银奖" },
    { year: "2024", title: "中国之星设计奖", award: "若干" },
    { year: "2023", title: "未来设计师 (NCDA)", award: "省二等奖" },
    { year: "2023", title: "TIG GameJam", award: "最佳创意奖" },
  ];

  const academic = [
    { title: "Nutmuse AI赋能非遗核雕", desc: "该研究成果已投稿至 UIST 评审阶段" },
    { title: "VOCO AI增强视频气味释放", desc: "该研究成果已投稿至 CHI 评审阶段" },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-white text-black p-8 sm:p-16 animate-in fade-in duration-1000">
      <header className="flex items-center justify-between mb-16">
        <div className="text-xl font-polonium font-bold tracking-tighter">XIN & PAN</div>
        <nav className="flex items-center gap-6 text-sm font-medium uppercase tracking-widest text-zinc-500">
          <Link href="/" className="hover:text-black transition-colors">Home</Link>
          <span className="text-black">Honors</span>
          <Link href="/library" className="hover:text-black transition-colors">Library</Link>
        </nav>
      </header>

      <main className="flex-1 flex flex-col items-center max-w-5xl mx-auto w-full">
        <div className="mb-20 text-center">
          <h1 className="text-4xl sm:text-6xl font-light tracking-tight mb-6">
            Creative <span className="font-bold">Recognitions.</span>
          </h1>
          <p className="text-lg text-zinc-500 max-w-2xl mx-auto leading-relaxed">
            A curated collection of awards, honors, and academic milestones achieved in digital media arts, design, and innovation.
          </p>
        </div>

        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          {/* Awards Section */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            <h2 className="text-2xl font-semibold border-b border-zinc-200 pb-4 tracking-tight">
              获 奖 经 历
            </h2>
            <div className="flex flex-col gap-6">
              {awards.map((item, i) => (
                <div
                  key={i}
                  className="flex flex-col sm:flex-row sm:items-center justify-between group py-2"
                >
                  <div className="flex items-center gap-6">
                    <span className="text-zinc-400 font-mono text-sm shrink-0">
                      {item.year}
                    </span>
                    <span className="text-lg font-medium text-zinc-900 group-hover:text-black transition-colors">
                      {item.title}
                    </span>
                  </div>
                  <span className="text-sm font-medium px-4 py-1.5 bg-zinc-100 text-zinc-600 rounded-full mt-3 sm:mt-0 whitespace-nowrap self-start sm:self-auto">
                    {item.award}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Academic Section */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            <h2 className="text-2xl font-semibold border-b border-zinc-200 pb-4 tracking-tight">
              学 术 成 果
            </h2>
            <div className="flex flex-col gap-10">
              {academic.map((item, i) => (
                <div key={i} className="flex flex-col gap-3 group">
                  <h3 className="text-lg font-medium text-zinc-900 leading-snug group-hover:text-black transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-zinc-500 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}