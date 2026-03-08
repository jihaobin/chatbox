# Chatbox 部署方案（Cloudflare + Supabase）

## 1) 目标与约束

- 目标：将 chatbox 上线，支持 2 位用户稳定使用
- 约束：尽量使用免费额度（应用、数据库、流量）
- 域名：先使用平台自带二级域名（无需购买域名）
  - 前端：`xxx.pages.dev`
  - API：`xxx.workers.dev`

---

## 2) 推荐架构

```txt
Browser
  -> Cloudflare Pages (前端静态站点)
  -> Cloudflare Worker (后端 API / 鉴权 / 业务逻辑)
  -> Supabase Postgres (数据库)
```

- Pages：托管前端、CDN 分发
- Worker：统一 API 入口（避免把敏感逻辑放前端）
- Supabase：用户、会话、消息数据存储（Postgres + Auth 可选）

---

## 3) 资源清单（免费层）

- Cloudflare
  - Pages（前端）
  - Workers（后端 API）
- Supabase
  - 1 个 Project（Postgres）
- GitHub
  - 存代码并触发自动部署（Pages 可直连）

> 免费额度细则会变动，以上线时控制台显示为准。本方案会附带“防超额”措施。

---

## 4) 数据库设计（最小可用）

建议 3 张表：

- `users`（若你不用 Supabase Auth，也可自管）
- `chats`：会话
- `messages`：消息（user/assistant）

示例字段（简化）：

- `chats`: `id`, `user_id`, `title`, `created_at`
- `messages`: `id`, `chat_id`, `role`, `content`, `created_at`

建议立即做：

- 给 `messages(chat_id, created_at)` 建索引
- 开启 RLS（Row Level Security）
- 只给前端 `anon key`，`service_role key` 仅放 Worker Secret

---

## 5) 环境变量规划

### Pages（前端可见）

- `PUBLIC_API_BASE_URL` = Worker API 地址（如 `https://xxx.workers.dev`）
- `PUBLIC_SUPABASE_URL` = `https://<project>.supabase.co`
- `PUBLIC_SUPABASE_ANON_KEY` = Supabase anon key

### Worker（后端私密）

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`（仅 Worker 持有）
- `APP_ENV=prod`
- 其他第三方模型 API Key（如有）

---

## 6) 部署步骤（按顺序执行）

### Step A. 创建 Supabase

1. 注册并创建 Project（选离你近的 Region）
2. 建表（`chats/messages`）+ 索引
3. 配置 RLS 策略（至少限制“用户仅访问自己的会话/消息”）
4. 记录 `SUPABASE_URL`、`ANON_KEY`、`SERVICE_ROLE_KEY`
5. 在 Supabase 开启 usage 报警（阈值建议 70% / 90%）

### Step B. 部署 Worker（后端）

1. 在代码仓库添加 Worker 项目（`wrangler`）
2. 配置路由：
   - `POST /api/chat`
   - `GET /api/chats`
   - `GET /api/messages?chat_id=...`
3. 在 Cloudflare Worker 设置 Secrets：
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - 其他私钥
4. 开启 CORS（只允许你的 Pages 域名）
5. 发布，得到 `https://xxx.workers.dev`

### Step C. 部署 Pages（前端）

1. Cloudflare Pages 连接 GitHub 仓库
2. 配置 Build 命令和输出目录（按你的前端框架）
3. 配置环境变量：
   - `PUBLIC_API_BASE_URL=https://xxx.workers.dev`
   - `PUBLIC_SUPABASE_URL=...`
   - `PUBLIC_SUPABASE_ANON_KEY=...`
4. 首次部署成功后得到 `https://xxx.pages.dev`

### Step D. 联调验收

1. 打开 `pages.dev`，创建会话并发消息
2. 检查 Worker 日志（请求是否正常、延迟）
3. 检查 Supabase 表（消息是否写入）
4. 验证 RLS（A 用户不能读到 B 用户数据）
5. 手机网络再测一次（确认外网可用）

---

## 7) 免费额度保护（重点）

- Worker 端增加限流（按 IP / user_id）
- 单条消息长度限制（如 2k~4k chars）
- 会话历史分页（避免一次读全量）
- 前端做请求去抖和重试上限
- 日志采样（不要全量打印 message content）
- Supabase 定期清理旧会话（例如保留近 30~90 天）

---

## 8) 安全基线（上线前必须）

- `service_role` 只在 Worker，绝不进前端
- 前端只使用 `anon key`
- 全部密钥走平台 Secret，不写进仓库
- CORS 白名单限制到 `*.pages.dev` 或你的固定域名
- 对写接口加鉴权（至少 session token 校验）
- 不在日志打印 token / key / 完整隐私内容

---

## 9) 运维与回滚

- 回滚：
  - Pages 可一键回滚到上一个部署版本
  - Worker 保留上个稳定版本 tag
- 监控：
  - Cloudflare Analytics 看请求量、错误率
  - Supabase 看连接数、存储、流量
- 告警：
  - 额度 70% 预警，90% 强提醒

---

## 10) 上线检查清单（可直接打勾）

- [ ] `pages.dev` 可访问
- [ ] `workers.dev` API 可调用
- [ ] 数据写入/读取正常
- [ ] RLS 生效
- [ ] Secrets 全部从代码移除
- [ ] 限流和长度限制已开启
- [ ] 用量告警已配置
- [ ] 回滚路径验证过
