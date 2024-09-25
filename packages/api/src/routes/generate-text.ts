import {
  FastifyReply,
  FastifyRequest,
  RouteHandler,
  RouteHandlerMethod,
  RouteOptions,
} from 'fastify';

const schema = {
  description: 'Generate text',
  tags: ['generate-text'],
  body: {
    type: 'object',
    properties: {
      prompt: { type: 'string' },
      model: { type: 'string' },
    },
  },
  response: {
    200: {
      description: 'Successful response',
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
    },
  },
};

interface GenerateTextRoute {
  Body: { prompt: string; model: string };
}

const routeHandler: RouteHandler<GenerateTextRoute> = async function (
  request: FastifyRequest<GenerateTextRoute>,
  reply: FastifyReply,
) {
  const { prompt, model } = request.body as { prompt: string; model: string };
  const { aiService } = request.server;
  const response = await aiService.generateText(prompt, { model });
  return reply.code(200).send(response);
};

export const generateTextRoute: RouteOptions = {
  method: 'POST',
  url: '/api/generate-text',
  handler: routeHandler as RouteHandlerMethod,
  schema,
};
