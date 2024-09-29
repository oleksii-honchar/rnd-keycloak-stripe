import { FastifyInstance } from 'fastify';

export const addResponseSchemas = (instance: FastifyInstance) => {
  instance.addSchema({
    $id: 'errorResponse',
    title: 'Error response',
    type: 'object',
    required: ['error', 'message', 'statusCode'],
    properties: {
      error: { type: 'string' },
      message: { type: 'string' },
      statusCode: { type: 'integer' },
    },
  });

  instance.addSchema({
    $id: 'createdResponse',
    title: 'Created response',
    description: 'Response for created resources',
    type: 'object',
    properties: {
      id: { type: 'string' },
    },
    required: ['id'],
  });

  instance.addSchema({
    $id: 'notFoundResponse',
    title: 'Not Found response',
    type: 'object',
    required: ['error', 'message', 'statusCode'],
    properties: {
      error: { type: 'string', const: 'Not Found' },
      statusCode: { type: 'integer', const: 404 },
      message: { type: 'string' },
    },
  });

  instance.addSchema({
    $id: 'badRequestResponse',
    title: 'Bad Request Response',
    description:
      'The service could not serve the request because of a client side related error',
    type: 'object',
    required: ['error', 'message', 'statusCode'],
    properties: {
      error: { type: 'string', const: 'Bad Request' },
      statusCode: { type: 'integer', const: 400 },
      message: { type: 'string' },
    },
  });

  instance.addSchema({
    $id: 'notAuthorizedResponse',
    title: 'Not Authorized Response',
    description: 'Response for not authenticated users',
    type: 'object',
    required: ['error', 'message', 'statusCode'],
    properties: {
      error: {
        type: 'string',
        const: 'Unauthorized',
      },
      message: {
        type: 'string',
        enum: ['auth_header_not_valid', 'auth_header_missed'],
      },
      statusCode: { type: 'integer', const: 401 },
    },
  });

  instance.addSchema({
    $id: 'forbiddenResponse',
    title: 'Forbidden Response',
    description: 'Response if user does not have all the requested rights',
    type: 'object',
    required: ['error', 'message', 'statusCode'],
    properties: {
      error: {
        type: 'string',
        const: 'Forbidden',
      },
      message: {
        type: 'string',
        enum: ['no_sufficient_rights'],
      },
      statusCode: { type: 'integer', const: 403 },
    },
  });

  return instance;
};
