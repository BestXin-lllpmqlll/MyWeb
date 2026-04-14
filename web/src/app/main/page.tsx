export default function Main() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-black p-6 sm:p-12 md:p-24 animate-in fade-in duration-1000 font-sans">
      {/* Header */}
      <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-16 gap-6">
        <div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-2">辛宇</h1>
          <p className="text-lg text-zinc-500 tracking-wide">
            (+86) 15305325150 | lllpmqlll2018@gmail.com
          </p>
          <p className="text-sm text-zinc-400 mt-1">
            21岁 | 共青团员 | 上海市静安区延安中路632弄
          </p>
        </div>
        <div className="hidden sm:block text-right">
          <div className="text-xl font-bold tracking-tighter uppercase text-zinc-300">Resume</div>
        </div>
      </header>

      <main className="flex-1 w-full max-w-5xl mx-auto space-y-24">
        
        {/* Education & Campus Experience */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold tracking-tight border-b-2 border-black pb-2 mb-6">教育背景</h2>
            <div className="flex flex-col space-y-2">
              <div className="flex justify-between items-start font-medium text-lg">
                <span>东华大学 (学士学位)</span>
                <span className="text-zinc-500 text-sm">2022-至今</span>
              </div>
              <div className="text-zinc-700">数字媒体艺术</div>
              <div className="text-sm text-zinc-500 font-medium">GPA: 4.0585 (班级第一)</div>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-tight border-b-2 border-black pb-2 mb-6">校园经历 / 奖学金</h2>
            <ul className="space-y-3 text-zinc-700">
              <li className="flex justify-between"><span>国家奖学金</span> <span className="text-sm text-zinc-500">2024-2025 学年</span></li>
              <li className="flex justify-between"><span>优秀学生</span> <span className="text-sm text-zinc-500">2024-2025 学年</span></li>
              <li className="flex justify-between"><span>伟星SAB奖学金</span> <span className="text-sm text-zinc-500">2023-2024 学年</span></li>
              <li className="flex justify-between"><span>东华大学奖学金</span> <span className="text-sm text-zinc-500">2022-2023 学年</span></li>
            </ul>
          </div>
        </section>

        {/* Work Experience */}
        <section>
          <h2 className="text-2xl font-bold tracking-tight border-b-2 border-black pb-2 mb-8">工作经历</h2>
          <div className="space-y-10">
            
            {/* Experience 1 */}
            <div className="group">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-2">
                <h3 className="text-xl font-bold group-hover:text-blue-600 transition-colors">字节跳动 ByteDance <span className="font-normal text-zinc-600">· 火山引擎 AI产品经理 (视觉方向)</span></h3>
                <span className="text-sm text-zinc-500 font-medium whitespace-nowrap mt-1 sm:mt-0">2025.12-至今</span>
              </div>
              <p className="text-zinc-600 leading-relaxed">工作内容：字节跳动自研火山引擎ToB体验、参与SeeDream4.5、SeeDance1.5项目</p>
            </div>

            {/* Experience 2 */}
            <div className="group">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-2">
                <h3 className="text-xl font-bold group-hover:text-blue-600 transition-colors">Tapestry COACH <span className="font-normal text-zinc-600">· 产品培训实习生 (设计方向)</span></h3>
                <span className="text-sm text-zinc-500 font-medium whitespace-nowrap mt-1 sm:mt-0">2025.2-2025.10</span>
              </div>
              <p className="text-zinc-600 leading-relaxed">工作内容：VI、banner、KT板、周边、邀请函、培训PPT制作、对接供应商、对接学员与讲师、培训现场支持、采购</p>
            </div>

            {/* Experience 3 */}
            <div className="group">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-2">
                <h3 className="text-xl font-bold group-hover:text-blue-600 transition-colors">蔚来汽车 NIO Academy <span className="font-normal text-zinc-600">· 产品培训实习生 (设计方向)</span></h3>
                <span className="text-sm text-zinc-500 font-medium whitespace-nowrap mt-1 sm:mt-0">2024.11-2025.2</span>
              </div>
              <p className="text-zinc-600 leading-relaxed">工作内容：培训课程物料设计(课程VI、banner、KT版、海报、周边、邀请函)、培训PPT制作、对接供应商、对接学员与讲师、培训现场支持、采购</p>
            </div>

            {/* Experience 4 */}
            <div className="group">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-2">
                <h3 className="text-xl font-bold group-hover:text-blue-600 transition-colors">同程旅游 <span className="font-normal text-zinc-600">· 运营实习生 (设计方向)</span></h3>
                <span className="text-sm text-zinc-500 font-medium whitespace-nowrap mt-1 sm:mt-0">2023.4-2024.10</span>
              </div>
              <p className="text-zinc-600 leading-relaxed">工作内容：小红书账号图文(考拉环游记、同程美辰国际旅行社宝山区)</p>
            </div>

            {/* Experience 5 */}
            <div className="group">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-2">
                <h3 className="text-xl font-bold group-hover:text-blue-600 transition-colors">宝洁 <span className="font-normal text-zinc-600">· 创意工作坊</span></h3>
                <span className="text-sm text-zinc-500 font-medium whitespace-nowrap mt-1 sm:mt-0">2024.1-2025.1</span>
              </div>
              <p className="text-zinc-600 leading-relaxed">工作内容：Olay小白瓶、碧浪平面设计策划、VM策划</p>
            </div>

          </div>
        </section>

        {/* Commercial Projects & Academic Achievements */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          <div>
            <h2 className="text-2xl font-bold tracking-tight border-b-2 border-black pb-2 mb-6">商业项目</h2>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-start font-bold">
                  <span>上海振华重工 包装设计服务</span>
                  <span className="text-sm text-zinc-500 font-medium">2025.6</span>
                </div>
                <p className="text-sm text-zinc-600 mt-1">会议伴手礼包装设计</p>
              </div>
              <div>
                <div className="flex justify-between items-start font-bold">
                  <span>中国汉服产业报告发布会 视频制作</span>
                  <span className="text-sm text-zinc-500 font-medium">2025.4</span>
                </div>
                <p className="text-sm text-zinc-600 mt-1">发布会PPT、宣传视频、特效设计</p>
              </div>
              <div>
                <div className="flex justify-between items-start font-bold">
                  <span>自然博物馆-自然百宝箱 平面设计服务</span>
                  <span className="text-sm text-zinc-500 font-medium">2025.1</span>
                </div>
                <p className="text-sm text-zinc-600 mt-1">主视觉、banner、KT板、周边设计、参与活动运营</p>
              </div>
              <div>
                <div className="flex justify-between items-start font-bold">
                  <span>上海崇明花红永乐 平面设计服务</span>
                  <span className="text-sm text-zinc-500 font-medium">2024.5</span>
                </div>
                <p className="text-sm text-zinc-600 mt-1">IP设计(三视图+MG动画)、系列农产品包装设计</p>
              </div>
              <div>
                <div className="flex justify-between items-start font-bold">
                  <span>绿波廊酒楼 包装设计服务</span>
                  <span className="text-sm text-zinc-500 font-medium">2024.5</span>
                </div>
                <p className="text-sm text-zinc-600 mt-1">枣泥酥、拎包酥、顺丰叶、蛋黄糕产品包装设计</p>
              </div>
              <div>
                <div className="flex justify-between items-start font-bold">
                  <span>自然博物馆-博物馆之夜 平面设计服务</span>
                  <span className="text-sm text-zinc-500 font-medium">2024.4</span>
                </div>
                <p className="text-sm text-zinc-600 mt-1">主视觉、banner、网页、易拉宝、面部彩绘设计</p>
              </div>
              <div>
                <div className="flex justify-between items-start font-bold">
                  <span>上海东方街舞 VI设计服务</span>
                  <span className="text-sm text-zinc-500 font-medium">2025.3</span>
                </div>
                <p className="text-sm text-zinc-600 mt-1">LOGO、品牌形象设计</p>
              </div>
            </div>
          </div>

          <div className="space-y-12">
            <div>
              <h2 className="text-2xl font-bold tracking-tight border-b-2 border-black pb-2 mb-6">学术成果</h2>
              <ul className="space-y-4">
                <li className="flex flex-col gap-1">
                  <span className="font-bold text-zinc-800">Nutmuse AI赋能非遗核雕</span>
                  <span className="text-sm text-zinc-600">该研究成果已投稿至 UIST 评审阶段</span>
                </li>
                <li className="flex flex-col gap-1">
                  <span className="font-bold text-zinc-800">VOCO AI增强视频气味释放</span>
                  <span className="text-sm text-zinc-600">该研究成果已投稿至 CHI 评审阶段</span>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold tracking-tight border-b-2 border-black pb-2 mb-6">技能专长</h2>
              <div className="space-y-4 text-sm text-zinc-700">
                <div>
                  <span className="font-bold text-black block mb-1">语言能力</span>
                  <span className="text-zinc-600">雅思IELTS 6.0, 四六级通过</span>
                </div>
                <div>
                  <span className="font-bold text-black block mb-1">视频制作 (编导、拍摄、剪辑、后期、特效)</span>
                  <span className="text-zinc-600">熟练使用云台、相机、PR、AE、剪映</span>
                </div>
                <div>
                  <span className="font-bold text-black block mb-1">AI 辅助设计</span>
                  <span className="text-zinc-600">即梦、Google AI studio、midjourney、chatGPT</span>
                </div>
              </div>
            </div>
          </div>

        </section>

        {/* Awards & Personal Advantages */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          <div>
            <h2 className="text-2xl font-bold tracking-tight border-b-2 border-black pb-2 mb-6">获奖经历</h2>
            <ul className="space-y-3 text-sm text-zinc-700">
              <li className="flex justify-between items-start"><span>2025 未来设计师(NCDA)省一等奖</span></li>
              <li className="flex justify-between items-start"><span>2025 未来设计师(NCDA)省二等奖 若干</span></li>
              <li className="flex justify-between items-start"><span>2025 米兰设计周高校展 三等奖 若干</span></li>
              <li className="flex justify-between items-start"><span>2025 欧莱雅商赛 L&apos;Oréal BrandStorm TOP 100</span></li>
              <li className="flex justify-between items-start"><span>2025 亚洲设计周 东盟-中国 TOP100</span></li>
              <li className="flex justify-between items-start"><span>2024 上海国际大学生广告节 三等奖</span></li>
              <li className="flex justify-between items-start"><span>2024 中国平面设计协会CGDA 银奖</span></li>
              <li className="flex justify-between items-start"><span>2024 中国之星设计奖 若干</span></li>
              <li className="flex justify-between items-start"><span>2023 未来设计师(NCDA)省二等奖</span></li>
              <li className="flex justify-between items-start"><span>2023 TIG GameJam 最佳创意奖</span></li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold tracking-tight border-b-2 border-black pb-2 mb-6">个人优势</h2>
            <ul className="space-y-4 text-sm text-zinc-700 list-disc list-outside ml-4">
              <li className="leading-relaxed">
                有丰富的设计经验，系统学习交互设计、用户体验、信息可视化等课程，习惯用结构化文档、流程图、原型来沟通问题和方案。
              </li>
              <li className="leading-relaxed">
                对前沿 AI 技术保持好奇，愿意主动学习新能力，善于接受体验优化建议。
              </li>
              <li className="leading-relaxed">
                在日常实践中，我会大量使用文本生成、图片/视频生成、语音等 AI 工具试验，也会对比不同模型和参数组合的效果。
              </li>
              <li className="leading-relaxed">
                熟练使用飞书等在线协作软件，能够与团队成员有效沟通，积极参与团队合作，共同完成目标。
              </li>
            </ul>
          </div>

        </section>

      </main>
    </div>
  );
}