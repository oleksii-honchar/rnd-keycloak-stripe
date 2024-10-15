import axios from 'axios';
import crypto from 'crypto';
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import fp from 'fastify-plugin';
import jwt from 'jsonwebtoken';

import { UnauthorizedError } from './errors';

interface KeycloakOptions {
  realm: string;
  authServerUrl: string;
}

declare module 'fastify' {
  interface FastifyInstance {
    authenticate: () => (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
  }
  interface FastifyRequest {
    user?: jwt.JwtPayload | string;
  }
}

const fastifyKeycloak = (
  fastify: FastifyInstance,
  options: KeycloakOptions,
  done: (err?: Error) => void,
) => {
  const logger = fastify.log.child({ module: 'keycloak-adapter' });

  let publicKey: string;

  const fetchPublicKey = async () => {
    const keysUrl = `${options.authServerUrl}/realms/${options.realm}/protocol/openid-connect/certs`;
    logger.debug({ keysUrl }, 'Fetching public key');
    const response = await axios.get(keysUrl);
    const rs256Key = response.data.keys.find(
      (key: Record<string, string>) => key.alg === 'RS256',
    );
    if (!rs256Key) {
      throw new Error('No RS256 key found in Keycloak certs');
    }

    const modulus = Buffer.from(rs256Key.n, 'base64url');
    const exponent = Buffer.from(rs256Key.e, 'base64url');

    const publicKeyObject = crypto.createPublicKey({
      key: {
        kty: 'RSA',
        n: modulus.toString('base64'),
        e: exponent.toString('base64'),
      },
      format: 'jwk',
    });

    publicKey = publicKeyObject.export({ type: 'spki', format: 'pem' }).toString();
    logger.debug({ publicKey }, 'Public key fetched and converted to PEM');
  };

  fetchPublicKey();
  setInterval(fetchPublicKey, 1000 * 60 * 60); // 1 hour

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
        if (!publicKey) {
          await fetchPublicKey();
        }

        logger.debug('Verifying token');
        const decoded = jwt.verify(token, publicKey, { algorithms: ['RS256'] });
        logger.debug({ decoded }, 'Token verified');

        request.user = decoded;
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
