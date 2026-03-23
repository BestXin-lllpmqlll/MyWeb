export default function Home() {
  return (
    <div className="flex flex-col gap-10">
      <section className="rounded-2xl border border-zinc-200 bg-white p-8">
        <h1 className="text-3xl font-semibold tracking-tight">
          辛宇 潘镜如个人网站
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-7 text-zinc-600">
          成员作品集与商业项目汇总，点击可查看 PDF。
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href="/library"
            className="inline-flex items-center rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800"
          >
            查看作品集
          </a>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-zinc-200 bg-white p-6">
          <div className="text-sm font-semibold">成员：辛宇</div>
          <div className="mt-2 text-sm text-zinc-600 leading-7">
            <div>220640127@mail.dhu.edu.cn</div>
            <div>lllpmqlll2018@gmail.com</div>
          </div>
        </div>
        <div className="rounded-2xl border border-zinc-200 bg-white p-6">
          <div className="text-sm font-semibold">成员：潘镜如</div>
          <div className="mt-2 text-sm text-zinc-600 leading-7">
            <div>220692209@mail.dhu.edu.cn</div>
          </div>
        </div>
      </section>
    </div>
  );
}
