# Team Site Next - 个人开发作品展示

一个由我独立开发的现代化音乐团队网站，采用Next.js全栈技术栈和Windows桌面风格的UI设计，充分展示我的前端开发能力和技术架构设计能力。

## 🌟 项目亮点

- **全栈技术能力**: 独立完成Next.js 15.5.4 + React 19 + TypeScript全栈开发
- **现代化UI设计**: 基于shadcn/ui组件库构建的Windows桌面风格界面
- **内容管理系统**: 自主实现的Content Collections内容管理架构
- **性能优化**: 使用Turbopack实现快速开发和构建优化
- **代码质量**: 严格的TypeScript类型安全和ESLint代码规范

## 🚀 快速开始

### 环境要求

- Node.js 18+ 
- npm 或 yarn

### 安装依赖

```bash
npm install
# 或
yarn install
```

### 开发模式

```bash
npm run dev
# 或
yarn dev
```

访问 http://localhost:3000 查看网站

### 生产构建

```bash
npm run build
npm start
```

## 📁 项目结构

```
team-site-next/
├── content/                 # 内容文件
│   ├── artists/            # 艺术家信息
│   ├── music/              # 音乐作品
│   └── videos/             # 视频内容
├── public/                 # 静态资源
│   └── image/              # 图片资源
├── src/
│   ├── app/                # Next.js App Router
│   ├── components/         # UI组件
│   └── lib/               # 工具函数
├── content-collections.ts # 内容集合配置
└── package.json           # 项目配置
```

## 🎵 功能模块

### 艺术家展示
- 团队成员信息展示
- 个人简介和作品集
- 图片和描述信息

### 音乐作品
- 音乐专辑展示
- 试听链接配置
- 详细作品介绍
- 支持外部音乐平台跳转

### 视频内容
- 音乐视频展示
- 外部视频平台链接
- 缩略图和描述

## 🛠️ 技术架构与实现

### 前端技术栈
- **Next.js 15.5.4** - 全栈React框架，展示路由架构能力
- **React 19** - 现代化组件开发，状态管理实现
- **TypeScript** - 类型安全开发，接口设计能力

### UI组件系统
- **shadcn/ui** - 基于Radix UI的现代化组件库，展示组件定制能力
- **Tailwind CSS 4** - 实用优先的CSS框架，样式设计能力
- **Radix UI** - 无障碍基础组件，可访问性实现
- **Embla Carousel** - 轮播组件集成，第三方库整合能力

### 内容管理系统
- **Content Collections** - 静态内容管理架构设计
- **Markdown支持** - 内容编写系统实现

### 开发与构建
- **Turbopack** - 快速构建工具，性能优化能力
- **ESLint** - 代码质量检查，规范开发流程

## 📝 内容管理

### 添加新音乐作品

在 `content/music/` 目录下创建Markdown文件：

```markdown
---
title: "歌曲名称"
artist: "艺术家名称"
image: "/image/专辑封面.jpg"
order: 排序序号
url: "https://音乐平台链接"
---

这里是音乐的详细介绍内容...
```

### 添加艺术家信息

在 `content/artists/` 目录下创建Markdown文件：

```markdown
---
title: "艺术家名称"
genre: "音乐风格"
image: "/image/艺术家照片.jpg"
order: 排序序号
description: "艺术家简介"
---

详细的艺术家介绍...
```

## 🎨 自定义配置

### 修改主题颜色

编辑 `src/app/globals.css` 文件中的CSS变量：

```css
:root {
  --primary-color: #800020; /* 主色调 */
  --secondary-color: #ffffff; /* 辅助色 */
}
```

### 添加新功能模块

1. 在 `content-collections.ts` 中定义新的内容类型
2. 创建对应的Markdown模板
3. 在页面组件中添加展示逻辑

## 🔧 技术实现细节

### 架构设计能力
- **模块化设计**: 清晰的目录结构和组件分离
- **类型安全**: 完整的TypeScript接口定义
- **状态管理**: React Hooks状态管理实现

### UI组件开发
- **shadcn/ui集成**: 基于设计系统的组件开发
- **自定义组件**: `src/components/ui/` 目录下的定制化组件
- **响应式设计**: 多设备适配实现

### 代码质量

项目使用ESLint进行严格的代码质量检查：

```bash
npm run lint
```

## 📊 性能优化

- **图片优化**: 使用Next.js Image组件
- **代码分割**: 自动代码分割和懒加载
- **静态生成**: 支持静态站点生成(SSG)
- **CDN支持**: 配置assetPrefix支持CDN

## 🌐 部署

### GitHub Pages部署

项目已配置GitHub Actions自动部署到GitHub Pages。详细部署指南请参考 [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)。

部署地址：https://TrashBeatGod.github.io/team-site-next

### Vercel部署（推荐）

1. 推送代码到Git仓库
2. 在Vercel中导入项目
3. 配置环境变量（如有需要）
4. 自动部署

### 静态导出

```bash
npm run build
```

生成的 `out` 目录可以部署到任何静态文件服务器。

## 💡 技术亮点展示

### 前端开发能力
- **全栈开发**: 独立完成前后端一体化开发
- **现代化技术栈**: 掌握最新前端技术趋势
- **组件化思维**: 可复用组件设计和开发

### 架构设计能力
- **项目架构**: 清晰的项目结构和模块划分
- **技术选型**: 合理的技术栈选择和集成
- **性能优化**: 构建优化和运行时性能考虑

### 用户体验设计
- **交互设计**: Windows桌面风格的直观交互
- **视觉设计**: 美观的界面和视觉层次
- **响应式设计**: 多设备适配能力

## 📄 项目信息

本项目为个人开发作品，用于练习前端开发能力和技术架构设计能力。

---
