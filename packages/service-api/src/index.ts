import config from 'config';
import fastify, { FastifyInstance } from 'fastify';
import pino from 'pino';

import pkg from 'package.json';

import { indexRoute } from 'src/routes';
import { withSwagger } from 'src/utils/withSwagger';
import { AiServiceContext } from './ai-providers';
import { AiProviderType } from './ai-providers/types';
import { generateTextRoute } from './routes/generate-text';
import { pingRoute } from './routes/ping';
import { errorHandler } from './utils/error-handler';

const name = `${pkg.name}@${pkg.version}`;
const logger = pino({
  name,
});
logger.info('Starting app');

const server: FastifyInstance = fastify({
  logger: {
    name,
  },
});

const runtimePort = config.get<number>('runtime.port');
const runtimeEnvironment = config.get<string>('runtime.environment');
const defaultAiProvider = config.get<string>('ai-providers.default');

declare module 'fastify' {
  interface FastifyInstance {
    aiService: AiServiceContext;
  }
}

const aiService = new AiServiceContext(defaultAiProvider as AiProviderType, { logger });
server.decorate('aiService', aiService);

// Conditionally attach Swagger if not in production
if (runtimeEnvironment !== 'production') {
  withSwagger(server);
}

// Routes should be registered BEFORE swagger initialization
server.register((app, options, done) => {
  server.route(indexRoute);
  server.route(pingRoute);
  server.route(generateTextRoute);
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
    port: runtimePort, // Use runtimePort here
    host: '0.0.0.0',
  },
  err => {
    if (err) {
      server.log.error(err);
      throw err;
    }
  },
);
