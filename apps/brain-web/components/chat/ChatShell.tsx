'use client';

import { useEffect, useMemo, useState } from 'react';

import type { ChatMessage, ChatSessionMeta } from '@/lib/chat-agent/types';
import {
  clearChatSessionMeta,
  loadChatSessionMeta,
  makeDefaultChatSession,
  saveChatSessionMeta,
} from '@/lib/chat-agent/session/session-store';
import { ChatComposer } from '@/components/chat/ChatComposer';
import { ChatMessageList } from '@/components/chat/ChatMessageList';

type ApiSuccess = {
  assistant: ChatMessage;
  session: ChatSessionMeta;
  debug?: { requestId: string; selectedTools: string[]; elapsedMs: number };
};

type ApiError = {
  error?: { code?: string; message?: string };
};

export function ChatShell() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [session, setSession] = useState<ChatSessionMeta>(makeDefaultChatSession());
  const [busy, setBusy] = useState(false);
  const [errorText, setErrorText] = useState<string | null>(null);

  useEffect(() => {
    // v1 requirement: reset conversation on reload.
    const fresh = makeDefaultChatSession();
    clearChatSessionMeta();
    setSession(fresh);
    saveChatSessionMeta(fresh);
    setMessages([]);
    setErrorText(null);
  }, []);

  useEffect(() => {
    saveChatSessionMeta(session);
  }, [session]);

  const disabled = useMemo(() => busy || session.limitReached, [busy, session.limitReached]);
  const isInitialScreen = messages.length === 0 && !busy;

  const sendMessage = async (content: string) => {
    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content,
      createdAt: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setErrorText(null);
    setBusy(true);

    try {
      const requestSession = loadChatSessionMeta();
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: content,
          session: requestSession,
        }),
      });
      const json = (await response.json().catch(() => ({}))) as ApiSuccess & ApiError;
      if (!response.ok || !json.assistant || !json.session) {
        throw new Error(json.error?.message || 'Chat request failed');
      }

      setMessages((prev) => [...prev, json.assistant]);
      setSession(json.session);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown chat error';
      setErrorText(message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="mx-auto flex w-full max-w-5xl flex-col gap-4 p-4 md:p-6">
      {/* Hidden for v1 UX: turns/chars telemetry is internal, not user-facing. */}

      {errorText ? (
        <div className="rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {errorText}
        </div>
      ) : null}

      {isInitialScreen ? (
        <div className="relative flex min-h-[calc(100svh-10rem)] items-center justify-center px-2">
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="h-[22rem] w-[min(54rem,96vw)] rounded-full bg-primary/35 blur-3xl" />
            <div className="absolute h-[11rem] w-[min(30rem,85vw)] rounded-full bg-primary/45 blur-2xl" />
            <div className="absolute h-24 w-[min(24rem,75vw)] rounded-full shadow-[0_0_220px_80px_hsl(var(--primary)/0.55)]" />
          </div>
          <ChatComposer
            busy={busy}
            disabled={disabled}
            onSend={sendMessage}
            className="relative z-10 w-full max-w-2xl"
          />
        </div>
      ) : (
        <>
          <div className="min-h-[45svh] p-3">
            <ChatMessageList messages={messages} busy={busy} />
          </div>
          <ChatComposer busy={busy} disabled={disabled} onSend={sendMessage} />
        </>
      )}
    </section>
  );
}
