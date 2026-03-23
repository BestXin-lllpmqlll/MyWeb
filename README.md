# 辛宇 · 潘镜如个人网站

本仓库用于部署到 GitHub Pages（静态托管）。

项目代码在 `web/` 目录：
- 作品集数据：`web/src/data/portfolio.ts`
- PDF 文件：`web/public/pdfs/`
- 构建产物：`web/out/`（自动生成，不需要提交）

## 本地预览

```bash
cd web
npm ci
npm run dev
```

打开：http://localhost:3000

## 部署到 GitHub Pages

仓库已包含 GitHub Actions 工作流：`.github/workflows/deploy-pages.yml`

在 GitHub 仓库设置：
- Settings → Pages → Source 选择 GitHub Actions

之后 push 到 `main/master` 会自动构建并发布。
