import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import fp from 'fastify-plugin';
import jwt from 'jsonwebtoken';
import { UnauthorizedError } from './errors';

interface KeycloakOptions {
  realm: string;
  authServerUrl: string;
  clientId: string;
  clientSecret: string;
}

interface DecodedToken {
  exp: number;
  [key: string]: unknown;
}

declare module 'fastify' {
  interface FastifyInstance {
    authenticate: () => (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
  }
}

async function verifyToken(token: string, publicKey: string): Promise<DecodedToken> {
  return new Promise((resolve, reject) => {
    jwt.verify(token, publicKey, { algorithms: ['RS256'] }, (err, decoded) => {
      if (err) reject(err);
      else resolve(decoded as DecodedToken);
    });
  });
}

function fastifyKeycloak(
  fastify: FastifyInstance,
  options: KeycloakOptions,
  done: (error?: Error) => void,
) {
  let publicKey: string;
  const logger = fastify.log.child({ module: 'keycloak-adapter' });

  const url = `${options.authServerUrl}/realms/${options.realm}/protocol/openid-connect/certs`;
  logger.debug({ url }, 'Fetching public key from Keycloak');
  fetch(url)
    .then(response => response.json())
    .then(data => {
      publicKey = `-----BEGIN PUBLIC KEY-----\n${data.keys[0].x5c[0]}\n-----END PUBLIC KEY-----`;
    })
    .catch(error => {
      logger.error('Failed to fetch public key:', error);
      done(error);
    });

  fastify.decorate('authenticate', () => {
    return async (request: FastifyRequest, reply: FastifyReply) => {
      const authHeader = request.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthorizedError('No token provided');
      }

      logger.debug({ authHeader }, 'Looking for token');

      const token = authHeader.split(' ')[1];

      if (!token) {
        throw new UnauthorizedError('Token can`t be empty');
      }

      try {
        logger.debug({ token }, 'Verifying token');
        const decoded = await verifyToken(token, publicKey);

        // Check if token is about to expire (e.g., in less than 5 minutes)
        const now = Math.floor(Date.now() / 1000);
        if (decoded.exp - now < 300) {
          logger.debug({ token }, 'Refreshing token');
          const response = await fetch(
            `${options.authServerUrl}/realms/${options.realm}/protocol/openid-connect/token`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
              body: new URLSearchParams({
                grant_type: 'refresh_token',
                client_id: options.clientId,
                client_secret: options.clientSecret,
                refresh_token: token,
              }),
            },
          );

          if (response.ok) {
            logger.debug({ response }, 'Refreshed token');
            const data = await response.json();
            reply.header('Authorization', `Bearer ${data.access_token}`);
          } else {
            logger.error('Failed to refresh token:', await response.text());
          }
        }

        // Token is valid, continue to the route handler
      } catch (error) {
        throw new UnauthorizedError('Authentication error', error);
      }
    };
  });

  done();
}

export default fp(fastifyKeycloak, {
  name: 'fastify-keycloak',
});
