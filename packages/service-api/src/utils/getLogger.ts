import pino from 'pino';

export type Logger = pino.Logger;

export function getLogger(name: string): Logger {
  const base = pino({
    name,
  });

  return base.child({ name });
}
