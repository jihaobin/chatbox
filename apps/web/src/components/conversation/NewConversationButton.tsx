"use client";

import { PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

interface NewConversationButtonProps {
  isLoading?: boolean;
  onCreate: () => Promise<unknown> | void;
}

export function NewConversationButton({
  isLoading,
  onCreate,
}: NewConversationButtonProps) {
  return (
    <Button
      className="w-full justify-start"
      onClick={() => void onCreate()}
      disabled={isLoading}
    >
      <PlusIcon />
      New chat
    </Button>
  );
}
