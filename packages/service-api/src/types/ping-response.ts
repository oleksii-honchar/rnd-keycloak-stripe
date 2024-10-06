import { Static, Type } from '@sinclair/typebox';

export const pingResponseSchema = Type.Object({
  message: Type.String(),
});

export type PingResponse = Static<typeof pingResponseSchema>;
