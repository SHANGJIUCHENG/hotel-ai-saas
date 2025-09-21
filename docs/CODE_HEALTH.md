# 代码健康报告（W1 Sweep）

## 修复项
- `app/layout.tsx` L1-L18、`app/providers.tsx` L1-L13、`app/(app)/layout.tsx` L1-L16、`app/(auth)/layout.tsx` L1-L11：为所有使用 JSX 的服务器组件显式引入 `import * as React from 'react'` 并改用 `React.ReactNode`，消除 TypeScript UMD React 报错。 
- `app/(app)/properties/page.tsx` L1-L84、`app/(app)/rooms/page.tsx` L1-L88、`components` 下的 UI 组件（例如 `components/ui/button.tsx` L1-L22、`components/ui/dialog.tsx` L1-L26）统一加入 `import * as React from 'react'`，并在需要交互的基础组件上补充 `'use client'`，保证客户端状态与转发 ref 可正常工作。 
- `app/(auth)/login/page.tsx` L101-L165：将 `useSearchParams` 相关逻辑拆分到 `LoginForm` 并由 `<React.Suspense>` 包裹，修复 Next.js 构建期 `useSearchParams()` 缺失 Suspense 边界的报错。 
- `app/api/properties/route.ts` L1-L19、`app/api/properties/[id]/route.ts` L1-L24、`app/api/rooms/route.ts` L1-L22、`app/api/rooms/[id]/route.ts` L1-L26、`app/api/room_types/route.ts` L1-L23、`app/api/room_types/[id]/route.ts` L1-L28、`app/api/bookings/route.ts` L1-L28、`app/api/bookings/[id]/route.ts` L1-L32：为所有 CRUD 路由增加基础类型校验和数值转换，防止字符串 ID/日期直接写入数据库导致类型错误。 
- `lib/prisma.ts` L1-L15：重写 Prisma 单例初始化并在环境变量缺失时抛出显式错误，避免在开发/构建阶段悄然创建多个客户端实例。 
- `tailwind.config.ts` L1-L41：修复 `content` 配置缺失 `pages` 目录与 `satisfies Config` 语句格式，保证 Tailwind class 扫描完整。 
- `package.json` L5-L14：补充 `typecheck`、`prisma:gen`、`prisma:status`、`prisma:validate`、`prisma:studio` 脚本，方便执行官方要求的健康检查。 
- `.env.local.example` L2-L4：新增 `DATABASE_URL` 占位值，提示运行 Prisma/Next 构建所需的数据库连接。 
- `prisma/seed.ts` L1-L25：改用路径别名 `@/lib/prisma`，与项目约定保持一致。 
- `scripts/api-smoke.ts` L1-L29：新增最小化 API 冒烟脚本，统一触发 `GET /api/properties`、`GET /api/rooms`、`POST` 场景以验证接口可用性。 

## 未解决项与建议
- `app/api/*`：目前仍缺少对 Prisma 异常的集中捕获，数据库不可用时会抛出 500。可在路由层补充 try/catch 并返回统一 JSON 错误（建议结合 `lib/api.ts` 扩展）。
- `scripts/api-smoke.ts` 与 `pnpm prisma:status`：在无 PostgreSQL 实例时命令失败，需要在 README 或 CI 中注明依赖并提供快速启动方案（Docker Compose/Cloud DB）。
- `app/(app)/properties/page.tsx` 与 `app/(app)/rooms/page.tsx`：当前采用前端分页与 `window.confirm`，若数据量增大建议迁移到服务端分页/软删除流程并补充错误提示 UI。
- `lib/store/useAuthStore.ts`：文件仅导出空对象，属于遗留占位。建议确认后删除或改写为真实 store，以减少 tree-shaking 垃圾代码。
- `README.md`：快速开始章节在第 1 步后即被截断，缺少安装、数据库配置与运行说明。建议补充完整流程并强调环境变量。 
- `app/(auth)/login/page.tsx` 顶部仍保留大量历史注释，可在确认无用后清理，避免干扰维护者阅读。 

## 后续建议优先级
- **P0**：提供可用的 PostgreSQL 实例（本地或云端），并在 `.env.example`/README 中写明初始化流程，使 `prisma migrate status`、API 冒烟测试能够通过。
- **P1**：为所有 Prisma 调用增加统一错误处理与日志，确保数据库异常转化为结构化 JSON 响应。
- **P1**：完善 README 的安装、运行、测试步骤，避免新人无法快速启动项目。
- **P2**：评估前端分页与 `window.confirm` 的交互体验，逐步替换为服务端分页与统一的对话框组件。
- **P2**：整理历史注释与未使用模块，减少噪音。 

## 验证
- ✅ `pnpm tsc --noEmit`
- ✅ `pnpm next build`
- ✅ `pnpm prisma:gen`
- ❌ `pnpm prisma:status`（缺少本地 PostgreSQL，连接 `localhost:5432` 被拒绝）
- ✅ `pnpm prisma:validate`
- ❌ `pnpm tsx scripts/api-smoke.ts`（数据库未启动，Prisma 查询抛出 P1001）
