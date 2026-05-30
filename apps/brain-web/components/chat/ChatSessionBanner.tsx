'use client';

import type { ChatSessionMeta } from '@/lib/chat-agent/types';
import { CHAT_AGENT_CONFIG } from '@/lib/chat-agent/config';
import { Button } from '@/components/ui/button';

type ChatSessionBannerProps = {
  session: ChatSessionMeta;
  onReset: () => void;
};

export function ChatSessionBanner({ session, onReset }: ChatSessionBannerProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-border bg-muted/30 px-3 py-2 text-xs text-muted-foreground">
      <div className="flex flex-wrap items-center gap-3">
        <span>
          Turns: {session.turnCount}/{CHAT_AGENT_CONFIG.maxTurns}
        </span>
        <span>
          Chars: {session.totalChars}/{CHAT_AGENT_CONFIG.maxSessionChars}
        </span>
        {session.limitReached ? <span className="text-destructive">Session limit reached</span> : null}
      </div>
      <Button size="sm" variant="outline" onClick={onReset}>
        New session
      </Button>
    </div>
  );
}
