import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import config from 'config';
import { FastifyInstance } from 'fastify';
import pino from 'pino';

import pkg from 'package.json';

const logger = pino({
  name: 'withSwagger',
});

export function withSwagger(server: FastifyInstance): FastifyInstance {
  const runtimePort = config.get<number>('runtime.port');
  const apiHost = config.get<string>('runtime.host');
  const apiUrl = `${apiHost}:${runtimePort}`;

  logger.info({ apiUrl }, 'Registering Swagger');

  server.register(swagger, {
    openapi: {
      openapi: '3.0.0',
      info: {
        title: pkg.name,
        description: 'testing the fastify swagger api',
        version: pkg.version,
      },
      servers: [
        {
          url: apiUrl,
          description: `Service API [${config.get<string>('runtime.environment')}]`,
        },
      ],
      components: {
        securitySchemes: {
          apiKey: {
            type: 'apiKey',
            name: 'apiKey',
            in: 'header',
          },
        },
      },
    },
  });

  logger.info('Registering Swagger UI');
  server.register(swaggerUi, {
    routePrefix: '/api/docs',
    uiConfig: {
      docExpansion: 'list',
      deepLinking: false,
    },
    uiHooks: {
      onRequest: function (_request, _reply, next) {
        next();
      },
      preHandler: function (_request, _reply, next) {
        next();
      },
    },
    staticCSP: true,
    transformStaticCSP: header => header,
    transformSpecification: swaggerObject => {
      return swaggerObject;
    },
    transformSpecificationClone: true,
  });

  server.ready(() => {
    logger.info('Generating Swagger JSON');
    server.swagger();
  });

  return server;
}
