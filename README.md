# Auth0 Example Extension

## Running in Production

```bash
npm install
npm run client:build
npm run serve:prod
```

## Running in Development

To run the extension:

```bash
npm install
npm run build
npm run serve:dev
```

### Configuration

Create the configuration file under `./server/config.json`:

```json
{
  "EXTENSION_CLIENT_ID": "SPA_CLIENT_ID",
  "EXTENSION_SECRET": "Random Secret",
  "WT_URL": "http://localhost:3001",
  "PUBLIC_WT_URL": "http://localhost:3001",
  "AUTH0_RTA": "https://auth0.auth0.com",
  "AUTH0_DOMAIN": "{tenant-name.region}.auth0.com",
  "AUTH0_CLIENT_ID": "GENERIC_CLIENT_ID",
  "AUTH0_CLIENT_SECRET": "GENERIC_CLIENT_SECRET"
}
```

As you can see, there are 2 clients involved here.

**Management API Client**


Relevant properties for this section: `AUTH0_CLIENT_ID` and `AUTH0_CLIENT_SECRET`

This client will be used to interact with the Management API (eg: load users, ....).


**Client for End Users**

Relevant properties for this section: `EXTENSION_CLIENT_ID`.

This extension allows end users to login, not dashboard administrators. This means that we need to secure this extension in the same way that we secure other applications in Auth0.

 1. Create a "Single Page Application" in Clients
 2. Put `http://localhost:3000/login` as an `Allowed Callback URL`.
 3. Add the Client ID to the `EXTENSION_CLIENT_ID` setting.
 4. Choose a connection (eg: DB connection) and only enable that one in your Client (Connections tab).
