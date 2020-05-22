import fs from 'fs';
import ejs from 'ejs';
import path from 'path';
import { urlHelpers } from 'auth0-extension-express-tools';

import config from '../lib/config';

export default () => {
  const template = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <title><%= config.TITLE %></title>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=Edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="shortcut icon" href="<%= assets.favIcon %>" />
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <link rel="stylesheet" type="text/css" href="https://cdn.auth0.com/styles/zocial.min.css" />
      <link rel="stylesheet" type="text/css" href="https://cdn.auth0.com/manage/v0.3.1672/css/index.min.css" />
      <link rel="stylesheet" type="text/css" href="https://cdn.auth0.com/styleguide/4.6.13/index.min.css" />
      <% if (assets.style) { %><link rel="stylesheet" type="text/css" href="/app/<%= assets.style %>" /><% } %>
      <% if (assets.version) { %><link rel="stylesheet" type="text/css" href="<%= assets.cdnPath %>/auth0-example-extension.ui.<%= assets.version %>.css" /><% } %>
    </head>
    <body>
      <div id="app"></div>
      <script src="https://cdn.auth0.com/js/auth0/9.8.2/auth0.min.js"></script>
      <script type="text/javascript" src="//cdn.auth0.com/manage/v0.3.1672/js/bundle.js"></script>
      <script type="text/javascript">window.config = <%- JSON.stringify(config) %>;</script>
      <% if (assets.vendors) { %><script type="text/javascript" src="/app/<%= assets.vendors %>"></script><% } %>
      <% if (assets.app) { %><script type="text/javascript" src="/app/<%= assets.app %>"></script><% } %>
      <% if (assets.version) { %>
      <script type="text/javascript" src="<%= assets.cdnPath %>/auth0-example-extension.ui.vendors.<%= assets.version %>.js"></script>
      <script type="text/javascript" src="<%= assets.cdnPath %>/auth0-example-extension.ui.<%= assets.version %>.js"></script>
      <% } %>
    </body>
    </html>
    `;

  return (req, res, next) => {
    if (req.url.indexOf('/api') === 0) {
      return next();
    }

    const basePath = urlHelpers.getBasePath(req);

    const settings = {
      AUTH0_DOMAIN: config('AUTH0_DOMAIN'),
      EXTENSION_CLIENT_ID: config('EXTENSION_CLIENT_ID'),
      BASE_URL: urlHelpers.getBaseUrl(req),
      BASE_PATH: basePath,
      USER: config('USERNAME'),
      TEAM: config('TEAM')
    };

    // Render from CDN.
    // `process.env.CLIENT_VERSION` variable sets up automatically on build process
    const clientVersion = process.env.CLIENT_VERSION;
    if (clientVersion) {
      const favIcon = config('FAVICON_PATH') || 'https://cdn.auth0.com/styleguide/4.6.13/lib/logos/img/favicon.png';
      const cdnPath = config('CDN_PATH') || '//cdn.auth0.com/extensions/auth0-example-extension/assets';

      return res.send(ejs.render(template, {
        config: settings,
        assets: {
          version: clientVersion,
          cdnPath: cdnPath,
          favIcon: favIcon
        }
      }));
    }

    // Render locally.
    // if no `process.env.CLIENT_VERSION` provided (when running locally), it'll try to load local assets
    // the extension is trying to load built assets from `/dist` directory
    // and if there are no assets prepared, it'll use bundle.js made by webpack dev server
    return fs.readFile(path.join(__dirname, '../../dist/manifest.json'), 'utf8', (err, manifest) => {
      const locals = {
        config: settings,
        assets: {
          app: 'bundle.js'
        }
      };

      if (!err && manifest) {
        locals.assets = {
          ...JSON.parse(manifest)
        };
      }

      // Render the HTML page.
      res.send(ejs.render(template, locals));
    });
  };
};
