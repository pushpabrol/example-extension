import { Router as router } from 'express';
import { middlewares } from 'auth0-extension-express-tools';

import config from '../lib/config';
import logger from '../lib/logger';

import riskRule from '../rules/risk';

export default () => {
  const hookValidator = middlewares
    .validateHookToken(config('AUTH0_DOMAIN'), config('WT_URL'), config('EXTENSION_SECRET'));

  const hooks = router();
  hooks.use('/on-uninstall', hookValidator('/.extensions/on-uninstall'));
  hooks.use('/on-install', hookValidator('/.extensions/on-install'));

  hooks.use(middlewares.managementApiClient({
    domain: config('AUTH0_DOMAIN'),
    clientId: config('AUTH0_CLIENT_ID'),
    clientSecret: config('AUTH0_CLIENT_SECRET')
  }));

  hooks.post('/on-install', function(req, res) {
    logger.debug('Install running...');

    logger.debug(riskRule());
    req.auth0.rules.create({
      name: 'risk-threshold-rule',
      script: riskRule(),
      order: 5000,
      enabled: true,
      stage: "login_success"
    })
      .then(function() {
        logger.debug("here2");
        res.sendStatus(204);
      })
      .catch(function(error) {
        logger.debug(error);
        res.sendStatus(500);
      });
  });

  // hooks being used to perform some additional actions during process of installation, updating or removing the extension.
  // most of the extensions are using personal clients for accessing management api
  // those clients are created automatically by the extensions gallery
  // but to remove such client we have to use `on-uninstall` hook
  // there are three types of hooks: `on-install`, `on-update` and `on-uninstall`
  hooks.delete('/on-uninstall', (req, res) => {
    logger.debug('Uninstall running...');

  });
  return hooks;
};
