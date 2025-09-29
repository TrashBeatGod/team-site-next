# GitHub Pages 部署指南

本指南将帮助您将 Next.js 音乐团队网站部署到 GitHub Pages。

## 📋 部署前提条件

1. **GitHub 账户** - 确保您有 GitHub 账户
2. **Git 安装** - 本地已安装 Git
3. **Node.js 环境** - 项目已在本地正常运行

## 🚀 部署步骤

### 步骤 1: 创建 GitHub 仓库

1. 登录 GitHub
2. 点击右上角 "+" 按钮，选择 "New repository"
3. 填写仓库信息：
   - **Repository name**: `team-site-next` (或其他名称)
   - **Description**: 音乐团队官方网站
   - 选择 **Public** (公开)
   - 勾选 "Add a README file"
   - 点击 "Create repository"

### 步骤 2: 本地 Git 初始化

如果项目还没有 Git 仓库：

```bash
# 在项目根目录执行
git init
git add .
git commit -m "Initial commit: Next.js music team site"
```

### 步骤 3: 连接到 GitHub 仓库

```bash
# 将本地仓库连接到 GitHub
git remote add origin https://github.com/你的用户名/team-site-next.git

# 推送代码到 GitHub
git branch -M main
git push -u origin main
```

### 步骤 4: 配置 GitHub Actions

在项目根目录创建 `.github/workflows/deploy.yml` 文件：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build project
        run: npm run build
        
      - name: Setup Pages
        uses: actions/configure-pages@v4
        
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./out

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    needs: build
    runs-on: ubuntu-latest
    name: Deploy
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### 步骤 5: 修改 Next.js 配置

更新 `next.config.ts` 文件，添加 basePath 配置：

```typescript
import { withContentCollections } from "@content-collections/next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export' as const,
  images: {
    unoptimized: true,
  },
  // 添加这一行，仓库名作为 basePath
  basePath: process.env.NODE_ENV === 'production' ? '/team-site-next' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/team-site-next/' : '',
  trailingSlash: true,
  webpack: (config: { resolve: { modules: any[]; }; }, { isServer }: any) => {
    config.resolve.modules = [
      ...(config.resolve.modules || []),
      'node_modules',
      '.',
    ];
    return config;
  },
};

export default withContentCollections(nextConfig);
```

### 步骤 6: 更新 package.json

在 `package.json` 中添加 homepage 字段：

```json
{
  "name": "team-site-next",
  "version": "0.1.0",
  "private": true,
  "homepage": "https://你的用户名.github.io/team-site-next",
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build --turbopack",
    "start": "next start",
    "lint": "eslint"
  },
  // ... 其他配置保持不变
}
```

### 步骤 7: 启用 GitHub Pages

1. 在 GitHub 仓库页面，点击 "Settings"
2. 左侧菜单选择 "Pages"
3. 在 "Source" 部分选择 "GitHub Actions"
4. 保存设置

### 步骤 8: 触发部署

1. 将修改后的代码推送到 GitHub：

```bash
git add .
git commit -m "Add GitHub Pages deployment configuration"
git push origin main
```

2. 在 GitHub 仓库页面，点击 "Actions" 标签页
3. 查看部署工作流的执行状态
4. 部署完成后，访问：`https://你的用户名.github.io/team-site-next`

## 🔧 常见问题解决

### 问题 1: 页面显示 404

**原因**: basePath 配置不正确
**解决**: 确保 `next.config.ts` 中的 basePath 与仓库名一致

### 问题 2: 图片不显示

**原因**: 静态资源路径问题
**解决**: 确保所有图片路径使用绝对路径，如 `/image/DG.jpg`

### 问题 3: 样式丢失

**原因**: CSS 文件路径错误
**解决**: 检查所有 CSS 和 JS 文件是否使用正确的相对路径

### 问题 4: 部署失败

**解决步骤**:
1. 检查 GitHub Actions 日志中的错误信息
2. 确保所有依赖正确安装
3. 验证 `next.config.ts` 配置
4. 检查是否有语法错误

## 🌐 自定义域名（可选）

如果您想使用自定义域名：

1. 在域名服务商处添加 CNAME 记录：
   ```
   Type: CNAME
   Name: www (或您想要的子域名)
   Value: 你的用户名.github.io
   ```

2. 在项目根目录创建 `CNAME` 文件：
   ```
   www.yourdomain.com
   ```

3. 在 GitHub Pages 设置中启用自定义域名

## 📊 部署状态检查

部署成功后，您应该能够：

- ✅ 访问 `https://你的用户名.github.io/team-site-next`
- ✅ 所有页面正常显示
- ✅ 图片和样式正确加载
- ✅ 响应式设计正常工作
- ✅ 音乐和视频链接正常跳转

## 🔄 后续更新

每次更新代码后，只需执行：

```bash
git add .
git commit -m "描述更新内容"
git push origin main
```

GitHub Actions 会自动触发新的部署。

---

**部署成功提示**: 如果一切顺利，您的音乐团队网站将在几分钟内上线！

**技术支持**: 如果遇到问题，请检查 GitHub Actions 的详细日志，或参考 Next.js 官方文档。