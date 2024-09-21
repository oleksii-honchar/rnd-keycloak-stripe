# rnd-keycloak-stripe

## How to start

Keycloak configured to use domain as frontend URL, so you need to use nginx-reverse-proxy for proper HTTPS forwarding.
The best and easiest way to do it is to add keycloak service to olho.link(nginx-reverse-proxy project) like this:

On localhost:

```text
# /etc/hosts
<nrp-host-ip> <SVC3_DOMAIN>
```

On nrp host:

```yaml
# nrp.yaml
services:
- name: keycloak-dev
  serviceIp: $SVC3_IP
  servicePort: $SVC3_PORT
  domainName: $SVC3_DOMAIN
  domainRegistrant: route53  
```

Set SVC3_IP to local host IP
Restart nrp, so it's ready to forward keycloak domain requests.

Now you can start the current project on local host:

```bash
pnpm i
pnpm dev # start the keycloak , api and web-app
```
