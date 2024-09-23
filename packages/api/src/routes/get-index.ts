import { FastifyReply, FastifyRequest, RouteOptions } from 'fastify';

const schema = {
  description: 'Get the index route',
  tags: ['index'],
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

const routeHandler = async (_request: FastifyRequest, reply: FastifyReply) => {
  return reply.code(200).send({ message: 'Hello, world!' });
};

export const getIndexRoute: RouteOptions = {
  method: 'GET',
  url: '/',
  handler: routeHandler,
  schema,
};
