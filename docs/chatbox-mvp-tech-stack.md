# Chatbox MVP 技术选型（前端 + 后端）

## 1. 总体工程选型

- Monorepo：Turborepo（根目录统一编排 `dev/build/lint/check-types`）
- 包管理器：Bun（`packageManager: bun@1.3.9`）
- 语言：TypeScript（前后端统一）
- 代码规范：ESLint + Prettier

## 2. 前端技术选型（`apps/web`）

### 2.1 核心框架

- Next.js 16（App Router）
- React 19
- TypeScript 5

### 2.2 UI 与样式

- Tailwind CSS 4
- shadcn/ui（基于 base-ui 风格组件体系）
- `@base-ui/react`（基础无样式交互组件）
- 图标库：`lucide-react`
- 通知：`sonner`
- 工具库：`clsx` + `tailwind-merge` + `class-variance-authority`

### 2.3 前端状态与数据交互（MVP）

- 页面状态：React 内置状态（`useState` / `useReducer`）
- 网络请求：浏览器原生 `fetch`
- 会话本地持久化：`localStorage`（仅保存最近会话元信息）

### 2.4 前端安全与边界

- 前端不存储、不输入 OpenAI API Key
- 前端不直连 OpenAI
- 所有对话请求统一调用后端 API

## 3. 后端技术选型（`apps/api`）

### 3.1 核心框架

- NestJS 11（Node.js）
- TypeScript 5
- RxJS（Nest 依赖体系）

### 3.2 OpenAI 接入

- OpenAI Node SDK（仅后端使用）
- 鉴权信息来源：服务端环境变量 `OPENAI_API_KEY`
- 调用模式：统一封装 Chat/Responses 调用层（项目内保持一种协议）
- 代理模式：后端接收前端消息，转发给 OpenAI，再返回结果

### 3.3 后端接口与模块建议（MVP）

- 对话接口：`POST /chat/messages`
- 健康检查：`GET /health`
- 模块拆分：`chat`、`provider/openai`、`config`、`logger`

### 3.4 后端可观测与错误处理

- 日志：结构化日志（请求耗时、模型名、状态码、错误类型）
- 脱敏：日志中禁止输出 API Key
- 异常映射：401/429/5xx/网络超时转换为前端可读错误

## 4. 测试与质量保障

- 前端：ESLint + TypeScript 类型检查
- 后端：Jest 单测 + e2e（Nest 默认测试体系）
- Monorepo 统一命令：
  - `bun run lint`
  - `bun run check-types`
  - `bun run build`

## 5. 部署与运行环境（MVP）

- 前端部署：Vercel 或 Node 运行环境
- 后端部署：容器化 Node 服务（或云主机进程托管）
- 环境变量（后端）：
  - `OPENAI_API_KEY`
  - `OPENAI_MODEL`（如 `gpt-4o-mini`）
  - `OPENAI_BASE_URL`（可选）
  - `PORT`

## 6. 与当前需求的对齐结论

- 已满足“面向无计算机基础用户”的目标：前端零 API Key 配置即可聊天。
- 已满足“仅支持 OpenAI 系列模型”的 MVP 范围。
- 架构预留 Provider 扩展点，后续可增量接入其他模型提供方。

## 7. 扩展技术栈推荐（数据库等）

### 7.1 数据库（优先建议）

- **首选（MVP）**：PostgreSQL
  - 原因：稳定、生态成熟、适合会话/消息等结构化数据。

### 7.2 ORM / 数据访问层

- **首选**：Prisma
  - 原因：TypeScript 体验好、迁移工具完善、上手快。
- 备选：Drizzle ORM（更轻量、SQL 控制力更强）。

### 7.3 缓存与会话加速

- **首选**：Redis
  - 用途：热点会话缓存、限流计数、短期上下文缓存。

### 7.4 消息队列（按需引入）

- **推荐**：BullMQ + Redis
  - 用途：异步任务（日志上报、离线摘要、重试任务）。

### 7.5 鉴权与用户系统（后续阶段）

- **推荐**：bette-auth
  - 用途：登录、会话管理、后续多用户隔离。

### 7.6 对象存储（按需）

- **推荐**：S3 兼容存储（AWS S3 / Cloudflare R2 / rustFS）
  - 用途：附件、会话导出文件、图片等非结构化数据。

### 7.7 监控与可观测

- **日志**：Pino（后端结构化日志）
- **错误追踪**：Sentry
- **指标监控**：Prometheus + Grafana（或云厂商托管监控）

### 7.8 API 文档与契约

- **推荐**：NestJS Swagger（OpenAPI）
  - 用途：前后端联调、接口可视化与契约管理。
