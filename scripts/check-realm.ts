// Use "make check-realm" after "pnpm dev" to import realm if it doesn't exist
// Env vars will be provided by make
// This script will be able to access server if user:pwd = admin:admin (check docker-compose.yml)

import { request } from 'http';
import { readFileSync } from 'node:fs';
import pino from 'pino';

const logger = pino({ level: 'info', name: 'check-realm' });

import KcAdminClient from '@keycloak/keycloak-admin-client';
import type { Credentials } from '@keycloak/keycloak-admin-client/lib/utils/auth.d.ts';

async function waitForKeycloak(
  baseUrl: string,
  maxAttempts = 12,
  delay = 5000,
): Promise<void> {
  const url = new URL('/admin/master/console/', baseUrl);

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    try {
      await new Promise<void>((resolve, reject) => {
        const req = request(url, res => {
          if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) {
            logger.info('Keycloak is ready!');
            resolve();
          } else {
            reject(new Error(`HTTP status code: ${res.statusCode}`));
          }
        });
        req.on('error', reject);
        req.end();
      });
      return;
    } catch {
      logger.info('Waiting for Keycloak to start...');
    }
    await new Promise(resolve => setTimeout(resolve, delay));
  }
  throw new Error('Keycloak did not become available in time');
}

const baseUrl = process.env.KEYCLOAK_BASE_URL || 'http://localhost:8080';
await waitForKeycloak(baseUrl);

const adminClientConfig = {
  baseUrl,
  realmName: 'master',
  username: process.env.KEYCLOAK_ADMIN,
  password: process.env.KEYCLOAK_ADMIN_PASSWORD,
  grantType: 'password',
  clientId: 'admin-cli',
};

const rndRealmConfig = JSON.parse(
  readFileSync(new URL('./rnd-realm.json', import.meta.url), 'utf8'),
);
const masterRealmConfig = JSON.parse(
  readFileSync(new URL('./master-realm.json', import.meta.url), 'utf8'),
);

// since SMTP-HOST stored globbaly in the system with port ¯\(ツ)/¯
const smtpHost = process.env.SMTP_HOST ? process.env.SMTP_HOST.split(':')[0] : '';

// updating config with sensitive info
rndRealmConfig.smtpServer.host = smtpHost;
rndRealmConfig.smtpServer.user = process.env.SMTP_USER;
rndRealmConfig.smtpServer.password = process.env.SMTP_PASSWORD;
rndRealmConfig.smtpServer.replyTo = process.env.SMTP_REPLY_TO;
rndRealmConfig.smtpServer.from = process.env.SMTP_REPLY_TO;
rndRealmConfig.attributes['frontendUrl'] = process.env.KEYCLOAK_FRONTEND_URL;
rndRealmConfig.identityProviders[0].config.clientId = process.env.GCP_OAUTH_CLIENT_ID;
rndRealmConfig.identityProviders[0].config.clientSecret =
  process.env.GCP_OAUTH_CLIENT_SECRET;
// rndRealmConfig.clients[1].clientSecret = process.env.KEYCLOAK_SERVICE_SECRET;

masterRealmConfig.smtpServer.host = smtpHost;
masterRealmConfig.smtpServer.user = process.env.SMTP_USER;
masterRealmConfig.smtpServer.password = process.env.SMTP_PASSWORD;
masterRealmConfig.smtpServer.replyTo = process.env.SMTP_REPLY_TO;
masterRealmConfig.smtpServer.from = process.env.SMTP_REPLY_TO;
masterRealmConfig.attributes['frontendUrl'] = process.env.KEYCLOAK_FRONTEND_URL;

const adminClient = new KcAdminClient(adminClientConfig);
await adminClient.auth(adminClientConfig as Credentials);

// creating or updating 'rnd' realm
const existingRndRealm = await adminClient.realms.findOne({
  realm: rndRealmConfig.realm,
});

if (existingRndRealm) {
  logger.info(`Realm '${rndRealmConfig.realm}' already exists. Updating...`);
  await adminClient.realms.update({ realm: rndRealmConfig.realm }, rndRealmConfig);
  logger.info(`Realm '${rndRealmConfig.realm}' updated successfully.`);
} else {
  logger.info(`Creating realm '${rndRealmConfig.realm}'...`);
  await adminClient.realms.create(rndRealmConfig);
  logger.info(`Realm '${rndRealmConfig.realm}' created successfully.`);
}

// Update admin email
const users = await adminClient.users.find({ realm: adminClientConfig.realmName });
const adminUser = users.find(user => user.username === process.env.KEYCLOAK_ADMIN);

logger.info('Updating admin email ...');

if (adminUser) {
  await adminClient.users.update(
    // @ts-expect-error - adminUser.id is not defined
    { id: adminUser.id, realm: adminClientConfig.realmName },
    {
      email: process.env.KEYCLOAK_ADMIN_EMAIL || 'default_admin@example.com',
      emailVerified: true,
    },
  );
}

logger.info('Updating master realm ...');
const masterRealm = await adminClient.realms.findOne({ realm: 'master' });
if (masterRealm) {
  await adminClient.realms.update({ realm: 'master' }, masterRealmConfig);
}
logger.info('Master realm updated successfully.');
process.exit(0);
