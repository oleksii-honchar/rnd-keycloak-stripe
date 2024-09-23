import config from 'config';
import fastify, { FastifyInstance } from 'fastify';
import pino from 'pino';

import pkg from 'package.json';

import { withSwagger } from 'src/lib/withSwagger';
import { getIndexRoute } from 'src/routes/get-index';
import { getPingRoute } from './routes/get-ping';

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

// Conditionally attach Swagger if not in production
if (runtimeEnvironment !== 'production') {
  withSwagger(server);
}

// Routes should be registered BEFORE swagger initialization
server.register((app, options, done) => {
  server.route(getIndexRoute);
  server.route(getPingRoute);
  done();
});

server.addHook('onSend', (_request, reply, _payload, done) => {
  reply.header('X-App-Name', pkg.name);
  reply.header('X-App-Version', pkg.version);
  done();
});

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
