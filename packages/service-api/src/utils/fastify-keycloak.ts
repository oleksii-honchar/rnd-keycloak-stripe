import axios from 'axios';
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import fp from 'fastify-plugin';
import qs from 'querystring';

import { UnauthorizedError } from './errors';

interface KeycloakOptions {
  realm: string;
  authServerUrl: string;
  clientId: string;
  clientSecret: string;
}

declare module 'fastify' {
  interface FastifyInstance {
    authenticate: () => (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
  }
}

const fastifyKeycloak = (
  fastify: FastifyInstance,
  options: KeycloakOptions,
  done: (err?: Error) => void,
) => {
  const logger = fastify.log.child({ module: 'keycloak-adapter' });

  const introspectionUrl = new URL(
    `${options.authServerUrl}/realms/${options.realm}/protocol/openid-connect/token/introspect`,
  );

  fastify.decorate('authenticate', () => {
    return async (request: FastifyRequest) => {
      const authHeader = request.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthorizedError('No token provided');
      }

      const token = authHeader.split(' ')[1];

      if (!token) {
        throw new UnauthorizedError('Token can`t be empty');
      }

      try {
        logger.debug({ token }, 'Introspecting token');
        const response = await axios.post(
          introspectionUrl.toString(),
          qs.stringify({
            token,
            client_id: options.clientId,
            client_secret: options.clientSecret,
          }),
          {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          },
        );

        const introspectionResult = response.data;

        if (!introspectionResult.active) {
          throw new UnauthorizedError('Token is not active');
        }

        // Token is valid, you can add additional checks here if needed
        // For example, checking specific roles or permissions

        // Optionally, you can attach the introspection result to the request
        // for use in subsequent handlers
        // request.user = introspectionResult;
      } catch (error) {
        logger.error('Authentication error:', error);
        throw new UnauthorizedError('Authentication error', error);
      }
    };
  });
  done();
};

export default fp(fastifyKeycloak, {
  name: 'fastify-keycloak',
});
