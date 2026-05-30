'use client';

import type { ChatMessage } from '@/lib/chat-agent/types';
import { ChatBubble } from '@/components/chat/ChatBubble';

type ChatMessageListProps = {
  messages: ChatMessage[];
  busy: boolean;
};

export function ChatMessageList({ messages, busy }: ChatMessageListProps) {
  if (messages.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-3">
      {messages.map((message) => (
        <ChatBubble key={message.id} role={message.role} content={message.content} />
      ))}
      {busy ? <ChatBubble role="assistant" content="Thinking..." /> : null}
    </div>
  );
}
