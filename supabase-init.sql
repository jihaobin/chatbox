CREATE SCHEMA IF NOT EXISTS "chatbox";

CREATE EXTENSION IF NOT EXISTS "citext";

CREATE TYPE "chatbox"."message_role" AS ENUM ('system', 'user', 'assistant', 'tool');

CREATE TYPE "chatbox"."ai_generation_status" AS ENUM ('queued', 'streaming', 'succeeded', 'failed', 'cancelled');

CREATE TYPE "chatbox"."user_kind" AS ENUM ('anonymous', 'registered');

CREATE TABLE "chatbox"."users" (
    "id" UUID NOT NULL,
    "kind" "chatbox"."user_kind" NOT NULL DEFAULT 'anonymous',
    "email" CITEXT,
    "display_name" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "last_seen_at" TIMESTAMPTZ(6),
    "deleted_at" TIMESTAMPTZ(6),
    "auth_subject" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "chatbox"."conversations" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "title" TEXT,
    "title_set_by_user" BOOLEAN NOT NULL DEFAULT false,
    "message_count" INTEGER NOT NULL DEFAULT 0,
    "last_message_at" TIMESTAMPTZ(6),
    "last_message_id" UUID,
    "ai_settings" JSONB NOT NULL DEFAULT '{}',
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "deleted_at" TIMESTAMPTZ(6),

    CONSTRAINT "conversations_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "chatbox"."messages" (
    "id" UUID NOT NULL,
    "conversation_id" UUID NOT NULL,
    "author_user_id" UUID,
    "role" "chatbox"."message_role" NOT NULL,
    "content_text" TEXT,
    "content_json" JSONB,
    "client_message_id" TEXT,
    "edited_at" TIMESTAMPTZ(6),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMPTZ(6),

    CONSTRAINT "messages_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "chatbox"."ai_generations" (
    "id" UUID NOT NULL,
    "conversation_id" UUID NOT NULL,
    "assistant_message_id" UUID NOT NULL,
    "status" "chatbox"."ai_generation_status" NOT NULL DEFAULT 'queued',
    "provider" TEXT NOT NULL DEFAULT 'openai',
    "model" TEXT NOT NULL,
    "temperature" DECIMAL(4,3),
    "top_p" DECIMAL(5,4),
    "max_output_tokens" INTEGER,
    "context_message_ids" UUID[] DEFAULT ARRAY[]::UUID[],
    "system_prompt" TEXT,
    "input_tokens" INTEGER,
    "output_tokens" INTEGER,
    "total_tokens" INTEGER,
    "cached_input_tokens" INTEGER,
    "latency_ms" INTEGER,
    "ttft_ms" INTEGER,
    "provider_request_id" TEXT,
    "provider_response_id" TEXT,
    "request_json" JSONB,
    "response_json" JSONB,
    "error_type" TEXT,
    "error_detail" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completed_at" TIMESTAMPTZ(6),

    CONSTRAINT "ai_generations_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "idx_users_last_seen" ON "chatbox"."users"("last_seen_at" DESC);

CREATE INDEX "idx_users_deleted_at" ON "chatbox"."users"("deleted_at");

CREATE INDEX "idx_users_kind" ON "chatbox"."users"("kind");

CREATE UNIQUE INDEX "idx_users_email" ON "chatbox"."users"("email");

CREATE INDEX "idx_conversations_user_updated" ON "chatbox"."conversations"("user_id", "updated_at" DESC, "id");

CREATE INDEX "idx_conversations_user_created" ON "chatbox"."conversations"("user_id", "created_at" DESC, "id");

CREATE INDEX "idx_conversations_last_message_at" ON "chatbox"."conversations"("last_message_at" DESC);

CREATE INDEX "idx_conversations_deleted_at" ON "chatbox"."conversations"("deleted_at");

CREATE INDEX "idx_messages_conv_created_desc" ON "chatbox"."messages"("conversation_id", "created_at" DESC, "id" DESC);

CREATE INDEX "idx_messages_conv_created_asc" ON "chatbox"."messages"("conversation_id", "created_at" ASC, "id" ASC);

CREATE INDEX "idx_messages_author_user_id" ON "chatbox"."messages"("author_user_id");

CREATE INDEX "idx_messages_deleted_at" ON "chatbox"."messages"("deleted_at");

CREATE UNIQUE INDEX "idx_messages_conv_client_id_unique" ON "chatbox"."messages"("conversation_id", "client_message_id");

CREATE UNIQUE INDEX "idx_ai_generations_assistant_message" ON "chatbox"."ai_generations"("assistant_message_id");

CREATE INDEX "idx_ai_generations_conv_created" ON "chatbox"."ai_generations"("conversation_id", "created_at" DESC, "id");

CREATE INDEX "idx_ai_generations_status_created" ON "chatbox"."ai_generations"("status", "created_at" DESC);

CREATE INDEX "idx_ai_generations_provider_model" ON "chatbox"."ai_generations"("provider", "model");

ALTER TABLE "chatbox"."conversations" ADD CONSTRAINT "conversations_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "chatbox"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "chatbox"."conversations" ADD CONSTRAINT "conversations_last_message_id_fkey" FOREIGN KEY ("last_message_id") REFERENCES "chatbox"."messages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "chatbox"."messages" ADD CONSTRAINT "messages_conversation_id_fkey" FOREIGN KEY ("conversation_id") REFERENCES "chatbox"."conversations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "chatbox"."messages" ADD CONSTRAINT "messages_author_user_id_fkey" FOREIGN KEY ("author_user_id") REFERENCES "chatbox"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "chatbox"."ai_generations" ADD CONSTRAINT "ai_generations_conversation_id_fkey" FOREIGN KEY ("conversation_id") REFERENCES "chatbox"."conversations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "chatbox"."ai_generations" ADD CONSTRAINT "ai_generations_assistant_message_id_fkey" FOREIGN KEY ("assistant_message_id") REFERENCES "chatbox"."messages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
