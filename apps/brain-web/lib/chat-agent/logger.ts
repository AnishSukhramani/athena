type LogLevel = 'info' | 'warn' | 'error';

function write(level: LogLevel, requestId: string, event: string, meta?: Record<string, unknown>) {
  const payload = {
    scope: 'chat-agent',
    level,
    requestId,
    event,
    ...(meta || {}),
  };

  if (level === 'error') console.error(payload);
  else if (level === 'warn') console.warn(payload);
  else console.info(payload);
}

export const chatAgentLogger = {
  info(requestId: string, event: string, meta?: Record<string, unknown>) {
    write('info', requestId, event, meta);
  },
  warn(requestId: string, event: string, meta?: Record<string, unknown>) {
    write('warn', requestId, event, meta);
  },
  error(requestId: string, event: string, meta?: Record<string, unknown>) {
    write('error', requestId, event, meta);
  },
};
