# History

## 18.11.2024

### Goal

- In order to proceed with Kaer project I need to select IAM solution first

"Identity and Access Management" (IAM) functional requirements:

- social sign-in & sign-up
- role-based access control
- multiple organisation support, new user by default assigned to the new org, or added to existing one
- multiple application keys per organisation support - one can have an application API key to validate app access to other components (CRM)
- M2M support for applications
- MFA support for users
- user JWT token auto-renew
- SDK for integrating with Fastify

### IAM NFRs:

- self-hosted and scalable
- comprehensive admin UI

### Action plan

- Create rnd-keycloak-stripe testing app
- make basic IAM operations working using keycloak
- connect to stripe payments
- make rate based payment plan

### Deployment Context

My React web app is accessible via a domain hosted on AWS Route 53 using HTTPS. The domain has an "A" record that dynamically points to my home's private IP address. Although I don’t have a static public IP address, I’ve set up a mechanism to update it every time my IP changes. I have a reverse proxy Nginx server listening on my local host, exposing ports 80 and 443 to the router and, consequently, to the world. Nginx has an HTTPS forwarding rule to restrict HTTP access. It proxies requests from my web app domain to the web app Docker container within the same network as the Nginx server. Each service runs as a Docker container using Docker Compose. Nginx config built on a fly using static yaml configuration to describe available services and their configuration including connected domains. SSL certificates updated manually by small cli tool using Let's Encrypt. In additonal to web-app I have fastify server API that is accessible via separate subdomain and started on my home server.

### Component Context

I'm developing a React web app paired with a Fastify-based service API to offer some paid functionality to users. Since it's unsafe to store keys and other sensitive information directly in the web app, I'm using OpenID Connect (via Keycloak) for identity and access management (IAM), and the service API to manage paid features. For instance, I'll use the OpenAI service to generate content for users. While users will be paying through Stripe, handling the payments is out of scope for now.

## 24.6.2025

- Where am I 🙈 ? Let's check the readme about how to start project.
- So, I removed CG-NAT issue, HTTPS certificates retreived successfully and local apps accessible from internet
- Update keycloack client, but still wrestling to have access to it.
