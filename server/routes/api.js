import { Router } from 'express';
import { middlewares } from 'auth0-extension-express-tools';

import config from '../lib/config';
import logger from '../lib/logger';

export default (storage) => {
  // management api client initialization
  logger.debug("In api...");
  logger.debug(config('AUTH0_DOMAIN'));
  logger.debug(config('AUTH0_CLIENT_ID'));
  logger.debug(config('AUTH0_CLIENT_SECRET'));
  const managementApiClient = middlewares.managementApiClient({
    domain: config('AUTH0_DOMAIN'),
    clientId: config('AUTH0_CLIENT_ID'),
    clientSecret: config('AUTH0_CLIENT_SECRET')
  });

  const api = Router();

  // Allow end users to authenticate. End users authorization implemented in `/client/actions/auth.js`
  api.use(middlewares.authenticateUsers.optional({
    domain: config('AUTH0_DOMAIN'),
    audience: 'urn:example-extension',
    credentialsRequired: false,
    onLoginSuccess: (req, res, next) => {
      // you can modify `req.user` object here
      return next();
    }
  }));

  // Allow dashboard admins to authenticate.
  api.use(middlewares.authenticateAdmins.optional({
    credentialsRequired: false,
    secret: config('EXTENSION_SECRET'),
    audience: 'urn:example-extension',
    baseUrl: config('PUBLIC_WT_URL'),
    onLoginSuccess: (req, res, next) => {
      // you can modify `req.user` object here
      return next();
    }
  }));

  // using managementApiClient middleware when needed
  api.get('/clients', managementApiClient, (req, res, next) => {
    req.auth0.clients.getAll()
      .then(result => res.json(result))
      .catch(err => next(err));
  });

  api.get('/settings', (req, res, next) => {
    storage.read()
      .then(result =>  { 
        logger.debug("Get settings...");

        res.json(result); 
      })
      .catch(err => next(err));
  });

  api.post('/settings', (req, res, next) => {
    logger.debug(req.body.settings);

    storage.read()
      .then(data => Object.assign({}, data, req.body.settings))
      .then(merged => storage.write(merged))
      .then(() => req.send(204))
      .catch(err => next(err));
  });

  return api;
}
