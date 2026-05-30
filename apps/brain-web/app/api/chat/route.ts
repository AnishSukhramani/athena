import { NextResponse } from 'next/server';

import {
  chatRequestSchema,
  chatResponseSchema,
  runAgentTurn,
  toChatAgentError,
} from '@/lib/chat-agent';
import { chatAgentLogger } from '@/lib/chat-agent/logger';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const requestId = crypto.randomUUID();

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      {
        error: {
          code: 'invalid_json',
          message: 'Invalid JSON payload.',
          layer: 'api',
          requestId,
        },
      },
      { status: 400 }
    );
  }

  const parsed = chatRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: {
          code: 'invalid_request',
          message: parsed.error.message,
          layer: 'api',
          requestId,
        },
      },
      { status: 400 }
    );
  }

  try {
    const result = await runAgentTurn({
      requestId,
      message: parsed.data.message,
      session: parsed.data.session,
    });
    const response = chatResponseSchema.parse(result);
    return NextResponse.json(response);
  } catch (error) {
    const mapped = toChatAgentError(error, 'agent');
    chatAgentLogger.error(requestId, 'chat.request.failed', {
      code: mapped.code,
      layer: mapped.layer,
      message: mapped.message,
    });
    return NextResponse.json(
      {
        error: {
          code: mapped.code,
          message: mapped.message,
          layer: mapped.layer,
          requestId,
        },
      },
      { status: mapped.status }
    );
  }
}
