import { Type } from '@sinclair/typebox';

export const ChatCompletionResponseSchema = Type.Object({
  id: Type.String(),
  object: Type.Literal('chat.completion'),
  created: Type.Integer(),
  model: Type.String(),
  choices: Type.Array(
    Type.Object({
      index: Type.Integer(),
      message: Type.Object({
        role: Type.String(),
        content: Type.String(),
        refusal: Type.Union([Type.String(), Type.Null()]),
      }),
      logprobs: Type.Union([Type.Object({}), Type.Null()]),
      finish_reason: Type.String(),
    }),
  ),
  usage: Type.Object({
    prompt_tokens: Type.Integer(),
    completion_tokens: Type.Integer(),
    total_tokens: Type.Integer(),
    completion_tokens_details: Type.Object({
      reasoning_tokens: Type.Integer(),
    }),
  }),
  system_fingerprint: Type.String(),
});
