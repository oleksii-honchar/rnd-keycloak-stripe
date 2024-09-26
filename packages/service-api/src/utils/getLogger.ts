import pino from 'pino';

export function getLogger(name: string) {
  const base = pino({
    name,
  });

  return base.child({ name });
}
