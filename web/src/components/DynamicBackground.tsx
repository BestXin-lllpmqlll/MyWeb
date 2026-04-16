export default function DynamicBackground({ isSuccess }: { isSuccess?: boolean }) {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-zinc-950">
      {/* 背景柔光模糊层 */}
      <div className="absolute inset-0 bg-zinc-950/40 backdrop-blur-[60px] sm:backdrop-blur-[100px] z-10" />

      {/* 45度像素方块遮罩层（边缘透明） */}
      <div 
        className="absolute inset-0 z-20 pointer-events-none mix-blend-screen"
        style={{
          WebkitMaskImage: 'radial-gradient(circle at center, black 30%, transparent 70%)',
          maskImage: 'radial-gradient(circle at center, black 30%, transparent 70%)'
        }}
      >
        {/* 旋转波浪式聚集动画包裹层（进入成功时触发） */}
        <div
          className="absolute inset-0 transition-all duration-[1000ms]"
          style={{ 
            opacity: isSuccess ? 0 : 1,
          }}
        >
          {/* 斜着45度的像素阵列 */}
          <div 
            className="absolute top-[-100%] left-[-100%] w-[300%] h-[300%] pointer-events-none mix-blend-screen transition-all duration-[1000ms]"
            style={{
              opacity: 0.3,
              filter: isSuccess ? 'blur(12px)' : 'blur(2px)', // 聚集时增加虚化产生波浪纵深感
              transform: isSuccess ? 'rotate(675deg) scale(0)' : 'rotate(-45deg) scale(1)', // 剧烈旋转并缩放到0
              transitionTimingFunction: 'cubic-bezier(0.5, -0.2, 0.2, 1)', // 带有回弹预备动作的聚集曲线
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Crect x='0' y='0' width='30' height='30' fill='rgba(255,255,255,0.9)'/%3E%3C/svg%3E")`,
              backgroundSize: '80px 80px',
              animation: 'pixel-move-diagonal 20s linear infinite', // 平缓默认速度
            }}
          />
        </div>
      </div>
    </div>
  );
}