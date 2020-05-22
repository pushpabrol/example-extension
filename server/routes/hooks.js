import { Router as router } from 'express';
import { middlewares } from 'auth0-extension-express-tools';

import config from '../lib/config';
import logger from '../lib/logger';

export default () => {
  const hookValidator = middlewares
    .validateHookToken(config('AUTH0_DOMAIN'), config('WT_URL'), config('EXTENSION_SECRET'));

  const hooks = router();
  hooks.use('/on-uninstall', hookValidator('/.extensions/on-uninstall'));
  hooks.use(middlewares.managementApiClient({
    domain: config('AUTH0_DOMAIN'),
    clientId: config('AUTH0_CLIENT_ID'),
    clientSecret: config('AUTH0_CLIENT_SECRET')
  }));

  // hooks being used to perform some additional actions during process of installation, updating or removing the extension.
  // most of the extensions are using personal clients for accessing management api
  // those clients are created automatically by the extensions gallery
  // but to remove such client we have to use `on-uninstall` hook
  // there are three types of hooks: `on-install`, `on-update` and `on-uninstall`
  hooks.delete('/on-uninstall', (req, res) => {
    logger.debug('Uninstall running...');
    req.auth0.clients.delete({ client_id: config('AUTH0_CLIENT_ID') })
      .then(() => {
        logger.debug(`Deleted client: ${config('AUTH0_CLIENT_ID')}`);
        res.sendStatus(204);
      })
      .catch((err) => {
        logger.debug(`Error deleting client: ${config('AUTH0_CLIENT_ID')}`);
        logger.error(err);

        // even if deleting fails, we need to be able to uninstall the extension.
        res.sendStatus(204);
      });
  });
  return hooks;
};
