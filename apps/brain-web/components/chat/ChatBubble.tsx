'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { cn } from '@/lib/utils';

type ChatBubbleProps = {
  role: 'user' | 'assistant';
  content: string;
};

function normalizeAssistantMarkdown(input: string) {
  return input
    // Force compact rendering: collapse multi-line gaps into single line breaks.
    .replace(/\n{2,}/g, '\n')
    .replace(/(\n\d+\.)\s*\n+/g, '$1 ')
    .replace(/(\n[-*+])\s*\n+/g, '$1 ')
    .trim();
}

export function ChatBubble({ role, content }: ChatBubbleProps) {
  const isUser = role === 'user';
  const assistantContent = isUser ? content : normalizeAssistantMarkdown(content);
  return (
    <div className={cn('flex w-full', isUser ? 'justify-end' : 'justify-start')}>
      <div
        className={cn(
          'max-w-[85%] rounded-2xl px-3 py-2 text-sm',
          isUser ? 'whitespace-pre-wrap' : 'whitespace-normal',
          isUser
            ? 'border border-primary/30 bg-primary/10 text-foreground'
            : 'bg-muted/40 text-foreground'
        )}
      >
        {isUser ? (
          <div className="whitespace-pre-wrap">{content}</div>
        ) : (
          <div
            className={cn(
              'leading-6',
              '[&_p]:my-0.5 [&_p:first-child]:mt-0 [&_p:last-child]:mb-0',
              '[&_ul]:my-0.5 [&_ul]:list-disc [&_ul]:pl-5',
              '[&_ol]:my-0.5 [&_ol]:list-decimal [&_ol]:pl-5',
              '[&_li]:my-0',
              '[&_li>p]:my-0',
              '[&_ul_ul]:my-0 [&_ol_ol]:my-0',
              '[&_strong]:font-semibold'
            )}
          >
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                a: ({ node, ...props }) => (
                  <a
                    {...props}
                    target="_blank"
                    rel="noreferrer"
                    className="text-primary underline underline-offset-4 hover:opacity-90"
                  />
                ),
              }}
            >
              {assistantContent}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}
