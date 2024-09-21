// Use "make check-realm" after "pnpm dev" to import realm if it doesn't exist
// Env vars will be provided by make
// This script will be able to access server if user:pwd = admin:admin (check docker-compose.yml)

import { readFileSync } from 'node:fs';
import { request } from 'http';
import pino from 'pino';

const logger = pino({ level: 'info', name: 'check-realm' });

import KcAdminClient from '@keycloak/keycloak-admin-client';

async function waitForKeycloak(baseUrl: string, maxAttempts = 12, delay = 5000): Promise<void> {
  const url = new URL('/admin/master/console/', baseUrl);

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    try {
      await new Promise<void>((resolve, reject) => {
        const req = request(url, (res) => {
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
    } catch (error) {
      logger.info('Waiting for Keycloak to start...');
    }
    await new Promise(resolve => setTimeout(resolve, delay));
  }
  throw new Error('Keycloak did not become available in time');
}

const baseUrl = process.env.KEYCLOAK_BASE_URL || 'http://localhost:8080';
await waitForKeycloak(baseUrl);

const config = {
  token: {
    baseUrl,
    username: 'olho',
    password: 'olho',
    grant_type: 'password',
    client_id: 'react-app',
    realmName: 'rnd',
  },
  adminClient: {
    baseUrl,
    realmName: 'master',
    username: 'admin',
    password: 'admin',
    grantType: 'password',
    clientId: 'admin-cli',
  },
};

const realmConfig = JSON.parse(readFileSync(new URL('./rnd-realm.json', import.meta.url), 'utf8'));
// since SMTP-HOST stored globbaly in the system with port ¯\(ツ)/¯
const smtpHost = process.env.SMTP_HOST ? process.env.SMTP_HOST.split(':')[0] : '';

// updating config with sensitive info
realmConfig.smtpServer.host = smtpHost;
realmConfig.smtpServer.user = process.env.SMTP_USER;
realmConfig.smtpServer.password = process.env.SMTP_PASSWORD;
realmConfig.smtpServer.replyTo = process.env.SMTP_REPLY_TO;
realmConfig.smtpServer.from = process.env.SMTP_REPLY_TO;
realmConfig.users[1].email = process.env.ADMIN_EMAIL;
realmConfig.attributes['frontendUrl'] = process.env.KEYCLOAK_FRONTEND_URL;

const adminClient = new KcAdminClient(config.adminClient);
await adminClient.auth(config.adminClient);

// creating realm
await adminClient.realms.create(realmConfig);

// Update admin email
const users = await adminClient.users.find({ realm: config.adminClient.realmName });
const adminUser = users.find(user => user.username === 'admin');
if (adminUser) {
  await adminClient.users.update(
    { id: adminUser.id, realm: config.adminClient.realmName },
    { email: process.env.KEYCLOAK_ADMIN_EMAIL || 'default_admin@example.com' }
  );

  await adminClient.users.resetPassword({
    id: adminUser.id,
    realm: config.adminClient.realmName,
    credential: {
      type: 'password',
      value: process.env.KEYCLOAK_ADMIN_PASSWORD || 'default_password',
      temporary: false,
    }
  });
}
logger.info(`Realm ${realmConfig.realm} created successfully.`);

logger.info('Updating master realm frontendUrl...');
const masterRealm = await adminClient.realms.find({ realm: 'master' });
if (masterRealm) {
  await adminClient.realms.update(
    { realm: 'master' },
    { attributes: { 'frontendUrl': process.env.KEYCLOAK_FRONTEND_URL } }
  );
}
logger.info('Master realm frontendUrl updated successfully.');
process.exit(0);
