"use client";

import * as React from "react";

import { type Message } from "@/src/lib/api";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { BrainCircuit, CheckCircle2, CircleAlert, Loader2 } from "lucide-react";

interface MessageItemProps {
  message: Message;
  isStreaming: boolean;
}

function toReasoningBlocks(input?: string) {
  if (!input) {
    return [] as string[];
  }

  return input
    .split(/\n{2,}|(?<=[。！？.!?])\s+/)
    .map((segment) => segment.trim())
    .filter((segment) => segment.length > 0);
}

export function MessageItem({ message, isStreaming }: MessageItemProps) {
  const isUser = message.role === "user";
  const text = message.content?.text ?? "";
  const reasoningState = message.ai?.reasoningState;
  const reasoningSummary = message.ai?.reasoning?.summary;
  const reasoningSteps = message.ai?.reasoning?.steps ?? [];
  const reasoningText = message.ai?.reasoning?.text;
  const reasoningBlocks = React.useMemo(
    () => toReasoningBlocks(reasoningText),
    [reasoningText],
  );
  const reasoningSegments =
    reasoningSteps.length > 0 ? reasoningSteps : reasoningBlocks;
  const hasReasoning =
    !isUser &&
    (reasoningSegments.length > 0 ||
      Boolean(reasoningSummary) ||
      Boolean(reasoningText?.trim()));
  const isReasoningInProgress =
    isStreaming ||
    reasoningState === "pending" ||
    reasoningState === "streaming";
  const shouldRenderReasoningPanel =
    !isUser &&
    (hasReasoning ||
      isReasoningInProgress ||
      reasoningState === "unavailable" ||
      reasoningState === "available");
  const reasoningLabel = isReasoningInProgress ? "思考中" : "已完成思考";
  const reasoningHint = isReasoningInProgress
    ? "模型正在输出推理过程"
    : reasoningSegments.length > 0 || reasoningSummary
      ? `共 ${reasoningSegments.length || 1} 段推理`
      : "模型未返回可展示推理过程";

  return (
    <div
      className={cn("flex w-full", isUser ? "justify-end" : "justify-start")}
    >
      <div className="max-w-[90%] md:max-w-[78%]">
        {shouldRenderReasoningPanel ? (
          <Accordion
            defaultValue={isStreaming ? ["reasoning"] : []}
            className="mb-2 w-full"
          >
            <AccordionItem
              value="reasoning"
              className="overflow-hidden rounded-2xl border border-amber-300/60 bg-gradient-to-b from-amber-50/80 to-white/80 shadow-sm"
            >
              <AccordionTrigger className="px-3.5 py-2.5 hover:no-underline">
                <div className="flex items-center gap-2 text-sm font-medium text-stone-700">
                  {isReasoningInProgress ? (
                    <Loader2 className="size-4 animate-spin text-amber-600" />
                  ) : (
                    <BrainCircuit className="size-4 text-amber-700" />
                  )}
                  <span>{reasoningLabel}</span>
                </div>
                <span className="text-xs text-stone-500">{reasoningHint}</span>
              </AccordionTrigger>
              <AccordionContent className="px-3.5 pb-3 pt-0">
                {reasoningSummary ? (
                  <p className="mb-3 rounded-lg border border-amber-200/80 bg-white/85 px-3 py-2 text-sm leading-6 text-stone-700">
                    {reasoningSummary}
                  </p>
                ) : null}
                {reasoningSegments.length > 0 ? (
                  <div className="space-y-3">
                    {reasoningSegments.map((segment, index) => (
                      <div
                        key={`${message.id}-reasoning-${index}`}
                        className="grid grid-cols-[12px_1fr] gap-2"
                      >
                        <div className="relative flex justify-center">
                          <span className="mt-2 size-2 rounded-full bg-amber-500/80" />
                          {index < reasoningSegments.length - 1 ? (
                            <span className="absolute inset-y-4 w-px bg-amber-200" />
                          ) : null}
                        </div>
                        <p className="rounded-lg border border-amber-100/80 bg-white/90 px-3 py-2 text-sm leading-6 text-stone-600">
                          {segment}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="rounded-lg border border-amber-100/90 bg-white/90 px-3 py-2 text-sm leading-6 text-stone-500">
                    {isReasoningInProgress
                      ? "等待模型返回推理片段..."
                      : "该模型本次未返回可展示的推理过程。"}
                  </p>
                )}
                <div className="mt-3 flex items-center gap-1.5 text-xs text-stone-500">
                  {isReasoningInProgress ? (
                    <>
                      <Loader2 className="size-3.5 animate-spin text-amber-600" />
                      <span>思考进行中</span>
                    </>
                  ) : hasReasoning ? (
                    <>
                      <CheckCircle2 className="size-3.5 text-emerald-600" />
                      <span>已完成</span>
                    </>
                  ) : (
                    <>
                      <CircleAlert className="size-3.5 text-amber-600" />
                      <span>未返回推理</span>
                    </>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ) : null}
        <div
          className={cn(
            "whitespace-pre-wrap break-words rounded-2xl px-4 py-2.5 text-sm",
            isUser
              ? "bg-primary text-primary-foreground rounded-br-md"
              : "bg-muted text-foreground rounded-bl-md",
          )}
        >
          {text || " "}
        </div>
      </div>
    </div>
  );
}
