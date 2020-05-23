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

  logger.debug("config....");
  logger.debug(config('AUTH0_DOMAIN'));

  app.use('/api', api(storage));
  app.use('/meta', meta());
  app.use('/.extensions', hooks());

  app.get('*', htmlRoute());

  // Generic error handler.
  app.use(middlewares.errorHandler(logger.error.bind(logger)));
  return app;
};
