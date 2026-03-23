# Bug 记录

## 2026-03-23：`output: "export"` 下 `next start` 无法启动

**现象**
- 执行 `npm run build` 后执行 `npm run start`，控制台报错：`"next start" does not work with "output: export" configuration`

**原因**
- 站点使用静态导出（`next.config.js` 里 `output: "export"`），生产预览需要对 `out/` 目录使用静态文件服务器

**修复**
- `npm run start` 改为静态预览：`node ./scripts/serve-out.mjs`

**回归校验**
- `npm run verify`
- `npm run start -- -p 3001` 后访问 `http://localhost:3001/`、`/library/` 返回 200

## 2026-03-23：静态导出下动态路由无可导出页面导致构建失败

**现象**
- `output: "export"` 下存在动态路由且没有任何可预渲染路径时，`next build` 报错类似：
  - `Page "/pdf/[id]" is missing "generateStaticParams()"...`

**原因**
- 静态导出模式下，动态路由必须能导出至少一个静态页面；当 `generateStaticParams()` 返回空数组时，Next 视为没有可导出页面并直接报错

**修复**
- 移除无可导出页面的动态路由 `/pdf/[id]`
- 将页面收敛为静态「作品集」数据维护方式

**回归校验**
- `npm run verify`

## 2026-03-23：本地静态预览脚本路径处理错误导致 404

**现象**
- `npm run build` 后 `npm run start` 启动成功，但访问 `/`、`/library/` 返回 404

**原因**
- 预览脚本在拼接本地文件路径时未剥离 URL 前导 `/`，导致无法正确映射到 `out/` 目录文件

**修复**
- 修正路径拼接逻辑（确保 `/foo` 映射到 `${outDir}/foo`）
- 在 `npm run verify` 中加入静态预览冒烟测试（启动临时预览服务并请求 `/`、`/library/` 必须返回 200）

**回归校验**
- `npm run verify`
