import crypto from 'crypto';
import { FastifyInstance, FastifyReply, FastifyRequest, RouteOptions } from 'fastify';

import { pingResponseSchema } from 'src/types';

const schema = {
  description: 'Get the ping route',
  tags: ['ping'],
  response: {
    200: {
      description: 'Successful ping response',
      ...pingResponseSchema,
    },
  },
};

const routeHandler = async (_request: FastifyRequest, reply: FastifyReply) => {
  return reply.code(200).send({ message: `pong ${crypto.randomUUID()}` });
};

export const getPingRoute = (server: FastifyInstance): RouteOptions => ({
  method: 'GET',
  url: '/api/ping',
  handler: routeHandler,
  preHandler: server.authenticate(),
  schema,
});
