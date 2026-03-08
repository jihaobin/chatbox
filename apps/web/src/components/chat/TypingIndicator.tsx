"use client";

import { Loader2Icon } from "lucide-react";

export function TypingIndicator() {
  return (
    <div className="text-muted-foreground inline-flex items-center gap-2 rounded-full border border-border/70 bg-card px-3 py-1.5 text-xs">
      <Loader2Icon className="size-3.5 animate-spin" />
      Assistant is thinking
    </div>
  );
}
