import path from 'path';
import Express from 'express';
import { middlewares, routes } from 'auth0-extension-express-tools';
import hooks from './routes/hooks';
import meta from './routes/meta';
import config from './lib/config';
import logger from './lib/logger';

export default function (cfg, storageProvider) {
  // config initialization
  config.setProvider(cfg);
  const app = new Express();

  logger.debug("config....");
  logger.debug(config('AUTH0_DOMAIN'));

  app.use('/meta', meta());
  app.use('/.extensions', hooks());

  // Generic error handler.
  app.use(middlewares.errorHandler(logger.error.bind(logger)));
  return app;
};
