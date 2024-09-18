import { readFileSync } from 'node:fs';

import KcAdminClient from '@keycloak/keycloak-admin-client';

const baseUrl = 'http://127.0.0.1:8100';

const config = {
  baseUrl: baseUrl,
  token: {
    username: 'olho',
    password: 'olho',
    grant_type: 'password',
    client_id: 'react-app',
    realmName: 'rnd',
  },
  adminClient: {
    baseUrl: baseUrl,
    realmName: 'master',
    username: 'admin',
    password: 'admin',
    grantType: 'password',
    clientId: 'admin-cli',
  },
};

const adminClient = new KcAdminClient(config.adminClient);
await adminClient.auth(config.adminClient);

await adminClient.realms.create(
  JSON.parse(readFileSync(new URL('./rnd-realm.json', import.meta.url), 'utf8')),
);
