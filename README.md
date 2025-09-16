- Node.js: 20.11.1
- pnpm: 9.12.0
旅館 AI × SaaS 系统（求职版），基于 Next.js + TailwindCSS + shadcn/ui + Prisma + Zustand。
# 旅館 AI × SaaS 系统（求职版）

## 环境要求
- Node.js: 20.11.1
- pnpm: 9.12.0
- 数据库: PostgreSQL 15+（可选，支持 Mock 数据模式）

## 项目简介
本项目是一个 **旅馆管理 SaaS Demo 系统**，旨在展示全栈开发能力。  
支持房源管理、房型管理、预订管理的最小功能流转，未来可扩展为多租户 SaaS 系统。

## 技术栈
- **前端**: Next.js (App Router, TypeScript) + TailwindCSS + shadcn/ui + Lucide Icons  
- **状态管理**: Zustand  
- **后端 API**: Next.js Route Handlers (REST 风格)  
- **数据层**: Prisma + PostgreSQL  
  - 若无数据库，可切换至 Mock 数据模式，接口签名保持一致  
- **规范工具**: ESLint + Prettier + Zod  

## 功能特性（当前阶段）
- ✅ 用户登录页（占位）
- ✅ 仪表盘框架（Sidebar / Topbar）
- ✅ Properties / Rooms / Bookings 页面骨架
- ✅ Mock API 最小 CRUD（Properties / Rooms）
- 🚧 Bookings 基础流（进行中）
- 🚧 Availability & Pricing 占位

## 快速开始
1. 克隆仓库  
   ```bash
   git clone git@github.com:SHANGJIUCHENG/hotel-ai-saas.git
   cd hotel-ai-saas