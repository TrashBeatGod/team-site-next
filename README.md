# TrashBeatGod Team Site

一个现代化的音乐团队网站，采用Windows桌面风格的UI设计，基于Next.js和Content Collections构建。

## 🚀 项目特色

- **现代化技术栈**: Next.js 14 + React + TypeScript
- **Windows桌面风格**: 独特的桌面图标和窗口管理界面
- **内容管理系统**: 基于Content Collections的内容管理
- **响应式设计**: 完美适配桌面和移动设备
- **静态站点生成**: 高性能的静态导出部署

## 📋 功能特性

### 🎵 艺术家展示
- 艺术家信息展示（名称、流派、描述）
- 艺术家图片展示
- 响应式艺术家卡片布局

### 🎶 音乐作品
- 音乐曲目列表
- 专辑信息展示
- 试听功能支持

### 🎬 视频内容
- 音乐视频展示
- 视频缩略图预览
- 视频播放链接

### 🖥️ 用户界面
- Windows桌面风格的图标系统
- 模态窗口管理
- 平滑的动画过渡效果
- 自定义CSS主题系统

## 🛠️ 技术架构

### 核心技术
- **Next.js 14**: React全栈框架，支持App Router
- **TypeScript**: 类型安全的JavaScript开发
- **Tailwind CSS**: 实用优先的CSS框架
- **shadcn/ui**: 现代化的UI组件库
- **Content Collections**: 类型安全的内容管理系统

### 开发工具
- **ESLint**: 代码质量检查
- **PostCSS**: CSS后处理
- **Turbopack**: 快速的构建工具

## 📦 项目结构

```
team-site-next/
├── .content-collections/     # Content Collections生成文件
├── .github/workflows/       # GitHub Actions配置
├── content/                 # 内容源文件
│   ├── artists/            # 艺术家内容
│   ├── music/              # 音乐内容
│   └── videos/             # 视频内容
├── public/                  # 静态资源
│   ├── image/              # 图片资源
│   └── Background Photo.jpeg
├── src/
│   ├── app/                # Next.js App Router
│   │   ├── globals.css     # 全局样式
│   │   ├── layout.tsx      # 根布局
│   │   └── page.tsx        # 首页组件
│   ├── components/         # React组件
│   └── lib/                # 工具函数
│       ├── content.ts      # 内容类型定义
│       └── content-utils.ts # 内容工具函数
├── content-collections.ts   # Content Collections配置
├── next.config.ts          # Next.js配置
└── package.json            # 项目依赖
```

## 🚀 快速开始

### 环境要求

- Node.js 18.17 或更高版本
- npm 或 yarn 包管理器

### 安装依赖

```bash
# 使用 npm
npm install

# 或使用 yarn
yarn install
```

### 开发模式

```bash
# 启动开发服务器
npm run dev

# 或使用 yarn
yarn dev
```

访问 http://localhost:3000 查看网站。

### 构建项目

```bash
# 构建生产版本
npm run build

# 或使用 yarn
yarn build
```

### 静态导出

```bash
# 生成静态文件
npm run export

# 或使用 yarn
yarn export
```

## 📝 内容管理

### 添加艺术家

在 `content/artists/` 目录下创建Markdown文件：

```markdown
---
title: "艺术家名称"
genre: "音乐流派"
description: "艺术家描述"
image: "/image/图片文件名.jpg"
order: 1
---

艺术家详细介绍内容...
```

### 添加音乐

在 `content/music/` 目录下创建Markdown文件：

```markdown
---
title: "歌曲名称"
artist: "艺术家名称"
album: "专辑名称"
year: 2024
description: "歌曲描述"
image: "/image/专辑封面.jpg"
order: 1
url: "试听链接"
---

歌曲详细介绍内容...
```

### 添加视频

在 `content/videos/` 目录下创建Markdown文件：

```markdown
---
title: "视频标题"
artist: "艺术家名称"
description: "视频描述"
thumbnail: "/image/缩略图.jpg"
url: "视频链接"
order: 1
---

视频详细介绍内容...
```

## 🌐 部署

### GitHub Pages

项目已配置GitHub Actions自动部署到GitHub Pages：

1. 推送代码到GitHub仓库
2. GitHub Actions自动构建和部署
3. 访问 https://TrashBeatGod.github.io/team-site-next

### 手动部署

```bash
# 构建项目
npm run build

# 导出静态文件
npm run export

# 部署到任意静态文件服务器
```

## 🔧 配置说明

### Next.js配置

在 `next.config.ts` 中配置：

- 静态导出模式
- GitHub Pages basePath设置
- 图片优化配置
- Content Collections集成

### Content Collections配置

在 `content-collections.ts` 中定义内容类型和验证规则。

## 🎨 自定义主题

项目使用CSS自定义属性实现主题系统：

```css
@theme inline {
  --color-primary: #你的主色;
  --font-sans: var(--font-geist-sans);
  /* 更多主题变量... */
}
```

## 📊 性能优化

- **静态导出**: 预渲染所有页面，提供最佳性能
- **图片优化**: 自动优化图片资源
- **代码分割**: 自动分割JavaScript包
- **CSS优化**: 生产环境CSS压缩

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建Pull Request

## 📄 许可证

本项目采用MIT许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 致谢

- [Next.js](https://nextjs.org/) - React全栈框架
- [Tailwind CSS](https://tailwindcss.com/) - CSS框架
- [shadcn/ui](https://ui.shadcn.com/) - UI组件库
- [Content Collections](https://content-collections.dev/) - 内容管理系统
