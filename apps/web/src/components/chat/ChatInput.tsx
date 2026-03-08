"use client";

import * as React from "react";
import { ArrowUpIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import { Textarea } from "@/components/ui/textarea";
import {
  SUPPORTED_CHAT_MODELS,
  type SupportedChatModel,
} from "@/src/lib/models";

interface ChatInputProps {
  isSending: boolean;
  disabled?: boolean;
  model: SupportedChatModel;
  onModelChange: (model: SupportedChatModel) => void;
  onSend: (value: string) => Promise<void> | void;
}

export function ChatInput({
  isSending,
  disabled,
  model,
  onModelChange,
  onSend,
}: ChatInputProps) {
  const [value, setValue] = React.useState("");
  const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);

  React.useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) {
      return;
    }

    textarea.style.height = "auto";
    textarea.style.height = `${Math.min(textarea.scrollHeight, 220)}px`;
  }, [value]);

  const submit = React.useCallback(async () => {
    const trimmed = value.trim();
    if (!trimmed || isSending || disabled) {
      return;
    }

    setValue("");
    await onSend(trimmed);
  }, [disabled, isSending, onSend, value]);

  return (
    <div className="border-t border-border/80 bg-background/90 p-3 backdrop-blur md:p-4">
      <div className="mx-auto flex w-full max-w-4xl items-end gap-2 rounded-2xl border border-border/80 bg-card p-2">
        <NativeSelect
          size="sm"
          value={model}
          onChange={(event) =>
            onModelChange(event.target.value as SupportedChatModel)
          }
          className="shrink-0"
          aria-label="Model"
        >
          {SUPPORTED_CHAT_MODELS.map((item) => (
            <NativeSelectOption key={item} value={item}>
              {item}
            </NativeSelectOption>
          ))}
        </NativeSelect>
        <Textarea
          ref={textareaRef}
          value={value}
          disabled={disabled}
          rows={1}
          placeholder={
            disabled
              ? "Create a conversation to start chatting"
              : "Send a message"
          }
          className="min-h-0 resize-none border-0 bg-transparent text-sm shadow-none focus-visible:ring-0"
          onChange={(event) => setValue(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              void submit();
            }
          }}
        />
        <Button
          size="icon-sm"
          onClick={() => void submit()}
          disabled={disabled || isSending || !value.trim()}
        >
          <ArrowUpIcon />
        </Button>
      </div>
    </div>
  );
}
