 /*
 * This is the entry point of the extension
 */

const tools = require('auth0-extension-express-tools');

const expressApp = require('./server').default;
const logger = require('./server/lib/logger');

module.exports = tools.createServer((cfg, storage) => {
  logger.info('Starting Auth0 Example Extension - Version:', process.env.CLIENT_VERSION);
  return expressApp(cfg, storage);
});
