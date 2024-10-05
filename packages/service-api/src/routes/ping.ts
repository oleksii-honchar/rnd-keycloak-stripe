import crypto from 'crypto';
import { FastifyReply, FastifyRequest, RouteOptions } from 'fastify';

const schema = {
  description: 'Get the ping route',
  tags: ['ping'],
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
  return reply.code(200).send({ message: `pong ${crypto.randomUUID()}` });
};

export const pingRoute: RouteOptions = {
  method: 'GET',
  url: '/api/ping',
  handler: routeHandler,
  schema,
};
