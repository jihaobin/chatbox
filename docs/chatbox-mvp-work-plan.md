# Chatbox MVP 详细分步工作计划

**文档版本**: 1.0
**项目**: Chatbox MVP (OpenAI 专用聊天应用)
**技术栈**: Next.js 16 + NestJS 11 + PostgreSQL + Turborepo
**最后更新**: 2025-02-27

---

## 目录

1. [项目概览与架构](#1-项目概览与架构)
2. [里程碑规划](#2-里程碑规划)
3. [详细任务分解](#3-详细任务分解)
4. [依赖关系与并行策略](#4-依赖关系与并行策略)
5. [验收标准](#5-验收标准)
6. [风险与应对](#6-风险与应对)

---

## 1. 项目概览与架构

### 1.1 核心目标

- ✅ 用户无需配置 API Key 即可直接对话
- ✅ 仅支持 OpenAI 系列模型
- ✅ 支持多轮对话与会话管理
- ✅ 流式响应（首字节快速返回）
- ✅ 预留 Provider 扩展能力

### 1.2 架构概览

```
┌─────────────────────────────────────────────────────────────────────┐
│  前端 (apps/web) - Next.js 16                                       │
│  ├─ 聊天界面 (Chat UI)                                               │
│  ├─ 会话管理 (Conversation Management)                               │
│  ├─ 消息流 (Message Streaming via SSE)                               │
│  └─ 本地存储 (localStorage persistence)                              │
│                          │                                          │
│                          ▼ HTTP / RESTful API                        │
├─────────────────────────────────────────────────────────────────────┤
│  后端 (apps/api) - NestJS 11                                        │
│  ├─ Chat Module (业务逻辑层)                                         │
│  ├─ Provider Module (OpenAI 封装层)                                  │
│  ├─ Database Module (Prisma + PostgreSQL)                            │
│  └─ Common Module (错误处理、日志、拦截器)                            │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 2. 里程碑规划

### 里程碑 1: 基础架构与聊天界面 (Week 1)

**目标**: 完成项目初始化、数据库设置、基础 UI 组件

| 序号 | 任务                            | 优先级 | 预计工时 |
| ---- | ------------------------------- | ------ | -------- |
| 1.1  | 初始化 Turborepo + 配置包管理   | P0     | 2h       |
| 1.2  | 搭建 Next.js 16 前端应用        | P0     | 2h       |
| 1.3  | 搭建 NestJS 11 后端应用         | P0     | 2h       |
| 1.4  | 配置 PostgreSQL + Prisma ORM    | P0     | 3h       |
| 1.5  | 设计并实现数据库 Schema         | P0     | 4h       |
| 1.6  | 配置 Tailwind CSS 4 + shadcn/ui | P1     | 2h       |
| 1.7  | 创建基础 UI 组件库              | P1     | 4h       |

### 里程碑 2: 核心聊天功能 (Week 2)

**目标**: 完成单次消息调用、流式响应、基础错误处理

| 序号 | 任务                            | 优先级 | 预计工时 |
| ---- | ------------------------------- | ------ | -------- |
| 2.1  | 实现 OpenAI Provider 封装层     | P0     | 4h       |
| 2.2  | 实现 Chat Controller (REST API) | P0     | 3h       |
| 2.3  | 实现消息发送与接收逻辑          | P0     | 4h       |
| 2.4  | 实现 SSE 流式响应               | P0     | 4h       |
| 2.5  | 实现前端聊天界面                | P0     | 6h       |
| 2.6  | 前端与后端 API 联调             | P0     | 3h       |
| 2.7  | 基础错误处理与提示              | P1     | 3h       |

### 里程碑 3: 会话管理与持久化 (Week 3)

**目标**: 完成会话 CRUD、历史消息、本地持久化

| 序号 | 任务                   | 优先级 | 预计工时 |
| ---- | ---------------------- | ------ | -------- |
| 3.1  | 实现会话 CRUD API      | P0     | 4h       |
| 3.2  | 实现消息历史分页查询   | P0     | 3h       |
| 3.3  | 实现 Cursor-based 分页 | P1     | 3h       |
| 3.4  | 前端会话列表组件       | P0     | 4h       |
| 3.5  | 本地存储会话元数据     | P1     | 3h       |
| 3.6  | 会话切换与历史加载     | P0     | 3h       |
| 3.7  | 自动生成会话标题       | P2     | 2h       |

### 里程碑 4: 配置、日志与验收 (Week 4)

**目标**: 完成服务端配置、结构化日志、集成测试

| 序号 | 任务                  | 优先级 | 预计工时 |
| ---- | --------------------- | ------ | -------- |
| 4.1  | 环境变量配置管理      | P0     | 2h       |
| 4.2  | OpenAI 服务端配置     | P0     | 2h       |
| 4.3  | 结构化日志系统 (Pino) | P1     | 3h       |
| 4.4  | RFC 9457 错误响应格式 | P1     | 3h       |
| 4.5  | OpenAI 错误映射       | P1     | 2h       |
| 4.6  | 日志脱敏处理          | P1     | 2h       |
| 4.7  | 端到端测试            | P0     | 4h       |
| 4.8  | 性能优化与调优        | P2     | 3h       |

---

## 3. 详细任务分解

### Phase 1: 项目初始化与架构搭建

#### 任务 1.1: 初始化 Turborepo 与包管理

**目标**: 建立 Monorepo 基础结构

**详细步骤**:

1. 初始化 Turborepo 项目

   ```bash
   npx create-turbo@latest . --use-bun
   ```

2. 配置 `package.json` 设置 `packageManager: bun@1.3.9`
3. 配置 `turbo.json` 定义 pipeline (build, dev, lint, check-types)
4. 创建 `.gitignore` 和基础配置文件

**输出物**:

- `turbo.json` 配置
- `package.json` 根配置
- 基础目录结构

**验证标准**:

- [ ] `bun install` 成功执行
- [ ] `bun run build` 在根目录成功

---

#### 任务 1.2: 搭建 Next.js 16 前端应用

**目标**: 创建 apps/web 前端应用

**详细步骤**:

1. 在 `apps/web` 目录初始化 Next.js 16

   ```bash
   bun create next-app@16 apps/web --typescript --tailwind --eslint --app --src-dir
   ```

2. 配置 `next.config.ts`
   - 启用 App Router
   - 配置 API 代理 (rewrite rules)
3. 更新 `package.json` 依赖
   - React 19
   - TypeScript 5
   - Tailwind CSS 4
4. 配置 TypeScript (`tsconfig.json`)

**输出物**:

- `apps/web/` 完整项目结构
- `next.config.ts` 配置
- 可运行的基础页面

**验证标准**:

- [ ] `bun dev --filter=web` 成功启动
- [ ] 访问 `http://localhost:3000` 显示默认页面

---

#### 任务 1.3: 搭建 NestJS 11 后端应用

**目标**: 创建 apps/api 后端应用

**详细步骤**:

1. 在 `apps/api` 目录初始化 NestJS

   ```bash
   bunx @nestjs/cli@11 new apps/api --strict --skip-git
   ```

2. 安装核心依赖

   ```bash
   cd apps/api
   bun add @nestjs/common@11 @nestjs/core@11 @nestjs/platform-express rxjs
   bun add -D @nestjs/cli@11 @nestjs/schematics @nestjs/testing typescript
   ```

3. 配置 `tsconfig.json` 与根项目共享类型配置
4. 更新 `main.ts` 配置端口和基础中间件

**输出物**:

- `apps/api/` 完整 NestJS 项目结构
- `src/main.ts` 入口文件
- 基础 Module 结构

**验证标准**:

- [ ] `bun dev --filter=api` 成功启动
- [ ] 访问 `http://localhost:3001/health` 返回 200

---

#### 任务 1.4: 配置 PostgreSQL 与 Prisma ORM

**目标**: 设置数据库连接与 ORM

**详细步骤**:

1. 安装 Prisma 依赖

   ```bash
   cd apps/api
   bun add @prisma/client
   bun add -D prisma
   ```

2. 初始化 Prisma

   ```bash
   bunx prisma init
   ```

3. 配置 `prisma/schema.prisma`
   - 配置 PostgreSQL provider
   - 设置数据库连接字符串 (环境变量)
4. 创建数据库配置服务 `src/config/database.config.ts`
5. 配置 Docker Compose (可选，用于本地开发)

   ```yaml
   # docker-compose.yml
   version: "3.8"
   services:
     postgres:
       image: postgres:16-alpine
       environment:
         POSTGRES_USER: chatbox
         POSTGRES_PASSWORD: chatbox
         POSTGRES_DB: chatbox
       ports:
         - "5432:5432"
   ```

**输出物**:

- `prisma/schema.prisma`
- `prisma/migrations/` 目录
- `src/config/database.config.ts`
- `docker-compose.yml` (可选)

**验证标准**:

- [ ] `bunx prisma migrate dev --name init` 成功执行
- [ ] 数据库连接测试通过

---

#### 任务 1.5: 设计并实现数据库 Schema

**目标**: 创建完整的数据库模型

**详细步骤**:

1. 定义枚举类型

   ```prisma
   enum MessageRole {
     system
     user
     assistant
     tool
   }

   enum AIGenerationStatus {
     queued
     streaming
     succeeded
     failed
     cancelled
   }

   enum UserKind {
     anonymous
     registered
   }
   ```

2. 实现 Users 表

   ```prisma
   model User {
     id           String    @id @default(uuid())
     kind         UserKind  @default(anonymous)
     email        String?   @unique
     displayName  String?
     createdAt    DateTime  @default(now())
     updatedAt    DateTime  @updatedAt
     lastSeenAt   DateTime?
     deletedAt    DateTime?
     authSubject  String?

     conversations Conversation[]
     messages      Message[]

     @@index([lastSeenAt])
     @@index([deletedAt])
     @@map("users")
     @@schema("chatbox")
   }
   ```

3. 实现 Conversations 表

   ```prisma
   model Conversation {
     id              String    @id @default(uuid())
     userId          String
     title           String?
     titleSetByUser  Boolean   @default(false)
     messageCount    Int       @default(0)
     lastMessageAt   DateTime?
     lastMessageId   String?
     aiSettings      Json      @default("{}")
     createdAt       DateTime  @default(now())
     updatedAt       DateTime  @updatedAt
     deletedAt       DateTime?

     user     User      @relation(fields: [userId], references: [id])
     messages Message[]

     @@index([userId, updatedAt])
     @@index([userId, createdAt])
     @@index([deletedAt])
     @@map("conversations")
     @@schema("chatbox")
   }
   ```

4. 实现 Messages 表

   ```prisma
   model Message {
     id                String      @id @default(uuid())
     conversationId    String
     authorUserId      String?
     role              MessageRole
     contentText       String?     @db.Text
     contentJson       Json?
     clientMessageId   String?
     editedAt          DateTime?
     createdAt         DateTime    @default(now())
     deletedAt         DateTime?

     conversation  Conversation  @relation(fields: [conversationId], references: [id])
     author        User?         @relation(fields: [authorUserId], references: [id])
     aiGeneration  AIGeneration?

     @@unique([conversationId, clientMessageId])
     @@index([conversationId, createdAt])
     @@index([deletedAt])
     @@map("messages")
     @@schema("chatbox")
   }
   ```

5. 实现 AIGenerations 表

   ```prisma
   model AIGeneration {
     id                    String             @id @default(uuid())
     conversationId        String
     assistantMessageId    String             @unique
     status                AIGenerationStatus @default(queued)
     provider              String             @default("openai")
     model                 String
     temperature           Decimal?           @db.Decimal(4, 3)
     topP                  Decimal?           @db.Decimal(5, 4)
     maxOutputTokens       Int?
     contextMessageIds     String[]
     systemPrompt          String?            @db.Text
     inputTokens           Int?
     outputTokens          Int?
     totalTokens           Int?
     cachedInputTokens     Int?
     latencyMs             Int?
     ttftMs                Int?
     providerRequestId     String?
     providerResponseId    String?
     requestJson           Json?
     responseJson          Json?
     errorType             String?
     errorDetail           String?
     createdAt             DateTime           @default(now())
     completedAt           DateTime?

     conversation      Conversation @relation(fields: [conversationId], references: [id])
     assistantMessage  Message      @relation(fields: [assistantMessageId], references: [id])

     @@index([conversationId, createdAt])
     @@index([status, createdAt])
     @@map("ai_generations")
     @@schema("chatbox")
   }
   ```

6. 生成并执行迁移

   ```bash
   bunx prisma migrate dev --name init_schema
   bunx prisma generate
   ```

**输出物**:

- `prisma/schema.prisma` 完整模型定义
- 初始迁移文件
- 生成的 Prisma Client

**验证标准**:

- [ ] 所有模型正确生成
- [ ] 数据库表结构符合设计文档
- [ ] 索引正确创建

---

#### 任务 1.6: 配置 Tailwind CSS 4 + shadcn/ui

**目标**: 设置前端样式系统

**详细步骤**:

1. 配置 Tailwind CSS 4

   ```bash
   cd apps/web
   bun add tailwindcss@4 @tailwindcss/postcss postcss
   ```

2. 创建 `postcss.config.js`

   ```javascript
   export default {
     plugins: {
       "@tailwindcss/postcss": {},
     },
   };
   ```

3. 配置 CSS 变量 (globals.css)

   ```css
   @import "tailwindcss";

   @theme {
     --color-primary: #3b82f6;
     --color-secondary: #64748b;
     --color-background: #ffffff;
     --color-foreground: #0f172a;
   }
   ```

4. 初始化 shadcn/ui

   ```bash
   bunx shadcn@latest init
   ```

5. 安装核心组件

   ```bash
   bunx shadcn add button input textarea scroll-area
   ```

**输出物**:

- `apps/web/postcss.config.js`
- `apps/web/src/app/globals.css`
- `components/ui/` 组件库
- `components.json` 配置

**验证标准**:

- [ ] Tailwind 类名正确生效
- [ ] shadcn 组件可正常导入使用

---

#### 任务 1.7: 创建基础 UI 组件库

**目标**: 搭建聊天应用所需的基础组件

**详细步骤**:

1. 安装图标库

   ```bash
   bun add lucide-react
   ```

2. 安装通知组件

   ```bash
   bun add sonner
   ```

3. 创建基础布局组件
   - `src/components/layout/AppShell.tsx` - 应用外壳
   - `src/components/layout/Sidebar.tsx` - 侧边栏布局
   - `src/components/layout/Header.tsx` - 顶部导航

4. 创建聊天专用组件
   - `src/components/chat/ChatContainer.tsx` - 聊天容器
   - `src/components/chat/MessageList.tsx` - 消息列表
   - `src/components/chat/MessageItem.tsx` - 单条消息
   - `src/components/chat/ChatInput.tsx` - 输入框
   - `src/components/chat/TypingIndicator.tsx` - 输入中指示器

5. 创建会话管理组件
   - `src/components/conversation/ConversationList.tsx` - 会话列表
   - `src/components/conversation/ConversationItem.tsx` - 会话项
   - `src/components/conversation/NewConversationButton.tsx` - 新建会话按钮

**输出物**:

- `src/components/layout/*`
- `src/components/chat/*`
- `src/components/conversation/*`

**验证标准**:

- [ ] 所有组件 TypeScript 类型正确
- [ ] 组件能在页面中正常渲染
- [ ] 响应式布局工作正常

---

### Phase 2: 核心聊天功能实现

#### 任务 2.1: 实现 OpenAI Provider 封装层

**目标**: 创建 Provider 抽象与 OpenAI 实现

**详细步骤**:

1. 安装 OpenAI SDK

   ```bash
   cd apps/api
   bun add openai
   ```

2. 创建 Provider 抽象接口

   ```typescript
   // src/provider/model-provider.interface.ts
   export interface ModelProvider {
     generateResponse(params: GenerateRequest): Promise<GenerateResponse>;
     streamResponse(params: GenerateRequest): AsyncGenerator<StreamEvent>;
     countTokens(text: string, model: string): Promise<number>;
   }

   export interface GenerateRequest {
     model: string;
     messages: Message[];
     temperature?: number;
     maxTokens?: number;
     stream?: boolean;
     systemPrompt?: string;
   }

   export interface Message {
     role: "system" | "user" | "assistant";
     content: string;
   }
   ```

3. 创建 OpenAI Provider 实现

   ```typescript
   // src/provider/openai/openai.provider.ts
   import { Injectable } from "@nestjs/common";
   import { ConfigService } from "@nestjs/config";
   import OpenAI from "openai";
   import {
     ModelProvider,
     GenerateRequest,
     StreamEvent,
   } from "../model-provider.interface";

   @Injectable()
   export class OpenAIProvider implements ModelProvider {
     private openai: OpenAI;

     constructor(private configService: ConfigService) {
       this.openai = new OpenAI({
         apiKey: this.configService.get<string>("OPENAI_API_KEY"),
         baseURL: this.configService.get<string>("OPENAI_BASE_URL"),
       });
     }

     async generateResponse(
       params: GenerateRequest,
     ): Promise<GenerateResponse> {
       // 实现非流式调用
     }

     async *streamResponse(
       params: GenerateRequest,
     ): AsyncGenerator<StreamEvent> {
       // 实现流式调用
     }

     async countTokens(text: string, model: string): Promise<number> {
       // 实现 token 计数
     }
   }
   ```

4. 创建 Provider Module

   ```typescript
   // src/provider/provider.module.ts
   import { Module } from "@nestjs/common";
   import { OpenAIProvider } from "./openai/openai.provider";

   @Module({
     providers: [OpenAIProvider],
     exports: [OpenAIProvider],
   })
   export class ProviderModule {}
   ```

**输出物**:

- `src/provider/model-provider.interface.ts`
- `src/provider/openai/openai.provider.ts`
- `src/provider/openai/openai.types.ts`
- `src/provider/provider.module.ts`

**验证标准**:

- [ ] Provider 可正确注入
- [ ] 能成功调用 OpenAI API
- [ ] 错误被正确捕获

---

#### 任务 2.2: 实现 Chat Controller (REST API)

**目标**: 创建 RESTful API 端点

**详细步骤**:

1. 创建 DTOs

   ```typescript
   // src/chat/dto/create-conversation.dto.ts
   export class CreateConversationDto {
     @IsString()
     @IsOptional()
     title?: string;

     @IsObject()
     @IsOptional()
     aiSettings?: Record<string, any>;
   }

   // src/chat/dto/create-message.dto.ts
   export class CreateMessageDto {
     @IsString()
     @IsOptional()
     clientMessageId?: string;

     @ValidateNested()
     @Type(() => ContentDto)
     content: ContentDto;

     @IsObject()
     @IsOptional()
     response?: {
       stream?: boolean;
       includeAiMeta?: boolean;
     };

     @IsObject()
     @IsOptional()
     aiOverrides?: {
       model?: string;
       temperature?: number;
       topP?: number;
       maxOutputTokens?: number;
     };
   }

   class ContentDto {
     @IsString()
     @MaxLength(8000)
     text: string;
   }
   ```

2. 创建 Chat Controller

   ```typescript
   // src/chat/chat.controller.ts
   @Controller("v1")
   export class ChatController {
     constructor(private readonly chatService: ChatService) {}

     @Post("conversations")
     async createConversation(@Body() dto: CreateConversationDto) {
       // 实现创建会话
     }

     @Get("conversations")
     async listConversations(@Query() query: ListConversationsQueryDto) {
       // 实现列表查询
     }

     @Get("conversations/:id")
     async getConversation(@Param("id") id: string) {
       // 实现获取详情
     }

     @Post("conversations/:id/messages")
     async createMessage(
       @Param("id") conversationId: string,
       @Body() dto: CreateMessageDto,
       @Res() res: Response,
     ) {
       // 实现发送消息
     }

     @Get("conversations/:id/messages")
     async listMessages(
       @Param("id") conversationId: string,
       @Query() query: ListMessagesQueryDto,
     ) {
       // 实现消息历史查询
     }
   }
   ```

**输出物**:

- `src/chat/dto/*.ts`
- `src/chat/chat.controller.ts`

**验证标准**:

- [ ] 所有端点可通过 HTTP 访问
- [ ] DTO 验证正常工作
- [ ] 返回格式符合 API 规范

---

#### 任务 2.3: 实现消息发送与接收逻辑

**目标**: 完成核心业务逻辑

**详细步骤**:

1. 创建 Chat Service

   ```typescript
   // src/chat/chat.service.ts
   @Injectable()
   export class ChatService {
     constructor(
       private prisma: PrismaService,
       private openaiProvider: OpenAIProvider,
       private configService: ConfigService,
     ) {}

     async createConversation(userId: string, dto: CreateConversationDto) {
       // 1. 创建会话记录
       // 2. 返回会话数据
     }

     async sendMessage(
       conversationId: string,
       userId: string,
       dto: CreateMessageDto,
     ): Promise<MessageResponse> {
       // 1. 验证会话存在且属于用户
       // 2. 保存用户消息
       // 3. 构建上下文（历史消息）
       // 4. 调用 OpenAI Provider
       // 5. 保存 AI 回复
       // 6. 更新会话元数据
       // 7. 返回完整响应
     }

     private async buildContext(conversationId: string): Promise<Message[]> {
       // 获取最近消息并格式化
     }
   }
   ```

2. 实现上下文构建逻辑
   - 获取最近 20 条消息
   - 转换为 OpenAI 格式
   - 添加系统提示词（如果配置）
   - Token 预算检查

3. 实现消息存储逻辑
   - 用户消息保存
   - AI 回复保存
   - 更新会话统计（messageCount, lastMessageAt）

**输出物**:

- `src/chat/chat.service.ts`
- `src/chat/chat.module.ts`

**验证标准**:

- [ ] 消息正确保存到数据库
- [ ] 上下文正确构建
- [ ] 响应包含完整元数据

---

#### 任务 2.4: 实现 SSE 流式响应

**目标**: 支持流式输出

**详细步骤**:

1. 扩展 Chat Service 支持流式

   ```typescript
   // src/chat/chat.service.ts
   async *streamMessage(
     conversationId: string,
     userId: string,
     dto: CreateMessageDto,
   ): AsyncGenerator<StreamEvent> {
     // 1. 保存用户消息
     // 2. 创建 AI 消息占位
     // 3. 开始流式生成
     // 4. 实时输出 token
     // 5. 完成时保存完整消息
   }
   ```

2. 实现 SSE 响应处理

   ```typescript
   // src/chat/chat.controller.ts
   @Post('conversations/:id/messages')
   async createMessage(
     @Param('id') conversationId: string,
     @Body() dto: CreateMessageDto,
     @Res() res: Response,
   ) {
     const shouldStream = dto.response?.stream ?? true;

     if (shouldStream) {
       res.setHeader('Content-Type', 'text/event-stream');
       res.setHeader('Cache-Control', 'no-cache');
       res.setHeader('Connection', 'keep-alive');

       const stream = this.chatService.streamMessage(conversationId, userId, dto);

       for await (const event of stream) {
         res.write(`event: ${event.type}\n`);
         res.write(`data: ${JSON.stringify(event.data)}\n\n`);
       }

       res.end();
     } else {
       // 非流式响应
     }
   }
   ```

3. 定义 SSE 事件类型

   ```typescript
   export type StreamEvent =
     | {
         type: "message.created";
         data: { assistantMessageId: string; generationId: string };
       }
     | { type: "message.delta"; data: { delta: string } }
     | {
         type: "message.completed";
         data: { assistantMessage: MessageResponse };
       }
     | { type: "error"; data: { error: ProblemDetail } };
   ```

**输出物**:

- 流式响应逻辑
- SSE 事件类型定义
- 前端 EventSource 消费逻辑

**验证标准**:

- [ ] 首字节时间 < 500ms
- [ ] 流式事件按序发送
- [ ] 连接断开正确处理

---

#### 任务 2.5: 实现前端聊天界面

**目标**: 完成用户交互界面

**详细步骤**:

1. 创建 API 客户端封装

   ```typescript
   // src/lib/api.ts
   const API_BASE =
     process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/v1";

   export const api = {
     createConversation: (data: CreateConversationData) =>
       fetch(`${API_BASE}/conversations`, {
         method: "POST",
         body: JSON.stringify(data),
       }),

     sendMessage: (conversationId: string, data: SendMessageData) => {
       if (data.stream) {
         return new EventSource(
           `${API_BASE}/conversations/${conversationId}/messages?stream=true`,
         );
       }
       return fetch(`${API_BASE}/conversations/${conversationId}/messages`, {
         method: "POST",
         body: JSON.stringify(data),
       });
     },
   };
   ```

2. 实现聊天状态管理

   ```typescript
   // src/hooks/useChat.ts
   export function useChat(conversationId?: string) {
     const [messages, setMessages] = useState<Message[]>([]);
     const [isLoading, setIsLoading] = useState(false);
     const [streamingContent, setStreamingContent] = useState("");

     const sendMessage = async (content: string) => {
       // 1. 乐观更新 UI
       // 2. 发送请求
       // 3. 处理 SSE 流式响应
       // 4. 更新消息列表
     };

     return { messages, isLoading, streamingContent, sendMessage };
   }
   ```

3. 实现消息列表组件
   - 用户消息右对齐
   - AI 消息左对齐
   - 代码块语法高亮
   - Markdown 渲染

4. 实现输入框组件
   - 文本域自适应高度
   - 发送按钮状态
   - 快捷键支持 (Enter 发送, Shift+Enter 换行)

**输出物**:

- `src/lib/api.ts`
- `src/hooks/useChat.ts`
- `src/hooks/useConversations.ts`
- 完整的聊天界面组件

**验证标准**:

- [ ] 消息可正常发送
- [ ] 流式响应实时显示
- [ ] 界面响应流畅

---

#### 任务 2.6: 前端与后端 API 联调

**目标**: 确保端到端功能正常

**详细步骤**:

1. 配置 API 代理 (开发环境)

   ```typescript
   // next.config.ts
   export default {
     async rewrites() {
       return [
         {
           source: "/api/:path*",
           destination: "http://localhost:3001/v1/:path*",
         },
       ];
     },
   };
   ```

2. 测试场景覆盖
   - [ ] 发送文本消息
   - [ ] 接收流式响应
   - [ ] 多轮对话上下文
   - [ ] 长消息处理
   - [ ] 特殊字符处理

3. 错误场景测试
   - [ ] 网络中断
   - [ ] API 限流
   - [ ] 无效输入

**输出物**:

- 联调测试记录
- 问题修复记录

**验证标准**:

- [ ] 所有测试场景通过
- [ ] 无控制台错误

---

#### 任务 2.7: 基础错误处理与提示

**目标**: 提供友好的错误反馈

**详细步骤**:

1. 创建错误边界组件

   ```typescript
   // src/components/error/ErrorBoundary.tsx
   export class ChatErrorBoundary extends React.Component {
     // 实现错误捕获和兜底 UI
   }
   ```

2. 创建错误提示组件

   ```typescript
   // src/components/error/ErrorToast.tsx
   export function ErrorToast({ error, onRetry }: ErrorToastProps) {
     // 根据错误类型显示不同提示
   }
   ```

3. 前端错误处理逻辑
   - API 错误解析
   - 网络错误重试
   - 用户友好提示

**输出物**:

- 错误处理组件
- 错误类型定义

**验证标准**:

- [ ] 错误提示可读
- [ ] 提供重试操作
- [ ] 不暴露敏感信息

---

### Phase 3: 会话管理与持久化

#### 任务 3.1: 实现会话 CRUD API

**目标**: 完整的会话管理接口

**详细步骤**:

1. 扩展 Chat Service

   ```typescript
   // src/chat/chat.service.ts
   async listConversations(
     userId: string,
     params: ListConversationsParams,
   ): Promise<PaginatedResult<Conversation>> {
     // 1. 解析游标
     // 2. 构建查询条件
     // 3. 执行查询
     // 4. 生成下一页游标
   }

   async getConversation(id: string, userId: string): Promise<Conversation> {
     // 验证权限并返回详情
   }

   async updateConversation(
     id: string,
     userId: string,
     dto: UpdateConversationDto,
   ): Promise<Conversation> {
     // 更新标题或配置
   }

   async deleteConversation(id: string, userId: string): Promise<void> {
     // 软删除
   }
   ```

2. 实现分页工具

   ```typescript
   // src/common/utils/cursor-pagination.ts
   export function encodeCursor(data: CursorData): string {
     return Buffer.from(JSON.stringify(data)).toString("base64url");
   }

   export function decodeCursor(cursor: string): CursorData {
     try {
       return JSON.parse(Buffer.from(cursor, "base64url").toString());
     } catch {
       throw new BadRequestException("Invalid cursor");
     }
   }
   ```

**输出物**:

- 完整的会话 CRUD 接口
- 分页工具函数

**验证标准**:

- [ ] 列表分页正常工作
- [ ] 权限验证正确
- [ ] 软删除生效

---

#### 任务 3.2: 实现消息历史分页查询

**目标**: 支持历史消息加载

**详细步骤**:

1. 实现消息查询

   ```typescript
   // src/chat/chat.service.ts
   async listMessages(
     conversationId: string,
     userId: string,
     params: ListMessagesParams,
   ): Promise<PaginatedResult<Message>> {
     // 1. 验证会话权限
     // 2. 支持 before 游标（获取更早消息）
     // 3. 支持 includeAiMeta 选项
   }
   ```

2. 前端无限滚动实现

   ```typescript
   // src/hooks/useMessages.ts
   export function useMessages(conversationId: string) {
     const [messages, setMessages] = useState<Message[]>([]);
     const [hasMore, setHasMore] = useState(true);
     const [isLoading, setIsLoading] = useState(false);

     const loadMore = async () => {
       // 使用 Intersection Observer 触发加载
     };

     return { messages, hasMore, isLoading, loadMore };
   }
   ```

**输出物**:

- 消息历史 API
- 前端无限滚动 Hook

**验证标准**:

- [ ] 分页加载流畅
- [ ] 消息顺序正确
- [ ] 滚动位置保持

---

#### 任务 3.3: 实现 Cursor-based 分页

**目标**: 高性能分页

**详细步骤**:

1. 后端游标逻辑

   ```typescript
   // 构建游标查询
   if (cursor) {
     const decoded = decodeCursor(cursor);
     where.OR = [
       { updatedAt: { lt: decoded.updatedAt } },
       {
         updatedAt: decoded.updatedAt,
         id: { lt: decoded.id },
       },
     ];
   }

   // 查询多取一条判断是否有更多
   const items = await this.prisma.conversation.findMany({
     where,
     orderBy: [{ updatedAt: "desc" }, { id: "desc" }],
     take: limit + 1,
   });
   ```

2. 前端游标管理
   - 保存 nextCursor
   - 加载更多时传递 cursor
   - 无 cursor 时表示已到末尾

**输出物**:

- 游标分页实现
- 分页类型定义

**验证标准**:

- [ ] 无 OFFSET 性能问题
- [ ] 无重复数据
- [ ] 无数据丢失

---

#### 任务 3.4: 前端会话列表组件

**目标**: 会话管理界面

**详细步骤**:

1. 创建会话列表组件

   ```typescript
   // src/components/conversation/ConversationList.tsx
   export function ConversationList() {
     const { conversations, isLoading, hasMore, loadMore } = useConversations();

     return (
       <div className="flex flex-col h-full">
         <NewConversationButton />
         <ScrollArea className="flex-1">
           {conversations.map(conv => (
             <ConversationItem key={conv.id} conversation={conv} />
           ))}
           {hasMore && <LoadMoreButton onClick={loadMore} />}
         </ScrollArea>
       </div>
     );
   }
   ```

2. 实现会话项组件
   - 显示标题和最后消息预览
   - 显示消息数量
   - 选中状态样式
   - 右键菜单（删除、重命名）

3. 新建会话按钮
   - 点击创建新会话
   - 自动跳转到新会话

**输出物**:

- 会话列表组件
- 会话项组件
- 新建会话按钮

**验证标准**:

- [ ] 列表可滚动
- [ ] 点击切换会话
- [ ] 选中状态正确

---

#### 任务 3.5: 本地存储会话元数据

**目标**: MVP 阶段本地持久化

**详细步骤**:

1. 创建本地存储 Hook

   ```typescript
   // src/hooks/useLocalStorage.ts
   export function useLocalStorage<T>(key: string, initialValue: T) {
     const [value, setValue] = useState<T>(() => {
       if (typeof window === "undefined") return initialValue;
       try {
         const item = window.localStorage.getItem(key);
         return item ? JSON.parse(item) : initialValue;
       } catch {
         return initialValue;
       }
     });

     const setStoredValue = (newValue: T) => {
       setValue(newValue);
       window.localStorage.setItem(key, JSON.stringify(newValue));
     };

     return [value, setStoredValue] as const;
   }
   ```

2. 存储会话元数据

   ```typescript
   // 存储最近会话列表
   const [recentConversations, setRecentConversations] = useLocalStorage<
     Array<{ id: string; title: string; updatedAt: string }>
   >("chatbox:conversations", []);

   // 存储当前会话 ID
   const [currentConversationId, setCurrentConversationId] = useLocalStorage<
     string | null
   >("chatbox:currentConversation", null);
   ```

3. 同步逻辑
   - 会话创建时添加到本地列表
   - 定期从服务器同步
   - 处理冲突（服务器为准）

**输出物**:

- localStorage Hook
- 会话数据同步逻辑

**验证标准**:

- [ ] 刷新页面会话列表保留
- [ ] 本地数据与服务器同步

---

#### 任务 3.6: 会话切换与历史加载

**目标**: 流畅的会话切换体验

**详细步骤**:

1. 实现会话切换

   ```typescript
   // src/hooks/useCurrentConversation.ts
   export function useCurrentConversation() {
     const [currentId, setCurrentId] = useLocalStorage<string | null>(
       "chatbox:currentConversation",
       null,
     );

     const switchConversation = (id: string) => {
       setCurrentId(id);
       // 加载该会话的消息历史
     };

     return { currentId, switchConversation };
   }
   ```

2. 消息历史加载
   - 切换会话时清空当前消息
   - 加载最近 50 条消息
   - 滚动到最新消息

3. 状态管理
   - URL 同步 (?conversationId=xxx)
   - 浏览器前进后退支持

**输出物**:

- 会话切换逻辑
- URL 状态同步

**验证标准**:

- [ ] 切换会话流畅
- [ ] 历史消息正确加载
- [ ] URL 与状态同步

---

#### 任务 3.7: 自动生成会话标题

**目标**: 自动命名新会话

**详细步骤**:

1. 标题生成策略
   - 使用用户第一条消息的前 20 个字符
   - 如果消息过长截断并添加 "..."
   - 如果用户已设置标题则保持不变

2. 后端实现

   ```typescript
   private async generateTitle(firstMessage: string): Promise<string> {
     const maxLength = 50;
     if (firstMessage.length <= maxLength) {
       return firstMessage;
     }
     return firstMessage.slice(0, maxLength) + '...';
   }
   ```

3. 标题更新逻辑
   - 第一条用户消息发送后更新标题
   - 标记为自动生成的标题
   - 用户可手动修改

**输出物**:

- 标题生成函数
- 自动更新逻辑

**验证标准**:

- [ ] 新会话自动命名
- [ ] 手动修改标题生效

---

### Phase 4: 配置、日志与验收

#### 任务 4.1: 环境变量配置管理

**目标**: 集中管理配置

**详细步骤**:

1. 创建配置模块

   ```typescript
   // src/config/config.module.ts
   import { Module } from "@nestjs/common";
   import { ConfigModule } from "@nestjs/config";

   @Module({
     imports: [
       ConfigModule.forRoot({
         isGlobal: true,
         envFilePath: [".env.local", ".env"],
         validationSchema: Joi.object({
           OPENAI_API_KEY: Joi.string().required(),
           OPENAI_MODEL: Joi.string().default("gpt-4o-mini"),
           OPENAI_BASE_URL: Joi.string().optional(),
           DATABASE_URL: Joi.string().required(),
           PORT: Joi.number().default(3001),
         }),
       }),
     ],
   })
   export class AppConfigModule {}
   ```

2. 定义配置类型

   ```typescript
   // src/config/configuration.ts
   export default () => ({
     openai: {
       apiKey: process.env.OPENAI_API_KEY,
       model: process.env.OPENAI_MODEL || "gpt-4o-mini",
       baseURL: process.env.OPENAI_BASE_URL,
       temperature: parseFloat(process.env.OPENAI_TEMPERATURE || "0.7"),
       maxTokens: parseInt(process.env.OPENAI_MAX_TOKENS || "2000"),
     },
     database: {
       url: process.env.DATABASE_URL,
     },
     port: parseInt(process.env.PORT || "3001"),
   });
   ```

3. 创建 .env.example

   ```
   # OpenAI 配置
   OPENAI_API_KEY=sk-...
   OPENAI_MODEL=gpt-4o-mini
   OPENAI_BASE_URL=https://api.openai.com/v1
   OPENAI_TEMPERATURE=0.7
   OPENAI_MAX_TOKENS=2000

   # 数据库配置
   DATABASE_URL=postgresql://chatbox:chatbox@localhost:5432/chatbox

   # 服务端口
   PORT=3001
   ```

**输出物**:

- 配置模块
- 环境变量定义
- .env.example 模板

**验证标准**:

- [ ] 配置验证正常工作
- [ ] 缺失必需配置时启动失败

---

#### 任务 4.2: OpenAI 服务端配置

**目标**: 服务端统一配置模型参数

**详细步骤**:

1. 创建 OpenAI 配置服务

   ```typescript
   // src/config/openai.config.ts
   @Injectable()
   export class OpenAIConfigService {
     constructor(private configService: ConfigService) {}

     get apiKey(): string {
       return this.configService.get<string>("OPENAI_API_KEY")!;
     }

     get defaultModel(): string {
       return this.configService.get<string>("OPENAI_MODEL") || "gpt-4o-mini";
     }

     get defaultTemperature(): number {
       return this.configService.get<number>("OPENAI_TEMPERATURE") || 0.7;
     }

     get defaultMaxTokens(): number {
       return this.configService.get<number>("OPENAI_MAX_TOKENS") || 2000;
     }

     get baseURL(): string | undefined {
       return this.configService.get<string>("OPENAI_BASE_URL");
     }
   }
   ```

2. 允许会话级覆盖

   ```typescript
   // 合并配置优先级：用户设置 > 会话设置 > 全局默认
   const effectiveConfig = {
     model:
       aiOverrides?.model ||
       conversation.aiSettings?.model ||
       this.config.defaultModel,
     temperature:
       aiOverrides?.temperature ||
       conversation.aiSettings?.temperature ||
       this.config.defaultTemperature,
     maxTokens:
       aiOverrides?.maxOutputTokens ||
       conversation.aiSettings?.maxOutputTokens ||
       this.config.defaultMaxTokens,
   };
   ```

**输出物**:

- OpenAI 配置服务
- 配置合并逻辑

**验证标准**:

- [ ] 配置层级正确
- [ ] 环境变量生效

---

#### 任务 4.3: 结构化日志系统 (Pino)

**目标**: 可观测的请求日志

**详细步骤**:

1. 安装 Pino

   ```bash
   bun add pino pino-pretty
   bun add -D @types/pino
   ```

2. 创建日志服务

   ```typescript
   // src/common/logger/logger.service.ts
   import { Injectable, LoggerService } from "@nestjs/common";
   import pino from "pino";

   @Injectable()
   export class PinoLoggerService implements LoggerService {
     private logger = pino({
       level: process.env.LOG_LEVEL || "info",
       transport:
         process.env.NODE_ENV === "development"
           ? { target: "pino-pretty", options: { colorize: true } }
           : undefined,
     });

     log(message: string, context?: Record<string, any>) {
       this.logger.info(context, message);
     }

     error(message: string, trace?: string, context?: Record<string, any>) {
       this.logger.error({ ...context, trace }, message);
     }

     // 专用日志方法
     logChatRequest(data: {
       requestId: string;
       userId: string;
       conversationId: string;
       model: string;
       inputTokens: number;
       latencyMs: number;
     }) {
       this.logger.info({ type: "chat_request", ...data });
     }
   }
   ```

3. 创建请求日志拦截器

   ```typescript
   // src/common/interceptors/request-log.interceptor.ts
   @Injectable()
   export class RequestLogInterceptor implements NestInterceptor {
     constructor(private logger: PinoLoggerService) {}

     intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
       const request = context.switchToHttp().getRequest();
       const startTime = Date.now();

       return next.handle().pipe(
         tap(() => {
           const duration = Date.now() - startTime;
           this.logger.log(`${request.method} ${request.path}`, {
             method: request.method,
             path: request.path,
             statusCode: context.switchToHttp().getResponse().statusCode,
             durationMs: duration,
             userAgent: request.headers["user-agent"],
           });
         }),
       );
     }
   }
   ```

**输出物**:

- Pino 日志服务
- 请求日志拦截器
- 日志类型定义

**验证标准**:

- [ ] 日志输出结构化 JSON
- [ ] 请求耗时正确记录
- [ ] 开发环境美化输出

---

#### 任务 4.4: RFC 9457 错误响应格式

**目标**: 标准化错误响应

**详细步骤**:

1. 创建 ProblemDetail 类型

   ```typescript
   // src/common/filters/problem-detail.types.ts
   export interface ProblemDetail {
     type: string; // 错误类型 URI
     title: string; // 简短标题
     status: number; // HTTP 状态码
     detail?: string; // 详细描述
     instance?: string; // 请求路径
     requestId: string; // 请求追踪 ID
     code: string; // 业务错误码
     errors?: ValidationError[]; // 验证错误详情
   }

   export interface ValidationError {
     field: string;
     message: string;
   }
   ```

2. 创建异常过滤器

   ```typescript
   // src/common/filters/problem-detail.filter.ts
   @Catch()
   export class ProblemDetailFilter implements ExceptionFilter {
     constructor(private logger: PinoLoggerService) {}

     catch(exception: unknown, host: ArgumentsHost) {
       const ctx = host.switchToHttp();
       const response = ctx.getResponse<Response>();
       const request = ctx.getRequest<Request>();
       const requestId = request.headers["x-request-id"] || generateRequestId();

       const problem = this.buildProblemDetail(exception, request, requestId);

       this.logger.error("Request failed", undefined, {
         requestId,
         status: problem.status,
         error: problem.title,
       });

       response
         .status(problem.status)
         .contentType("application/problem+json")
         .json(problem);
     }

     private buildProblemDetail(
       exception: unknown,
       request: Request,
       requestId: string,
     ): ProblemDetail {
       // 根据异常类型构建 ProblemDetail
     }
   }
   ```

3. 注册全局过滤器

   ```typescript
   // main.ts
   app.useGlobalFilters(new ProblemDetailFilter(logger));
   ```

**输出物**:

- ProblemDetail 类型定义
- 异常过滤器
- 错误构建工具函数

**验证标准**:

- [ ] 错误响应格式符合 RFC 9457
- [ ] Content-Type 正确
- [ ] 包含 requestId

---

#### 任务 4.5: OpenAI 错误映射

**目标**: 将 OpenAI 错误转换为友好提示

**详细步骤**:

1. 创建错误映射表

   ```typescript
   // src/provider/openai/openai-error.map.ts
   export const openAIErrorMap: Record<string, ProblemDetailTemplate> = {
     rate_limit_exceeded: {
       status: 429,
       type: "/problems/rate-limited",
       title: "操作太快，请稍后再试",
       code: "RATE_LIMIT_EXCEEDED",
     },
     insufficient_quota: {
       status: 503,
       type: "/problems/service-unavailable",
       title: "服务配额已满，请联系管理员",
       code: "INSUFFICIENT_QUOTA",
     },
     context_length_exceeded: {
       status: 422,
       type: "/problems/message-too-long",
       title: "消息太长或对话历史过多，请新建对话",
       code: "CONTEXT_LENGTH_EXCEEDED",
     },
     invalid_api_key: {
       status: 503,
       type: "/problems/service-unavailable",
       title: "服务配置错误，请联系管理员",
       code: "INVALID_API_KEY",
     },
     server_error: {
       status: 503,
       type: "/problems/service-unavailable",
       title: "AI 服务暂时不可用，请稍后重试",
       code: "SERVER_ERROR",
     },
   };
   ```

2. 实现错误映射函数

   ```typescript
   export function mapOpenAIError(
     error: any,
     requestId: string,
   ): ProblemDetail {
     const mapped = openAIErrorMap[error.code] || {
       status: 500,
       type: "/problems/internal-error",
       title: "服务暂时不可用",
       code: "INTERNAL_ERROR",
     };

     return {
       type: `https://api.example.com${mapped.type}`,
       title: mapped.title,
       status: mapped.status,
       detail: error.message,
       requestId,
       code: mapped.code,
     };
   }
   ```

3. 前端错误处理

   ```typescript
   // 根据错误码显示不同提示
   const errorMessages: Record<string, string> = {
     RATE_LIMIT_EXCEEDED: "操作太快，请稍后再试",
     CONTEXT_LENGTH_EXCEEDED: "消息太长或对话历史过多，请新建对话",
     SERVER_ERROR: "AI 服务暂时不可用，请稍后重试",
   };
   ```

**输出物**:

- 错误映射表
- 映射函数
- 前端错误提示

**验证标准**:

- [ ] 各错误场景正确映射
- [ ] 用户看到友好提示
- [ ] 日志记录原始错误

---

#### 任务 4.6: 日志脱敏处理

**目标**: 保护敏感信息

**详细步骤**:

1. 创建脱敏工具

   ```typescript
   // src/common/utils/sanitizer.ts
   export function sanitizeForLogging(data: any): any {
     if (typeof data !== "object" || data === null) {
       return data;
     }

     const sensitiveFields = ["apiKey", "password", "token", "secret"];
     const result = { ...data };

     for (const key of Object.keys(result)) {
       if (sensitiveFields.some((f) => key.toLowerCase().includes(f))) {
         result[key] = "***REDACTED***";
       } else if (typeof result[key] === "object") {
         result[key] = sanitizeForLogging(result[key]);
       }
     }

     return result;
   }

   export function maskApiKey(key: string): string {
     if (!key || key.length < 10) return "***";
     return key.slice(0, 4) + "..." + key.slice(-4);
   }
   ```

2. 应用脱敏

   ```typescript
   // 在日志服务中使用
   this.logger.info(
     sanitizeForLogging({
       apiKey: config.apiKey, // 会被脱敏
       model: config.model, // 正常输出
     }),
   );
   ```

3. 环境变量脱敏检查
   - 启动时检查 OPENAI_API_KEY 格式
   - 日志中只显示前4位和后4位

**输出物**:

- 脱敏工具函数
- 应用脱敏的日志点

**验证标准**:

- [ ] API Key 不在日志中明文出现
- [ ] 脱敏函数单元测试通过

---

#### 任务 4.7: 端到端测试

**目标**: 验证完整功能链

**详细步骤**:

1. 编写后端集成测试

   ```typescript
   // test/chat.e2e-spec.ts
   describe("ChatController (e2e)", () => {
     it("POST /v1/conversations - should create conversation", async () => {
       const response = await request(app.getHttpServer())
         .post("/v1/conversations")
         .send({ title: "Test" })
         .expect(201);

       expect(response.body.data).toHaveProperty("id");
       expect(response.body.data.title).toBe("Test");
     });

     it("POST /v1/conversations/:id/messages - should send message", async () => {
       // 测试消息发送
     });

     it("should handle streaming response", async () => {
       // 测试流式响应
     });
   });
   ```

2. 编写前端组件测试

   ```typescript
   // src/components/chat/__tests__/ChatInput.test.tsx
   describe("ChatInput", () => {
     it("should send message on Enter", async () => {
       // 测试输入框
     });
   });
   ```

3. 手动测试场景
   - [ ] 创建新会话
   - [ ] 发送消息并接收回复
   - [ ] 流式响应显示
   - [ ] 切换会话
   - [ ] 加载历史消息
   - [ ] 网络中断恢复
   - [ ] 错误提示显示

**输出物**:

- 集成测试文件
- 组件测试文件
- 测试报告

**验证标准**:

- [ ] 测试覆盖率 > 70%
- [ ] 所有关键路径测试通过
- [ ] 手动测试无阻塞问题

---

#### 任务 4.8: 性能优化与调优

**目标**: 确保良好用户体验

**详细步骤**:

1. 数据库优化
   - 确认索引生效：`EXPLAIN ANALYZE` 查询
   - 连接池配置 (PgBouncer 或 Prisma Connection Pool)

2. API 优化
   - 启用 gzip/brotli 压缩
   - 配置 HTTP/2
   - 响应缓存策略

3. 前端优化
   - 组件懒加载
   - 虚拟滚动（消息列表）
   - 防抖节流（输入框）

4. 性能监控
   - 首字节时间 (TTFB) < 500ms
   - 首屏加载 < 2s
   - 消息响应 < 100ms (首 token)

**输出物**:

- 性能优化报告
- 监控配置

**验证标准**:

- [ ] 首字节时间达标
- [ ] 流式响应流畅
- [ ] 无明显卡顿

---

## 4. 依赖关系与并行策略

### 4.1 任务依赖图

```
Phase 1: 基础架构
├── 1.1 初始化 Turborepo
├── 1.2 搭建 Next.js ─────────────┐
├── 1.3 搭建 NestJS ──────────────┤
├── 1.4 配置 PostgreSQL ────────┐ │
├── 1.5 设计数据库 Schema ──────┘ │
├── 1.6 配置 Tailwind ────────────┘
└── 1.7 创建 UI 组件 ─────────────┘

Phase 2: 核心功能
├── 2.1 OpenAI Provider ──────────┐
├── 2.2 Chat Controller ──────────┤
├── 2.3 消息发送逻辑 ─────────────┤
├── 2.4 SSE 流式响应 ─────────────┤
├── 2.5 前端聊天界面 ─────────────┤
├── 2.6 API 联调 ─────────────────┘
└── 2.7 错误处理

Phase 3: 会话管理
├── 3.1 会话 CRUD ────────────────┐
├── 3.2 消息历史分页 ─────────────┤
├── 3.3 Cursor 分页 ──────────────┤
├── 3.4 会话列表组件 ─────────────┤
├── 3.5 本地存储 ─────────────────┤
├── 3.6 会话切换 ─────────────────┤
└── 3.7 自动标题 ─────────────────┘

Phase 4: 配置与验收
├── 4.1 环境变量配置
├── 4.2 OpenAI 配置
├── 4.3 结构化日志
├── 4.4 RFC 9457 错误
├── 4.5 OpenAI 错误映射
├── 4.6 日志脱敏
├── 4.7 端到端测试
└── 4.8 性能优化
```

### 4.2 并行执行建议

**可并行任务组**:

1. **Phase 1 内部并行**:
   - 1.2 (Next.js) 和 1.3 (NestJS) 可同时进行
   - 1.6 (Tailwind) 和 1.7 (UI 组件) 可在 1.2 完成后并行

2. **Phase 2 内部并行**:
   - 2.1 (Provider) 和 2.2 (Controller) 可并行
   - 2.5 (前端界面) 可在 1.7 完成后独立进行

3. **Phase 3 内部并行**:
   - 3.1-3.3 (后端 API) 可并行开发
   - 3.4-3.7 (前端功能) 可并行开发

### 4.3 关键路径

**关键路径** (不可并行，必须顺序执行):

```
1.1 Turborepo → 1.4 PostgreSQL → 1.5 Schema → 2.1 Provider → 2.3 消息逻辑 → 2.6 联调 → 验收
```

**优化策略**:

- 在 1.4 之前完成 1.2 和 1.3，节约等待时间
- 前端界面 (2.5) 可使用 mock 数据提前开发
- 数据库迁移 (1.5) 完成后立即部署到开发环境

---

## 5. 验收标准

### 5.1 功能验收

| 功能项         | 验收标准                                   | 测试方法                           |
| -------------- | ------------------------------------------ | ---------------------------------- |
| **零配置对话** | 用户打开应用无需输入 API Key 即可开始对话  | 清除缓存后访问，验证可直接发送消息 |
| **会话管理**   | 支持新建、切换、删除会话，历史消息正确加载 | 创建 3+ 会话，切换验证历史         |
| **流式响应**   | 首字节时间 < 500ms，逐字显示               | 网络面板测量 TTFB                  |
| **错误处理**   | 网络错误、API 错误均显示友好提示           | 断网、限速测试                     |
| **数据持久化** | 刷新页面后会话列表保留                     | 刷新浏览器验证                     |

### 5.2 技术验收

| 检查项       | 标准                               | 验证方式                             |
| ------------ | ---------------------------------- | ------------------------------------ |
| **代码质量** | ESLint 无错误，TypeScript 严格模式 | `bun run lint` `bun run check-types` |
| **测试覆盖** | 核心功能单元测试 + 集成测试        | 测试报告                             |
| **API 规范** | 符合 RESTful + RFC 9457            | API 文档审查                         |
| **安全**     | API Key 不在前端暴露，日志脱敏     | 代码审计                             |
| **性能**     | 首屏 < 2s，流式首字节 < 500ms      | Lighthouse / DevTools                |

### 5.3 Definition of Done

- [ ] 所有功能需求实现并测试通过
- [ ] 代码通过 ESLint 和 TypeScript 检查
- [ ] 测试覆盖率 > 70%
- [ ] API 文档完整
- [ ] 部署文档完整
- [ ] 无 P0/P1 级 Bug
- [ ] 性能指标达标

---

## 6. 风险与应对

### 6.1 技术风险

| 风险             | 可能性 | 影响 | 应对措施                       |
| ---------------- | ------ | ---- | ------------------------------ |
| OpenAI API 变更  | 中     | 高   | 封装 Provider 层，隔离变更影响 |
| 流式响应不稳定   | 中     | 高   | 实现重试机制，支持降级到非流式 |
| 数据库性能瓶颈   | 低     | 中   | 预留索引优化空间，分页策略     |
| Token 消耗超预期 | 中     | 中   | 配置 max_tokens，监控用量      |

### 6.2 进度风险

| 风险         | 可能性 | 影响 | 应对措施                             |
| ------------ | ------ | ---- | ------------------------------------ |
| 需求变更     | 中     | 高   | 严格 MVP 范围控制，变更需审批        |
| 联调时间不足 | 中     | 中   | 提前定义接口契约，使用 mock 并行开发 |
| 环境配置问题 | 高     | 低   | 提供 Docker Compose 一键启动         |

### 6.3 缓解措施

1. **技术缓冲**: 每个里程碑预留 20% 缓冲时间
2. **并行开发**: 前后端使用契约先行，并行开发
3. **每日站会**: 跟踪进度，及时发现问题
4. **代码审查**: 关键代码强制 Review
5. **自动化测试**: CI 自动运行测试套件

---

## 附录

### A. 目录结构参考

```
chatbox/
├── apps/
│   ├── web/                    # Next.js 16 前端
│   │   ├── src/
│   │   │   ├── app/           # App Router
│   │   │   ├── components/    # React 组件
│   │   │   │   ├── chat/
│   │   │   │   ├── conversation/
│   │   │   │   └── layout/
│   │   │   ├── hooks/         # 自定义 Hooks
│   │   │   ├── lib/           # 工具函数
│   │   │   └── types/         # TypeScript 类型
│   │   ├── package.json
│   │   └── next.config.ts
│   │
│   └── api/                    # NestJS 11 后端
│       ├── src/
│       │   ├── chat/          # 聊天模块
│       │   ├── provider/      # OpenAI 封装
│       │   ├── common/        # 公共模块
│       │   ├── config/        # 配置模块
│       │   ├── prisma/        # Prisma 配置
│       │   └── main.ts
│       ├── prisma/
│       │   └── schema.prisma
│       ├── test/              # 测试文件
│       └── package.json
│
├── packages/
│   ├── ui/                    # 共享 UI 组件
│   ├── eslint-config/         # ESLint 配置
│   └── typescript-config/     # TypeScript 配置
│
├── docker-compose.yml         # 本地开发环境
├── turbo.json                 # Turborepo 配置
└── package.json               # 根配置
```

### B. 命令速查

```bash
# 开发
bun run dev                  # 启动所有应用
bun dev --filter=web         # 只启动前端
bun dev --filter=api         # 只启动后端

# 数据库
bunx prisma migrate dev      # 创建迁移
bunx prisma generate         # 生成客户端
bunx prisma studio           # 打开数据库 GUI

# 代码质量
bun run lint                 # 运行 ESLint
bun run check-types          # 类型检查
bun run build                # 构建所有应用

# 测试
bun test                     # 运行测试
bun test --coverage          # 生成覆盖率报告
```

### C. 环境变量清单

| 变量名               | 必填 | 默认值      | 说明              |
| -------------------- | ---- | ----------- | ----------------- |
| `OPENAI_API_KEY`     | 是   | -           | OpenAI API 密钥   |
| `OPENAI_MODEL`       | 否   | gpt-4o-mini | 默认模型          |
| `OPENAI_BASE_URL`    | 否   | -           | 自定义 API 地址   |
| `OPENAI_TEMPERATURE` | 否   | 0.7         | 温度参数          |
| `OPENAI_MAX_TOKENS`  | 否   | 2000        | 最大 Token 数     |
| `DATABASE_URL`       | 是   | -           | PostgreSQL 连接串 |
| `PORT`               | 否   | 3001        | 后端服务端口      |
| `LOG_LEVEL`          | 否   | info        | 日志级别          |
| `NODE_ENV`           | 否   | development | 运行环境          |

---

**文档结束**

> **注意**: 本计划基于 MVP 需求文档、技术选型文档和 API 设计文档制定。随着项目进展，可能需要根据实际情况调整优先级和工期。
