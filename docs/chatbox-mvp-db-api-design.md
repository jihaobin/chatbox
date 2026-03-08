# Chatbox MVP 数据库表结构与 API 设计深度规范

**文档版本**: 1.0
**适用项目**: Chatbox MVP (Next.js 16 + NestJS 11 + PostgreSQL)
**目标用户**: 无计算机基础用户（前端零配置 API Key）
**最后更新**: 2025-02-24

---

## 目录

1. [设计原则与核心决策](#1-设计原则与核心决策)
2. [数据库架构设计](#2-数据库架构设计)
3. [RESTful API 规范](#3-restful-api-规范)
4. [OpenAI 集成层设计](#4-openai-集成层设计)
5. [错误处理规范](#5-错误处理规范)
6. [性能优化策略](#6-性能优化策略)
7. [实现建议与代码示例](#7-实现建议与代码示例)
8. [附录 C：Better Auth 适配指南](#附录-cbetter-auth-适配指南)

---

## 1. 设计原则与核心决策

### 1.1 核心约束

| 约束项         | 决策                        | 理由                                      |
| -------------- | --------------------------- | ----------------------------------------- |
| **用户类型**   | 无技术基础用户              | 前端零配置，后端统一托管 OpenAI Key       |
| **数据库**     | PostgreSQL                  | 成熟稳定，JSONB 支持元数据，适合会话数据  |
| **API 风格**   | RESTful + RFC 9457          | 业界标准，与 Stripe/GitHub/Microsoft 对齐 |
| **分页**       | Cursor-based                | 性能稳定，适合消息历史无限滚动            |
| **软删除**     | 触发器归档模式              | 审计追溯，避免误删                        |
| **上下文管理** | `previous_response_id` 链式 | OpenAI Responses API 原生支持             |

### 1.2 架构分层

```
┌─────────────────────────────────────────────────────────────┐
│  前端 (Next.js 16)                                          │
│  - React 组件 + Tailwind + shadcn/ui                       │
│  - 浏览器 fetch API                                         │
│  - 无 API Key 配置                                          │
└───────────────────────┬─────────────────────────────────────┘
                        │ HTTP / RESTful API
                        ▼
┌─────────────────────────────────────────────────────────────┐
│  后端 (NestJS 11)                                           │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │ Controller  │  │   Service   │  │ OpenAI Provider     │  │
│  │  REST API   │──│  Business   │──│ Responses API 封装   │  │
│  │   Layer     │  │    Logic    │  │ 统一代理层           │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
│         │                                                 │
│         ▼                                                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │   DTOs      │  │  Repository │  │  PostgreSQL         │  │
│  │ Validation  │──│  Prisma/    │──│  + JSONB            │  │
│  │   Pipes     │  │  TypeORM    │  │  结构化 + 半结构化   │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. 数据库架构设计

### 2.1 Schema 概览

```sql
-- 启用必要扩展
CREATE EXTENSION IF NOT EXISTS "pgcrypto";      -- UUID 生成
CREATE EXTENSION IF NOT EXISTS "citext";        -- 大小写不敏感文本

-- Schema 命名空间（隔离业务表）
CREATE SCHEMA IF NOT EXISTS chatbox;

-- 枚举类型定义
CREATE TYPE chatbox.message_role AS ENUM ('system', 'user', 'assistant', 'tool');
CREATE TYPE chatbox.ai_generation_status AS ENUM ('queued', 'streaming', 'succeeded', 'failed', 'cancelled');
CREATE TYPE chatbox.user_kind AS ENUM ('anonymous', 'registered');
```

### 2.2 核心表结构

#### 2.2.1 用户表 (users)

**用途**: 支持匿名用户和注册用户，保持外键一致性

```sql
CREATE TABLE chatbox.users (
    id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    kind            chatbox.user_kind NOT NULL DEFAULT 'anonymous',

    -- 注册用户字段（匿名时可为空）
    email           citext,
    display_name    text,

    -- 时间戳
    created_at      timestamptz NOT NULL DEFAULT now(),
    updated_at      timestamptz NOT NULL DEFAULT now(),
    last_seen_at    timestamptz,

    -- 软删除
    deleted_at      timestamptz,

    -- 认证标识（后续集成 Auth0/Clerk 使用）
    auth_subject    text,

    -- 约束
    CONSTRAINT users_email_format_chk
        CHECK (email IS NULL OR position('@' in email) > 1),
    CONSTRAINT users_kind_email_chk
        CHECK (kind = 'anonymous' OR email IS NOT NULL)
);

-- 索引
CREATE UNIQUE INDEX idx_users_email_live
    ON chatbox.users (email)
    WHERE deleted_at IS NULL AND email IS NOT NULL;

CREATE INDEX idx_users_last_seen
    ON chatbox.users (last_seen_at DESC)
    WHERE deleted_at IS NULL;
```

**设计理由**:

- `kind` 字段允许从匿名平滑升级到注册用户
- `auth_subject` 预留外部认证集成
- 软删除保留审计数据

#### 2.2.2 会话表 (conversations)

**用途**: 聊天会话（对话线程）

```sql
CREATE TABLE chatbox.conversations (
    id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id             uuid NOT NULL REFERENCES chatbox.users(id) ON DELETE RESTRICT,

    -- 标题（可自动生成或用户设置）
    title               text,
    title_set_by_user   boolean NOT NULL DEFAULT false,

    -- 反规范化字段（优化列表查询）
    message_count       integer NOT NULL DEFAULT 0,
    last_message_at     timestamptz,
    last_message_id     uuid,

    -- 会话级 AI 配置（覆盖全局默认）
    ai_settings         jsonb NOT NULL DEFAULT '{}'::jsonb,

    -- 时间戳
    created_at          timestamptz NOT NULL DEFAULT now(),
    updated_at          timestamptz NOT NULL DEFAULT now(),

    -- 软删除
    deleted_at          timestamptz,

    -- 约束
    CONSTRAINT conversations_title_len_chk
        CHECK (title IS NULL OR char_length(title) <= 200),
    CONSTRAINT conversations_ai_settings_obj_chk
        CHECK (jsonb_typeof(ai_settings) = 'object')
);

-- 核心索引：按用户+更新时间倒序（会话列表）
CREATE INDEX idx_conversations_user_updated_live
    ON chatbox.conversations (user_id, updated_at DESC, id)
    WHERE deleted_at IS NULL;

CREATE INDEX idx_conversations_user_created_live
    ON chatbox.conversations (user_id, created_at DESC, id)
    WHERE deleted_at IS NULL;

-- 循环外键（last_message_id 指向 messages）
ALTER TABLE chatbox.conversations
    ADD CONSTRAINT fk_conversations_last_message
    FOREIGN KEY (last_message_id) REFERENCES chatbox.messages(id)
    DEFERRABLE INITIALLY DEFERRED;
```

**设计理由**:

- `message_count`, `last_message_at` 反规范化避免频繁 JOIN
- `ai_settings` JSONB 存储会话级模型配置（temperature 等）
- `title_set_by_user` 区分自动生成标题和用户设置标题

#### 2.2.3 消息表 (messages)

**用途**: 聊天消息（用户消息和 AI 回复）

```sql
CREATE TABLE chatbox.messages (
    id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    conversation_id     uuid NOT NULL REFERENCES chatbox.conversations(id) ON DELETE RESTRICT,

    -- 作者（用户消息有 author_user_id，AI 消息为 NULL）
    author_user_id      uuid REFERENCES chatbox.users(id) ON DELETE SET NULL,

    -- 角色映射 OpenAI 标准
    role                chatbox.message_role NOT NULL,

    -- 内容（支持纯文本和结构化内容）
    content_text        text,
    content_json        jsonb,

    -- 客户端幂等性键（防止重复提交）
    client_message_id   text,

    -- 编辑时间（支持消息编辑功能）
    edited_at           timestamptz,

    -- 时间戳
    created_at          timestamptz NOT NULL DEFAULT now(),
    deleted_at          timestamptz,

    -- 约束
    CONSTRAINT messages_content_present_chk
        CHECK (
            deleted_at IS NOT NULL
            OR content_text IS NOT NULL
            OR (content_json IS NOT NULL AND jsonb_typeof(content_json) IN ('object', 'array'))
        ),
    CONSTRAINT messages_client_message_id_len_chk
        CHECK (client_message_id IS NULL OR char_length(client_message_id) <= 100)
);

-- 核心索引：会话消息历史查询
CREATE INDEX idx_messages_conv_created_live
    ON chatbox.messages (conversation_id, created_at DESC, id DESC)
    WHERE deleted_at IS NULL;

CREATE INDEX idx_messages_conv_created_live_asc
    ON chatbox.messages (conversation_id, created_at ASC, id ASC)
    WHERE deleted_at IS NULL;

-- 幂等性唯一索引
CREATE UNIQUE INDEX idx_messages_conv_client_id_unique
    ON chatbox.messages (conversation_id, client_message_id)
    WHERE client_message_id IS NOT NULL;
```

**设计理由**:

- `role` 枚举对齐 OpenAI API: `system`, `user`, `assistant`, `tool`
- `content_text` 主存储，`content_json` 支持富文本/多模态
- `client_message_id` 实现网络重试时的幂等性
- 两个方向的索引优化正序/倒序查询

#### 2.2.4 AI 生成元数据表 (ai_generations)

**用途**: 存储 AI 回复的详细元数据（模型、token、延迟等）

```sql
CREATE TABLE chatbox.ai_generations (
    id                      uuid PRIMARY KEY DEFAULT gen_random_uuid(),

    -- 关联
    conversation_id         uuid NOT NULL REFERENCES chatbox.conversations(id) ON DELETE RESTRICT,
    assistant_message_id    uuid NOT NULL UNIQUE REFERENCES chatbox.messages(id) ON DELETE RESTRICT,

    -- 状态
    status                  chatbox.ai_generation_status NOT NULL DEFAULT 'queued',

    -- 模型信息
    provider                text NOT NULL DEFAULT 'openai',
    model                   text NOT NULL,

    -- 生成参数（实际使用的值）
    temperature             numeric(4,3),
    top_p                   numeric(5,4),
    max_output_tokens       integer,

    -- 上下文快照（用于调试和重放）
    context_message_ids     uuid[] NOT NULL DEFAULT '{}'::uuid[],
    system_prompt           text,

    -- Token 使用统计
    input_tokens            integer,
    output_tokens           integer,
    total_tokens            integer,
    cached_input_tokens     integer,

    -- 延迟指标（毫秒）
    latency_ms              integer,    -- 端到端总耗时
    ttft_ms                 integer,    -- 首 token 时间（streaming）

    -- 提供商关联 ID
    provider_request_id     text,
    provider_response_id    text,

    -- 原始请求/响应（调试用，考虑定期清理）
    request_json            jsonb,
    response_json           jsonb,

    -- 错误信息
    error_type              text,
    error_detail            text,

    -- 时间戳
    created_at              timestamptz NOT NULL DEFAULT now(),
    completed_at            timestamptz,

    -- 约束
    CONSTRAINT ai_gen_tokens_nonneg_chk
        CHECK (
            (input_tokens IS NULL OR input_tokens >= 0) AND
            (output_tokens IS NULL OR output_tokens >= 0) AND
            (total_tokens IS NULL OR total_tokens >= 0)
        ),
    CONSTRAINT ai_gen_latency_nonneg_chk
        CHECK (
            (latency_ms IS NULL OR latency_ms >= 0) AND
            (ttft_ms IS NULL OR ttft_ms >= 0)
        )
);

-- 索引
CREATE INDEX idx_ai_generations_conv_created
    ON chatbox.ai_generations (conversation_id, created_at DESC, id);

CREATE INDEX idx_ai_generations_status_created
    ON chatbox.ai_generations (status, created_at DESC);
```

**设计理由**:

- 独立表避免消息表膨胀，查询历史时可选择是否 JOIN
- `context_message_ids` 记录实际发送给 AI 的上下文
- `latency_ms` + `ttft_ms` 监控流式性能
- `request_json` / `response_json` 用于调试（可配置 TTL 自动清理）

### 2.3 软删除与归档机制

#### 2.3.1 归档表

```sql
CREATE TABLE chatbox.archive (
    id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    table_name      text NOT NULL,
    record_id       text NOT NULL,
    data            jsonb NOT NULL,
    archived_at     timestamptz NOT NULL DEFAULT now(),
    caused_by_table text,
    caused_by_id    text
) PARTITION BY RANGE (archived_at);

-- 按月分区
CREATE TABLE chatbox.archive_2026_01 PARTITION OF chatbox.archive
    FOR VALUES FROM ('2026-01-01') TO ('2026-02-01');
```

#### 2.3.2 触发器函数

```sql
CREATE OR REPLACE FUNCTION chatbox.archive_on_delete()
RETURNS TRIGGER AS $$
DECLARE
    cause_tbl TEXT;
    cause_id TEXT;
BEGIN
    cause_tbl := current_setting('archive.cause_table', true);
    cause_id := current_setting('archive.cause_id', true);

    INSERT INTO chatbox.archive (table_name, record_id, data, caused_by_table, caused_by_id)
    VALUES (TG_TABLE_NAME, OLD.id::TEXT, to_jsonb(OLD), cause_tbl, cause_id);

    RETURN OLD;
END;
$$ LANGUAGE plpgsql;

-- 绑定触发器
CREATE TRIGGER trg_conversations_archive
    BEFORE DELETE ON chatbox.conversations
    FOR EACH ROW EXECUTE FUNCTION chatbox.archive_on_delete();

CREATE TRIGGER trg_messages_archive
    BEFORE DELETE ON chatbox.messages
    FOR EACH ROW EXECUTE FUNCTION chatbox.archive_on_delete();
```

---

### 2.4 Better Auth 适配（可选）

> 本节说明如何将当前数据库设计与 [Better Auth](https://www.better-auth.com/) 认证框架集成。

#### 2.4.1 Better Auth 核心要求

Better Auth 需要 **4 个核心表**（表名可自定义）：

| 表名 | 用途 | 必填字段 |
|------|------|----------|
| `user` | 用户账户 | `id`, `name`, `email`, `emailVerified`, `createdAt`, `updatedAt` |
| `session` | 会话管理 | `id`, `userId`, `token`, `expiresAt` |
| `account` | 第三方登录 | `id`, `userId`, `providerId`, `accountId` |
| `verification` | 邮箱验证 | `id`, `identifier`, `value`, `expiresAt` |

#### 2.4.2 与当前设计的兼容性

**✅ 兼容部分**:

- `email` 字段已存在（citext 类型，唯一约束）
- `display_name` 可映射为 `name`
- 时间戳字段可通过配置映射

**⚠️ 需要适配**:

- 添加 `emailVerified` 布尔字段（当前缺失）
- Better Auth 默认使用 **string** 类型 ID，当前使用 **uuid**（可通过配置解决）
- 需要新增 `session`、`account`、`verification` 三个表

**配置映射方案**（无需修改数据库结构）:

```typescript
import { betterAuth } from "better-auth";

const auth = betterAuth({
  // 自定义表名
  user: {
    modelName: "users",
    fields: {
      name: "display_name",           // 映射
      emailVerified: "email_verified",  // 需添加此字段
    },
    // 扩展额外字段
    additionalFields: {
      kind: {
        type: "string",
        required: false,
        defaultValue: "anonymous"
      },
      deleted_at: {
        type: "string",
        required: false,
        defaultValue: null
      }
    }
  },
  session: {
    modelName: "user_sessions"
  },
  account: {
    modelName: "user_accounts"
  },
  database: {
    // PostgreSQL 连接配置
    type: "postgresql",
    connectionString: process.env.DATABASE_URL
  }
});
```

#### 2.4.3 数据库迁移步骤

**1. 添加缺失字段**:

```sql
-- users 表添加 emailVerified
ALTER TABLE chatbox.users
ADD COLUMN email_verified boolean DEFAULT false;

-- 启用 anonymous 插件需要
ALTER TABLE chatbox.users
ADD COLUMN is_anonymous boolean DEFAULT false;
```

**2. 创建 Better Auth 必需表**:

```sql
-- session 表
CREATE TABLE chatbox.user_sessions (
    id              text PRIMARY KEY,
    user_id         uuid NOT NULL REFERENCES chatbox.users(id),
    token           text UNIQUE NOT NULL,
    expires_at     timestamptz NOT NULL,
    ip_address     text,
    user_agent     text,
    created_at     timestamptz DEFAULT now(),
    updated_at     timestamptz DEFAULT now()
);

-- account 表（第三方登录）
CREATE TABLE chatbox.user_accounts (
    id              text PRIMARY KEY,
    user_id         uuid NOT NULL REFERENCES chatbox.users(id),
    account_id     text NOT NULL,
    provider_id    text NOT NULL,
    access_token   text,
    refresh_token  text,
    id_token       text,
    scope          text,
    password       text,
    created_at     timestamptz DEFAULT now(),
    updated_at     timestamptz DEFAULT now()
);

-- verification 表（邮箱验证）
CREATE TABLE chatbox.verifications (
    id              text PRIMARY KEY,
    identifier     text NOT NULL,
    value          text NOT NULL,
    expires_at     timestamptz NOT NULL,
    created_at     timestamptz DEFAULT now(),
    updated_at     timestamptz DEFAULT now()
);

-- 索引
CREATE INDEX idx_sessions_user ON chatbox.user_sessions(user_id);
CREATE INDEX idx_sessions_token ON chatbox.user_sessions(token);
CREATE INDEX idx_accounts_user ON chatbox.user_accounts(user_id);
CREATE INDEX idx_verifications_identifier ON chatbox.verifications(identifier);
```

#### 2.4.4 匿名用户支持

Better Auth 提供 `anonymous` 插件支持匿名用户：

```typescript
import { anonymous } from "better-auth/plugins";

export const auth = betterAuth({
  plugins: [
    anonymous()
  ]
});
```

匿名用户会拥有独立的 `user` 记录（`is_anonymous = true`），后续可通过账号关联升级为正式用户。

#### 2.4.5 与业务表的关联

业务表（conversations, messages）通过 `user_id` 关联到 Better Auth 的 `users` 表：

```sql
-- conversations.user_id 关联到 better-auth 的 users 表
ALTER TABLE chatbox.conversations
ADD CONSTRAINT fk_conversations_user
FOREIGN KEY (user_id) REFERENCES chatbox.users(id);
```

Better Auth 会在 `user` 表中创建记录，业务代码通过 `auth.getSession()` 获取当前用户，再通过 `user.id` 查询业务数据。

---

## 3. RESTful API 规范

### 3.1 基础约定

| 项目             | 约定                  | 示例                                   |
| ---------------- | --------------------- | -------------------------------------- |
| **Base URL**     | `/v1`                 | `https://api.example.com/v1`           |
| **Content-Type** | `application/json`    | 请求/响应统一                          |
| **认证**         | Session/Cookie 或 JWT | 由后端解析，前端无感知                 |
| **字符编码**     | UTF-8                 | 全部接口                               |
| **时间格式**     | ISO 8601 UTC          | `2026-02-24T10:20:30.123Z`             |
| **ID 格式**      | UUID v4               | `550e8400-e29b-41d4-a716-446655440000` |

### 3.2 端点清单

| 方法   | 路径                             | 描述                 | 幂等性                     |
| ------ | -------------------------------- | -------------------- | -------------------------- |
| GET    | `/v1/health`                     | 健康检查             | 是                         |
| POST   | `/v1/conversations`              | 创建会话             | 是（带 Idempotency-Key）   |
| GET    | `/v1/conversations`              | 列出会话（分页）     | 是                         |
| GET    | `/v1/conversations/:id`          | 获取会话详情         | 是                         |
| PATCH  | `/v1/conversations/:id`          | 更新会话             | 是                         |
| DELETE | `/v1/conversations/:id`          | 软删除会话           | 是                         |
| POST   | `/v1/conversations/:id/messages` | 发送消息（触发 AI）  | 是（带 client_message_id） |
| GET    | `/v1/conversations/:id/messages` | 获取消息历史（分页） | 是                         |
| GET    | `/v1/messages/:id`               | 获取单条消息         | 是                         |

### 3.3 成功响应格式

#### 3.3.1 单资源响应

```http
HTTP/1.1 200 OK
Content-Type: application/json
X-Request-Id: req_01HRA...
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1708800000

{
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "title": "Trip planning",
    "message_count": 12,
    "last_message_at": "2026-02-24T10:20:30.123Z",
    "created_at": "2026-02-24T10:00:00.000Z",
    "updated_at": "2026-02-24T10:20:30.123Z"
  },
  "meta": {
    "request_id": "req_01HRA..."
  }
}
```

#### 3.3.2 列表响应（带分页）

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "data": [
    { "id": "...", "title": "...", "updated_at": "..." },
    { "id": "...", "title": "...", "updated_at": "..." }
  ],
  "meta": {
    "request_id": "req_01HRA...",
    "page": {
      "limit": 20,
      "next_cursor": "eyJ1cGRhdGVkX2F0IjoiMjAyNi0wMi0yNFQxMDoyMDozMC4xMjNaIiwiaWQiOiIyZDBiZmEwZi05YzIzLTRiYzAtOWYyYy04ZGJkY2UyZDNkOGQifQ=="
    }
  }
}
```

### 3.4 详细端点规范

#### 3.4.1 POST /v1/conversations

**请求**:

```http
POST /v1/conversations HTTP/1.1
Content-Type: application/json
Idempotency-Key: idem-abc123...

{
  "title": "Trip planning",
  "ai_settings": {
    "model": "gpt-4o-mini",
    "temperature": 0.7,
    "top_p": 0.9
  }
}
```

**响应 (201 Created)**:

```http
HTTP/1.1 201 Created
Content-Type: application/json
Location: /v1/conversations/550e8400-e29b-41d4-a716-446655440000

{
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "title": "Trip planning",
    "title_set_by_user": true,
    "message_count": 0,
    "last_message_at": null,
    "ai_settings": {
      "model": "gpt-4o-mini",
      "temperature": 0.7
    },
    "created_at": "2026-02-24T10:00:00.000Z",
    "updated_at": "2026-02-24T10:00:00.000Z"
  },
  "meta": {
    "request_id": "req_01HRA..."
  }
}
```

#### 3.4.2 GET /v1/conversations

**查询参数**:

| 参数      | 类型    | 必填 | 默认值       | 说明                         |
| --------- | ------- | ---- | ------------ | ---------------------------- |
| `limit`   | integer | 否   | 20           | 每页数量 (1-100)             |
| `cursor`  | string  | 否   | -            | 分页游标（opaque）           |
| `sort_by` | string  | 否   | `updated_at` | `updated_at` \| `created_at` |

**响应**:

```json
{
  "data": [
    {
      "id": "conv-uuid-1",
      "title": "Trip planning",
      "message_count": 12,
      "last_message_at": "2026-02-24T10:20:30.123Z",
      "last_message_preview": "Day 1: Visit Fushimi Inari...",
      "created_at": "2026-02-24T10:00:00.000Z",
      "updated_at": "2026-02-24T10:20:30.123Z"
    }
  ],
  "meta": {
    "request_id": "req_01HRA...",
    "page": {
      "limit": 20,
      "next_cursor": "base64-encoded-cursor"
    }
  }
}
```

#### 3.4.3 POST /v1/conversations/:id/messages

**请求**:

```http
POST /v1/conversations/550e8400-e29b-41d4-a716-446655440000/messages HTTP/1.1
Content-Type: application/json
Idempotency-Key: idem-xyz789...

{
  "client_message_id": "client-msg-001",
  "content": {
    "text": "Plan a 3-day itinerary for Kyoto."
  },
  "response": {
    "stream": true,
    "include_ai_meta": true
  },
  "ai_overrides": {
    "temperature": 0.8
  }
}
```

**非流式响应 (201 Created)**:

```json
{
  "data": {
    "user_message": {
      "id": "msg-user-uuid",
      "conversation_id": "conv-uuid",
      "role": "user",
      "content": { "text": "Plan a 3-day itinerary for Kyoto." },
      "created_at": "2026-02-24T10:20:00.000Z",
      "ai": null
    },
    "assistant_message": {
      "id": "msg-assistant-uuid",
      "conversation_id": "conv-uuid",
      "role": "assistant",
      "content": { "text": "Day 1: Fushimi Inari...\nDay 2: Arashiyama..." },
      "created_at": "2026-02-24T10:20:30.123Z",
      "ai": {
        "generation_id": "gen-uuid",
        "provider": "openai",
        "model": "gpt-4o-mini",
        "usage": {
          "input_tokens": 812,
          "output_tokens": 624,
          "total_tokens": 1436
        },
        "latency_ms": 1530,
        "ttft_ms": null
      }
    }
  },
  "meta": {
    "request_id": "req_01HRA..."
  }
}
```

**流式响应 (SSE)**:

```http
HTTP/1.1 200 OK
Content-Type: text/event-stream
Cache-Control: no-cache
Connection: keep-alive

event: message.created
data: {"assistant_message_id":"msg-assistant-uuid","generation_id":"gen-uuid"}

event: message.delta
data: {"delta":"Day 1: Visit Fushimi Inari..."}

event: message.delta
data: {"delta":"\nDay 2: Arashiyama..."}

event: message.completed
data: {"assistant_message":{"id":"msg-assistant-uuid",...,"ai":{"usage":...}}}
```

#### 3.4.4 GET /v1/conversations/:id/messages

**查询参数**:

| 参数              | 类型    | 必填 | 默认值 | 说明                 |
| ----------------- | ------- | ---- | ------ | -------------------- |
| `limit`           | integer | 否   | 50     | 每页数量 (1-200)     |
| `before`          | string  | 否   | -      | 游标，获取更早的消息 |
| `include_ai_meta` | boolean | 否   | false  | 是否包含 AI 元数据   |

**响应**:

```json
{
  "data": [
    {
      "id": "msg-1",
      "conversation_id": "conv-uuid",
      "role": "user",
      "content": { "text": "Plan a 3-day itinerary for Kyoto." },
      "created_at": "2026-02-24T10:20:00.000Z",
      "ai": null
    },
    {
      "id": "msg-2",
      "conversation_id": "conv-uuid",
      "role": "assistant",
      "content": { "text": "Day 1: Fushimi Inari..." },
      "created_at": "2026-02-24T10:20:30.123Z",
      "ai": {
        "generation_id": "gen-uuid",
        "provider": "openai",
        "model": "gpt-4o-mini",
        "usage": {
          "input_tokens": 812,
          "output_tokens": 624,
          "total_tokens": 1436
        }
      }
    }
  ],
  "meta": {
    "request_id": "req_01HRA...",
    "page": {
      "limit": 50,
      "next_cursor": "base64-encoded-cursor-for-older-messages"
    }
  }
}
```

---

## 4. OpenAI 集成层设计

### 4.1 架构模式

```
┌─────────────────────────────────────────────────────────────┐
│  NestJS Service Layer                                       │
│  ┌─────────────────────────────────────────────────────────┐│
│  │  ChatService                                            ││
│  │  - createConversation()                                 ││
│  │  - sendMessage()                                        ││
│  │  - getMessages()                                        ││
│  └───────────────────┬─────────────────────────────────────┘│
│                      │                                       │
│                      ▼                                       │
│  ┌─────────────────────────────────────────────────────────┐│
│  │  OpenAIProvider (抽象接口)                               ││
│  │  - generateResponse()                                   ││
│  │  - streamResponse()                                     ││
│  │  - countTokens()                                        ││
│  └───────────────────┬─────────────────────────────────────┘│
│                      │                                       │
│                      ▼                                       │
│  ┌─────────────────────────────────────────────────────────┐│
│  │  OpenAI SDK (backend-only)                              ││
│  │  - responses.create()                                   ││
│  │  - responses.input_tokens.count()                       ││
│  └─────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘
```

### 4.2 请求构建策略

```typescript
// 上下文构建示例
async function buildContext(
  conversationId: string,
  maxTokens: number = 120000,
): Promise<Message[]> {
  // 1. 获取会话历史（按时间倒序）
  const messages = await db.messages.findMany({
    where: {
      conversation_id: conversationId,
      deleted_at: null,
    },
    orderBy: { created_at: "desc" },
    take: 50, // 最近 50 条
  });

  // 2. 转换为 OpenAI 格式
  const context: Message[] = messages.reverse().map((m) => ({
    role: m.role, // 'user' | 'assistant' | 'system'
    content: m.content_text,
  }));

  // 3. 添加系统提示（如配置）
  const conversation = await db.conversations.findById(conversationId);
  if (conversation.system_prompt) {
    context.unshift({
      role: "system",
      content: conversation.system_prompt,
    });
  }

  // 4. Token 预算截断（如需）
  // ... 实现截断逻辑

  return context;
}
```

### 4.3 流式响应处理

```typescript
async function* streamAIResponse(
  conversationId: string,
  userMessage: string,
  options: AIRequestOptions,
): AsyncGenerator<StreamEvent> {
  const context = await buildContext(conversationId);

  // 1. 预生成 Token 计数
  const tokenCount = await openai.responses.input_tokens.count({
    model: options.model,
    input: [...context, { role: "user", content: userMessage }],
  });

  // 2. 检查限额
  if (tokenCount.input_tokens > MAX_CONTEXT_TOKENS) {
    throw new ContextTooLongError();
  }

  // 3. 创建流
  const stream = await openai.responses.create({
    model: options.model,
    input: userMessage,
    instructions: options.systemPrompt,
    previous_response_id: options.previousResponseId,
    temperature: options.temperature,
    stream: true,
  });

  let fullText = "";
  let firstTokenTime: number | null = null;
  const startTime = Date.now();

  // 4. 处理流事件
  for await (const event of stream) {
    switch (event.type) {
      case "response.created":
        yield { type: "message.created", generationId: event.response.id };
        break;

      case "response.output_text.delta":
        if (!firstTokenTime) {
          firstTokenTime = Date.now() - startTime;
        }
        fullText += event.delta;
        yield { type: "message.delta", delta: event.delta };
        break;

      case "response.completed":
        const latency = Date.now() - startTime;
        yield {
          type: "message.completed",
          content: fullText,
          metadata: {
            generationId: event.response.id,
            usage: event.response.usage,
            latencyMs: latency,
            ttftMs: firstTokenTime,
          },
        };
        break;

      case "error":
        yield {
          type: "error",
          error: mapOpenAIError(event.error),
        };
        break;
    }
  }
}
```

### 4.4 Token 使用追踪

```typescript
// Token 追踪服务
class TokenTrackingService {
  async recordUsage(params: {
    userId: string;
    conversationId: string;
    messageId: string;
    response: OpenAIResponse;
  }): Promise<void> {
    const usage = {
      user_id: params.userId,
      conversation_id: params.conversationId,
      message_id: params.messageId,
      input_tokens: params.response.usage.input_tokens,
      output_tokens: params.response.usage.output_tokens,
      total_tokens: params.response.usage.total_tokens,
      model: params.response.model,
      created_at: new Date(),
      cost: this.calculateCost(params.response.model, params.response.usage),
    };

    // 1. 写入用量表
    await db.ai_generations.create(usage);

    // 2. 更新用户累计用量（用于配额限制）
    await db.users.update(params.userId, {
      $inc: {
        tokens_used_monthly: usage.total_tokens,
        cost_accrued: usage.cost,
      },
    });
  }

  private calculateCost(model: string, usage: TokenUsage): number {
    const pricing: Record<string, { input: number; output: number }> = {
      "gpt-4o": { input: 0.0000025, output: 0.00001 },
      "gpt-4o-mini": { input: 0.00000015, output: 0.0000006 },
    };

    const price = pricing[model] || pricing["gpt-4o"];
    return (
      usage.input_tokens * price.input + usage.output_tokens * price.output
    );
  }
}
```

---

## 5. 错误处理规范

### 5.1 错误响应格式 (RFC 9457)

所有错误响应必须使用 `application/problem+json` 格式：

```http
HTTP/1.1 400 Bad Request
Content-Type: application/problem+json
X-Request-Id: req_01HRA...

{
  "type": "https://api.example.com/problems/validation-error",
  "title": "Validation Error",
  "status": 400,
  "detail": "Request validation failed",
  "instance": "/v1/conversations/conv-uuid/messages",
  "request_id": "req_01HRA...",
  "code": "VALIDATION_ERROR",
  "errors": [
    {
      "field": "content.text",
      "message": "must be at most 8000 characters"
    }
  ]
}
```

### 5.2 错误类型映射

| HTTP 状态 | 错误类型 URI                        | 场景           | 用户友好消息           |
| --------- | ----------------------------------- | -------------- | ---------------------- |
| 400       | `/problems/validation-error`        | 参数校验失败   | "请求格式不正确"       |
| 401       | `/problems/authentication-required` | 未登录         | "请先登录"             |
| 403       | `/problems/forbidden`               | 无权访问会话   | "无法访问此对话"       |
| 404       | `/problems/not-found`               | 资源不存在     | "对话不存在"           |
| 409       | `/problems/conflict`                | 并发修改冲突   | "数据已过期，请刷新"   |
| 422       | `/problems/message-too-long`        | 超出长度限制   | "消息太长，请精简"     |
| 429       | `/problems/rate-limited`            | 请求频率过高   | "操作太快，请稍后再试" |
| 500       | `/problems/internal-error`          | 服务器内部错误 | "服务暂时不可用"       |
| 503       | `/problems/service-unavailable`     | AI 服务不可用  | "AI 服务繁忙，请稍后"  |

### 5.3 OpenAI 错误映射

```typescript
function mapOpenAIError(error: OpenAIError): ProblemDetail {
  const errorMap: Record<
    string,
    { status: number; type: string; message: string }
  > = {
    rate_limit_exceeded: {
      status: 429,
      type: "/problems/rate-limited",
      message: "操作太快，请稍后再试",
    },
    insufficient_quota: {
      status: 503,
      type: "/problems/service-unavailable",
      message: "服务配额已满，请联系管理员",
    },
    context_length_exceeded: {
      status: 422,
      type: "/problems/message-too-long",
      message: "消息太长或对话历史过多，请新建对话",
    },
    invalid_api_key: {
      status: 503,
      type: "/problems/service-unavailable",
      message: "服务配置错误，请联系管理员",
    },
    server_error: {
      status: 503,
      type: "/problems/service-unavailable",
      message: "AI 服务暂时不可用，请稍后重试",
    },
  };

  const mapped = errorMap[error.code] || {
    status: 500,
    type: "/problems/internal-error",
    message: "服务暂时不可用",
  };

  return {
    type: `https://api.example.com${mapped.type}`,
    title: mapped.message,
    status: mapped.status,
    detail: mapped.message,
    request_id: generateRequestId(),
    code: error.code.toUpperCase(),
  };
}
```

---

## 6. 性能优化策略

### 6.1 数据库优化

| 优化项       | 策略                                         | 效果                  |
| ------------ | -------------------------------------------- | --------------------- |
| **索引**     | 复合索引 `(conversation_id, created_at, id)` | 消息历史查询 O(log n) |
| **部分索引** | `WHERE deleted_at IS NULL`                   | 减少 90% 索引大小     |
| **反规范化** | `conversations.message_count`                | 列表页免 JOIN         |
| **分区**     | 按 `created_at` 月分区 messages              | 便于归档和清理        |
| **连接池**   | PgBouncer transaction 模式                   | 支持 1000+ 并发       |

### 6.2 API 优化

| 优化项     | 策略               | 效果                 |
| ---------- | ------------------ | -------------------- |
| **分页**   | Cursor-based       | 避免 OFFSET 性能退化 |
| **流式**   | SSE 逐字输出       | 首字节时间 < 500ms   |
| **缓存**   | Redis 缓存热点会话 | 减少 70% DB 查询     |
| **压缩**   | Brotli/gzip 响应   | 减少 60% 传输量      |
| **HTTP/2** | 多路复用           | 减少连接开销         |

### 6.3 OpenAI 调用优化

| 优化项         | 策略                     | 效果                   |
| -------------- | ------------------------ | ---------------------- |
| **提示缓存**   | `previous_response_id`   | 减少 40-80% token 成本 |
| **上下文截断** | 智能保留最近 20 轮       | 避免超出上下文窗口     |
| **模型降级**   | 长对话自动切换到 4o-mini | 降低成本               |
| **流式超时**   | 30s 无响应自动熔断       | 避免用户长时间等待     |

---

## 7. 实现建议与代码示例

### 7.1 NestJS 模块结构

```
apps/api/src/
├── main.ts                      # 应用入口
├── app.module.ts                # 根模块
├── config/
│   └── database.config.ts       # 数据库配置
├── common/
│   ├── filters/
│   │   └── problem-detail.filter.ts  # RFC 9457 错误处理
│   ├── interceptors/
│   │   └── request-id.interceptor.ts # X-Request-Id
│   └── pipes/
│       └── validation.pipe.ts   # DTO 校验
├── chat/
│   ├── chat.module.ts
│   ├── chat.controller.ts       # REST API
│   ├── chat.service.ts          # 业务逻辑
│   ├── dto/
│   │   ├── create-conversation.dto.ts
│   │   ├── create-message.dto.ts
│   │   └── list-query.dto.ts
│   └── entities/
│       ├── conversation.entity.ts
│       └── message.entity.ts
├── provider/
│   ├── provider.module.ts
│   ├── openai/
│   │   ├── openai.provider.ts   # 提供商实现
│   │   ├── openai.interface.ts  # 抽象接口
│   │   └── openai.types.ts      # 类型定义
│   └── model-provider.interface.ts
└── database/
    └── prisma.service.ts        # 或 typeorm
```

### 7.2 DTO 示例 (NestJS + class-validator)

```typescript
// create-message.dto.ts
import {
  IsString,
  IsObject,
  IsOptional,
  IsBoolean,
  MaxLength,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";

class ContentDto {
  @IsString()
  @MaxLength(8000)
  text: string;
}

class ResponseOptionsDto {
  @IsOptional()
  @IsBoolean()
  stream?: boolean = false;

  @IsOptional()
  @IsBoolean()
  include_ai_meta?: boolean = true;
}

class AIOverridesDto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  model?: string;

  @IsOptional()
  temperature?: number;

  @IsOptional()
  top_p?: number;

  @IsOptional()
  max_output_tokens?: number;
}

export class CreateMessageDto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  client_message_id?: string;

  @ValidateNested()
  @Type(() => ContentDto)
  content: ContentDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => ResponseOptionsDto)
  response?: ResponseOptionsDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => AIOverridesDto)
  ai_overrides?: AIOverridesDto;
}
```

### 7.3 Controller 示例

```typescript
// chat.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  Headers,
  Res,
  HttpStatus,
} from "@nestjs/common";
import { Response } from "express";
import { ChatService } from "./chat.service";
import {
  CreateConversationDto,
  CreateMessageDto,
  ListConversationsQueryDto,
} from "./dto";
import { CurrentUser } from "../auth/decorators/current-user.decorator";

@Controller("v1")
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post("conversations")
  async createConversation(
    @Body() dto: CreateConversationDto,
    @CurrentUser() user: User,
    @Headers("idempotency-key") idempotencyKey?: string,
  ) {
    const conversation = await this.chatService.createConversation({
      userId: user.id,
      ...dto,
      idempotencyKey,
    });

    return {
      data: conversation,
      meta: { request_id: generateRequestId() },
    };
  }

  @Get("conversations")
  async listConversations(
    @Query() query: ListConversationsQueryDto,
    @CurrentUser() user: User,
  ) {
    const result = await this.chatService.listConversations({
      userId: user.id,
      ...query,
    });

    return {
      data: result.items,
      meta: {
        request_id: generateRequestId(),
        page: {
          limit: query.limit,
          next_cursor: result.nextCursor,
        },
      },
    };
  }

  @Post("conversations/:id/messages")
  async createMessage(
    @Param("id") conversationId: string,
    @Body() dto: CreateMessageDto,
    @CurrentUser() user: User,
    @Headers("idempotency-key") idempotencyKey?: string,
    @Res() res: Response,
  ) {
    const shouldStream = dto.response?.stream ?? false;

    if (shouldStream) {
      // SSE 流式响应
      res.setHeader("Content-Type", "text/event-stream");
      res.setHeader("Cache-Control", "no-cache");
      res.setHeader("Connection", "keep-alive");

      const stream = this.chatService.streamMessage({
        conversationId,
        userId: user.id,
        ...dto,
        idempotencyKey,
      });

      for await (const event of stream) {
        res.write(`event: ${event.type}\n`);
        res.write(`data: ${JSON.stringify(event.data)}\n\n`);
      }

      res.end();
    } else {
      // 非流式响应
      const result = await this.chatService.createMessage({
        conversationId,
        userId: user.id,
        ...dto,
        idempotencyKey,
      });

      return res.status(HttpStatus.CREATED).json({
        data: result,
        meta: { request_id: generateRequestId() },
      });
    }
  }
}
```

### 7.4 Cursor 分页实现

```typescript
// cursor-pagination.util.ts
interface CursorData {
  updated_at: string;
  id: string;
}

export function encodeCursor(data: CursorData): string {
  return Buffer.from(JSON.stringify(data)).toString("base64url");
}

export function decodeCursor(cursor: string): CursorData {
  try {
    return JSON.parse(Buffer.from(cursor, "base64url").toString());
  } catch {
    throw new BadRequestException("Invalid cursor format");
  }
}

// 使用示例
async function listConversations(
  userId: string,
  limit: number = 20,
  cursor?: string,
): Promise<PaginatedResult<Conversation>> {
  const where: any = {
    user_id: userId,
    deleted_at: null,
  };

  // 解析游标
  if (cursor) {
    const decoded = decodeCursor(cursor);
    where.OR = [
      { updated_at: { lt: decoded.updated_at } },
      {
        updated_at: decoded.updated_at,
        id: { lt: decoded.id },
      },
    ];
  }

  // 查询（多取一条判断是否还有更多）
  const items = await db.conversations.findMany({
    where,
    orderBy: [{ updated_at: "desc" }, { id: "desc" }],
    take: limit + 1,
  });

  const hasMore = items.length > limit;
  const results = hasMore ? items.slice(0, limit) : items;

  // 生成下一页游标
  const nextCursor =
    hasMore && results.length > 0
      ? encodeCursor({
          updated_at: results[results.length - 1].updated_at.toISOString(),
          id: results[results.length - 1].id,
        })
      : null;

  return {
    items: results,
    nextCursor,
  };
}
```

---

## 附录 A：OpenAI Responses API 参考

### A.1 请求体结构

```typescript
interface CreateResponseRequest {
  model: string; // 必需: gpt-4o, gpt-4o-mini
  input: string | Message[]; // 必需: 用户输入或消息数组
  instructions?: string; // 可选: 系统提示（替代 system message）
  previous_response_id?: string; // 可选: 链式上下文
  stream?: boolean; // 可选: 启用流式
  store?: boolean; // 可选: 是否持久化响应
  temperature?: number; // 可选: 0-2，默认 1
  top_p?: number; // 可选: 0-1，默认 1
  max_tokens?: number; // 可选: 最大输出 token
  tools?: Tool[]; // 可选: 工具调用
}

interface Message {
  role: "user" | "assistant" | "system";
  content: string | ContentPart[];
}

interface ContentPart {
  type: "input_text" | "input_image" | "input_file";
  text?: string;
  image_url?: string;
  file_id?: string;
}
```

### A.2 响应体结构

```typescript
interface Response {
  id: string; // 响应唯一 ID
  object: "response";
  created_at: number; // Unix 时间戳
  model: string;
  output: Item[]; // 输出项数组
  usage: {
    input_tokens: number;
    output_tokens: number;
    total_tokens: number;
  };
}

type Item =
  | {
      type: "message";
      role: "assistant";
      content: ContentPart[];
      status: "completed";
    }
  | { type: "reasoning"; content: []; summary: string[] }
  | { type: "function_call"; name: string; arguments: string }
  | { type: "function_call_output"; output: string };
```

### A.3 流式事件类型

| 事件类型                     | 说明                     |
| ---------------------------- | ------------------------ |
| `response.created`           | 响应开始生成             |
| `response.in_progress`       | 生成进行中               |
| `response.output_text.delta` | 文本片段（SSE 主要数据） |
| `response.completed`         | 响应完成                 |
| `response.failed`            | 生成失败                 |
| `error`                      | 发生错误                 |

---

## 附录 B：HTTP 状态码速查

| 状态码                      | 使用场景                     |
| --------------------------- | ---------------------------- |
| **200 OK**                  | GET, PATCH 成功              |
| **201 Created**             | POST 创建成功（返回资源）    |
| **204 No Content**          | DELETE 成功（无返回体）      |
| **400 Bad Request**         | 请求格式错误                 |
| **401 Unauthorized**        | 未认证/Token 无效            |
| **403 Forbidden**           | 无权限访问                   |
| **404 Not Found**           | 资源不存在                   |
| **409 Conflict**            | 资源冲突（如重复创建）       |
| **422 Unprocessable**       | 业务逻辑校验失败             |
| **429 Too Many Requests**   | 频率限制                     |
| **500 Internal Error**      | 服务器内部错误               |
| **503 Service Unavailable** | 服务不可用（如 OpenAI 故障） |

---

**文档结束**

> **注意事项**: 本文档基于最新的 RFC 9457、OpenAI Responses API 和 PostgreSQL 最佳实践编写。随着技术和标准的演进，建议定期回顾和更新。
