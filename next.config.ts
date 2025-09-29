import { withContentCollections } from "@content-collections/next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export' as const, // 启用静态导出
  images: {
    unoptimized: true, // 禁用图片优化用于静态导出
  },
  // 添加这一行，仓库名作为 basePath
  basePath: process.env.NODE_ENV === 'production' ? '/team-site-next' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/team-site-next/' : ''
  trailingSlash: true,
  webpack: (config: { resolve: { modules: any[]; }; }, { isServer }: any) => {
    // 添加对 .content-collections 目录的模块解析支持
    config.resolve.modules = [
      ...(config.resolve.modules || []),
      'node_modules',
      '.', // 添加当前目录到模块解析路径
    ];
    return config;
  },
};

export default withContentCollections(nextConfig);