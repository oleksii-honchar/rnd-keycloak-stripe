import { Type } from '@sinclair/typebox';

import {
  FastifyReply,
  FastifyRequest,
  RouteHandler,
  RouteHandlerMethod,
  RouteOptions,
} from 'fastify';
import { FastifyInstance } from 'fastify/types/instance';
import { chatCompletionResponseSchema } from 'src/types';

const schema = {
  description: 'Create a chat completion',
  tags: ['chat-completion'],
  body: Type.Object({
    prompt: Type.String(),
    model: Type.Optional(Type.String()),
  }),
  response: {
    200: {
      description: 'Successful chat completion response',
      ...chatCompletionResponseSchema,
    },
    400: { $ref: 'badRequestResponse#' },
    401: { $ref: 'notAuthorizedResponse#' },
    500: { $ref: 'errorResponse#' },
  },
};

interface ChatCompletionRoute {
  Body: { prompt: string; model?: string };
}

const routeHandler: RouteHandler<ChatCompletionRoute> = async function (
  request: FastifyRequest<ChatCompletionRoute>,
  reply: FastifyReply,
) {
  const { prompt, model } = request.body as { prompt: string; model: string };
  const { aiService } = request.server;
  const response = await aiService.generateText(prompt, { model });
  return reply.code(200).send(response);
};

export const getChatCompletionRoute = (server: FastifyInstance): RouteOptions => ({
  method: 'POST',
  url: '/api/chat-completion',
  handler: routeHandler as RouteHandlerMethod,
  preHandler: server.authenticate(),
  schema,
});
