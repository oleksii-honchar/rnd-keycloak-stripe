import cors from '@fastify/cors';
import config from 'config';
import fastify, { FastifyInstance } from 'fastify';
import pino from 'pino';

import pkg from 'package.json';

import { getIndexRoute } from 'src/routes';
import { withSwagger } from 'src/utils/withSwagger';
import { AiServiceContext } from './ai-providers';
import { AiProviderType } from './ai-providers/types';
import { getChatCompletionRoute } from './routes/chat-complition';
import { getPingRoute } from './routes/ping';
import { errorHandler } from './utils/error-handler';
import fastifyKeycloak from './utils/fastify-keycloak';
import { addResponseSchemas } from './utils/fastify-response-schemas';
import { Logger } from './utils/getLogger';

const runtimePort = config.get<number>('runtime.port');
const runtimeEnvironment = config.get<string>('runtime.environment');
const defaultAiProvider = config.get<string>('ai-providers.default');

const name = `${pkg.name}@${pkg.version}`;
const logger = pino({
  name,
});
logger.info('Starting app');

const server: FastifyInstance = fastify({
  logger: {
    name,
    level: config.get<string>('runtime.logLevel'),
  },
});

server.register(cors, {
  origin: [config.get<string>('api-urls.web-app')],
});

server.register(fastifyKeycloak, {
  realm: config.get<string>('keycloak.realm'),
  authServerUrl: config.get<string>('keycloak.authServerUrl'),
  clientId: config.get<string>('keycloak.clientId'),
  clientSecret: config.get<string>('keycloak.clientSecret'),
});

addResponseSchemas(server);

declare module 'fastify' {
  interface FastifyInstance {
    aiService: AiServiceContext;
  }
}

const aiService = new AiServiceContext(defaultAiProvider as AiProviderType, {
  logger: server.log as Logger,
});
server.decorate('aiService', aiService);

// Conditionally attach Swagger if not in production
if (runtimeEnvironment !== 'production') {
  withSwagger(server);
}

// Routes should be registered BEFORE swagger initialization
server.register((_app, _options, done) => {
  server.route(getIndexRoute(server));
  server.route(getPingRoute(server));
  server.route(getChatCompletionRoute(server));
  done();
});

server.addHook('onSend', (_request, reply, _payload, done) => {
  reply.header('X-App-Name', pkg.name);
  reply.header('X-App-Version', pkg.version);
  done();
});

server.setErrorHandler(errorHandler);

server.listen(
  {
    port: runtimePort,
    host: '0.0.0.0',
  },
  err => {
    if (err) {
      server.log.error(err);
      throw err;
    }
  },
);
