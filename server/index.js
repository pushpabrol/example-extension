import path from 'path';
import Express from 'express';
import * as tools from 'auth0-extension-tools';
import { middlewares, routes } from 'auth0-extension-express-tools';

import api from './routes/api';
import hooks from './routes/hooks';
import meta from './routes/meta';
import htmlRoute from './routes/html';
import config from './lib/config';
import logger from './lib/logger';

export default function (cfg, storageProvider) {
  // config initialization
  config.setProvider(cfg);

  // storage initialization
  const storage = storageProvider
    // use webtask storage if possible
    ? new tools.WebtaskStorageContext(storageProvider)
    // use local file storage if webtask storage unavailable
    : new tools.FileStorageContext(path.join(__dirname, './data.json'));

  const app = new Express();

  // dashboardAdmins route allows login with dashboard admin credentials
  app.use(routes.dashboardAdmins({
    secret: config('EXTENSION_SECRET'),
    audience: 'urn:example-extension',
    rta: config('AUTH0_RTA').replace('https://', ''),
    domain: config('AUTH0_DOMAIN'),
    baseUrl: config('PUBLIC_WT_URL'),
    webtaskUrl: config('PUBLIC_WT_URL'),
    clientName: 'Example Extension',
    sessionStorageKey: 'example-extension:apiToken',
    // whether or not request access token. if access token is requested, it'll be used to access management api
    // otherwise the client credentials will be used
    noAccessToken: true,
    // usually `/login` is for end-users and `/admins/login` - for dashboard admins
    urlPrefix: '/admins',
    // requested scopes for access token. matters not if `noAccessToken` set to true
    scopes: 'read:users'
  }));

  app.use('/api', api(storage));
  app.use('/app', Express.static(path.join(__dirname, '../dist')));
  app.use('/meta', meta());
  app.use('/.extensions', hooks());

  // Fallback to rendering HTML.
  app.get('*', htmlRoute());

  // Generic error handler.
  app.use(middlewares.errorHandler(logger.error.bind(logger)));
  return app;
};
