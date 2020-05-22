"use strict";
module.exports=function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){var r=n(1),o=n(31).default,i=n(36);e.exports=r.createServer(function(e,t){return i.info("Starting Auth0 Example Extension - Version:","0.0.0"),o(e,t)})},function(e,t,n){const r=n(2),o=n(5),i=n(7),s=n(23);e.exports.createServer=r.createServer,e.exports.urlHelpers=o,e.exports.middlewares=i,e.exports.routes=s},function(e,t,n){const r=n(3),o=n(4);e.exports.createServer=function(e){const t=r.createServer(e);var n=null;return o.fromExpress(function(e,r){return n||(n=t(e.webtaskContext)),n(e,r)})}},function(e,t){e.exports=require("auth0-extension-tools@1.4.0")},function(e,t){e.exports=require("webtask-tools")},function(e,t,n){const r=n(6),o=3,i=2,s=1,a=/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g;e.exports.getBasePath=function(e){return t=e.originalUrl||"",n=e.path,(o=(o=r.parse(t).pathname||"").replace(n,"").replace(/^\/|\/$/g,"")).startsWith("/")||(o="/"+o),o.endsWith("/")||(o+="/"),o;var t,n,o},e.exports.getBaseUrl=function(e,t){var n=t;const o=r.parse(e.originalUrl||"").pathname||"";return r.format({protocol:n||"https",host:e.headers.host,pathname:o.replace(e.path,"").replace(/\/$/g,"")})},e.exports.getWebtaskUrl=function(e){const t=function(e){if(!e.container)return null;const t=e.container.replace(a,"\\$&"),n=e.jtn?e.jtn.replace(a,"\\$&"):"";if(e.url_format===s)return new RegExp("^/api/run/"+t+"/(?:"+n+"/?)?");if(e.url_format===i)return new RegExp("^/"+t+"/(?:"+n+"/?)?");if(e.url_format===o)return new RegExp("^/(?:"+n+"/?)?");throw new Error("Unsupported webtask URL format.")}(e.x_wt),n=e.url,c=e.url.replace(t,"/"),u=r.parse(c||"").pathname,l=e.x_wt&&e.x_wt.ectx&&e.x_wt.ectx.ISOLATED_DOMAIN||!1,d=r.parse(n||"").pathname||"";var p;if(l){p=r.format({protocol:"https",host:e.headers.host,pathname:d.replace(u,"").replace(/\/$/g,"")});const t=".it.auth0.com/api/run/"+e.x_wt.container+"/",n=function(e,t){if(!e)return null;const n=e.indexOf("sandbox8")>=0?"8":"";return"https://"+t+"."+(e.split(".it.auth0.com")[0].split("-")[1]||"us")+n+".webtask.io/"}(p,e.x_wt.container);p.indexOf(t)>=0&&(p=p.replace("https://"+e.headers.host+"/api/run/"+e.x_wt.container+"/",n))}else p=d;return p}},function(e,t){e.exports=require("url")},function(e,t,n){e.exports.authenticateAdmins=n(8),e.exports.authenticateUsers=n(16),e.exports.requireAuthentication=n(18),e.exports.errorHandler=n(19),e.exports.managementApiClient=n(20),e.exports.validateHookToken=n(21),e.exports.webtaskConfig=n(22)},function(e,t,n){const r=n(9),o=n(12),i=n(3),s=n(13);e.exports=function(e){if(!e||"object"!=typeof e)throw new i.ArgumentError("Must provide the options");if(null===e.secret||void 0===e.secret)throw new i.ArgumentError("Must provide a valid secret");if("string"!=typeof e.secret||0===e.secret.length)throw new i.ArgumentError("The provided secret is invalid: "+e.secret);if(null===e.audience||void 0===e.audience)throw new i.ArgumentError("Must provide a valid secret");if("string"!=typeof e.audience||0===e.audience.length)throw new i.ArgumentError("The provided audience is invalid: "+e.audience);if(null===e.baseUrl||void 0===e.baseUrl)throw new i.ArgumentError("Must provide a valid base URL");if("string"!=typeof e.baseUrl||0===e.baseUrl.length)throw new i.ArgumentError("The provided base URL is invalid: "+e.baseUrl);const t=o({audience:e.audience,issuer:e.baseUrl,secret:e.secret,algorithms:["HS256"],credentialsRequired:e.credentialsRequired||!0});return function(n,r,o){t(n,r,function(t){return t?o(t):e.onLoginSuccess?e.onLoginSuccess(n,r,o):o()})}},e.exports.optional=function(t){const n=e.exports(t);return s(function(e){if(e&&e.headers&&e.headers.authorization&&0===e.headers.authorization.indexOf("Bearer "))try{const n=r(e.headers.authorization.split(" ")[1]);return n&&n.iss===t.baseUrl}catch(e){return!1}return!1},n)}},function(e,t,n){"use strict";var r=n(10);function o(e){this.message=e}o.prototype=new Error,o.prototype.name="InvalidTokenError",e.exports=function(e,t){if("string"!=typeof e)throw new o("Invalid token specified");var n=!0===(t=t||{}).header?0:1;try{return JSON.parse(r(e.split(".")[n]))}catch(e){throw new o("Invalid token specified: "+e.message)}},e.exports.InvalidTokenError=o},function(e,t,n){var r=n(11);e.exports=function(e){var t=e.replace(/-/g,"+").replace(/_/g,"/");switch(t.length%4){case 0:break;case 2:t+="==";break;case 3:t+="=";break;default:throw"Illegal base64url string!"}try{return function(e){return decodeURIComponent(r(e).replace(/(.)/g,function(e,t){var n=t.charCodeAt(0).toString(16).toUpperCase();return n.length<2&&(n="0"+n),"%"+n}))}(t)}catch(e){return r(t)}}},function(e,t){var n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";function r(e){this.message=e}r.prototype=new Error,r.prototype.name="InvalidCharacterError",e.exports="undefined"!=typeof window&&window.atob&&window.atob.bind(window)||function(e){var t=String(e).replace(/=+$/,"");if(t.length%4==1)throw new r("'atob' failed: The string to be decoded is not correctly encoded.");for(var o,i,s=0,a=0,c="";i=t.charAt(a++);~i&&(o=s%4?64*o+i:i,s++%4)?c+=String.fromCharCode(255&o>>(-2*s&6)):0)i=n.indexOf(i);return c}},function(e,t){e.exports=require("express-jwt@5.1.0")},function(e,t,n){"use strict";var r=n(14);e.exports=function(e,t,n){return function(o,i,s){var a=r(s);return!0===e||"function"==typeof e&&e(o,i,a)?t(o,i,a):n?n(o,i,a):a()}}},function(e,t,n){var r=n(15);function o(e){var t=function(){return t.called?t.value:(t.called=!0,t.value=e.apply(this,arguments))};return t.called=!1,t}function i(e){var t=function(){if(t.called)throw new Error(t.onceError);return t.called=!0,t.value=e.apply(this,arguments)},n=e.name||"Function wrapped with `once`";return t.onceError=n+" shouldn't be called more than once",t.called=!1,t}e.exports=r(o),e.exports.strict=r(i),o.proto=o(function(){Object.defineProperty(Function.prototype,"once",{value:function(){return o(this)},configurable:!0}),Object.defineProperty(Function.prototype,"onceStrict",{value:function(){return i(this)},configurable:!0})})},function(e,t){e.exports=function e(t,n){if(t&&n)return e(t)(n);if("function"!=typeof t)throw new TypeError("need wrapper function");Object.keys(t).forEach(function(e){r[e]=t[e]});return r;function r(){for(var e=new Array(arguments.length),n=0;n<e.length;n++)e[n]=arguments[n];var r=t.apply(this,e),o=e[e.length-1];return"function"==typeof r&&r!==o&&Object.keys(o).forEach(function(e){r[e]=o[e]}),r}}},function(e,t,n){const r=n(9),o=n(12),i=n(17),s=n(3),a=n(13),c=n(3).UnauthorizedError;e.exports=function(e){if(!e||"object"!=typeof e)throw new s.ArgumentError("Must provide the options");if(null===e.domain||void 0===e.domain)throw new s.ArgumentError("Must provide a valid domain");if("string"!=typeof e.domain||0===e.domain.length)throw new s.ArgumentError("The provided domain is invalid: "+e.domain);if(null===e.audience||void 0===e.audience)throw new s.ArgumentError("Must provide a valid audience");if("string"!=typeof e.audience||0===e.audience.length)throw new s.ArgumentError("The provided audience is invalid: "+e.audience);const t=o({secret:i.expressJwtSecret({cache:!0,rateLimit:!0,jwksRequestsPerMinute:5,jwksUri:"https://"+e.domain+"/.well-known/jwks.json",handleSigningKeyError:function(e,t){return e instanceof i.SigningKeyNotFoundError?t(new c("A token was provided with an invalid kid")):t(e)}}),audience:e.audience,issuer:"https://"+e.domain+"/",algorithms:["RS256"],credentialsRequired:e&&e.credentialsRequired||!0});return function(n,r,o){t(n,r,function(t){return t?o(t):e.onLoginSuccess?e.onLoginSuccess(n,r,o):o()})}},e.exports.optional=function(t){const n=e.exports(t);return a(function(e){if(e&&e.headers&&e.headers.authorization&&0===e.headers.authorization.indexOf("Bearer "))try{const n=r(e.headers.authorization.split(" ")[1]);return n&&n.iss==="https://"+t.domain+"/"}catch(e){return!1}return!1},n)}},function(e,t){e.exports=require("jwks-rsa@1.1.1")},function(e,t,n){const r=n(3).UnauthorizedError;e.exports=function(e,t,n){return e.user?n():n(new r("Authentication required for this endpoint."))}},function(e,t,n){e.exports=function(e){return function(t,n,r,o){return e&&e(t),t&&t.status?(r.status(t.status),r.json({error:t.code||t.name,message:t.message||t.name})):(r.status(t.status||500),r.json({error:"InternalServerError",message:t.message||t.name}))}}},function(e,t,n){const r=n(3);e.exports=function(e){return function(t,n,o){const i=t,s=t.user&&t.user.access_token&&t.user.access_token.length?{domain:e.domain,accessToken:t.user.access_token}:e;r.managementApi.getClient(s).then(function(e){return i.auth0=e,o(),null}).catch(function(e){o(e)})}}},function(e,t,n){const r=n(3);e.exports=function(e,t,n){if(null===e||void 0===e)throw new r.ArgumentError("Must provide the domain");if("string"!=typeof e||0===e.length)throw new r.ArgumentError("The provided domain is invalid: "+e);if(null===t||void 0===t)throw new r.ArgumentError("Must provide the webtaskUrl");if("string"!=typeof t||0===t.length)throw new r.ArgumentError("The provided webtaskUrl is invalid: "+t);if(null===n||void 0===n)throw new r.ArgumentError("Must provide the extensionSecret");if("string"!=typeof n||0===n.length)throw new r.ArgumentError("The provided extensionSecret is invalid: "+n);return function(o){if(null===o||void 0===o)throw new r.ArgumentError("Must provide the hookPath");if("string"!=typeof o||0===o.length)throw new r.ArgumentError("The provided hookPath is invalid: "+o);return function(i,s,a){if(i.headers.authorization&&"Bearer"===i.headers.authorization.split(" ")[0]){const s=i.headers.authorization.split(" ")[1];try{if(r.validateHookToken(e,t,o,n,s))return a()}catch(e){return a(e)}}return a(new r.HookTokenError("Hook token missing for the call to: "+o))}}}},function(e,t,n){const r=n(3);e.exports=function(e){return function(t,n,o){return t.webtaskContext&&e.setProvider(r.configProvider.fromWebtaskContext(t.webtaskContext)),o()}}},function(e,t,n){e.exports.dashboardAdmins=n(24)},function(e,t,n){const r=n(25),o=n(26),i=n(27),s=n(30),a=n(3),c=n(5);e.exports=function(e){if(!e||"object"!=typeof e)throw new a.ArgumentError("Must provide the options");if(null===e.secret||void 0===e.secret)throw new a.ArgumentError("Must provide a valid secret");if("string"!=typeof e.secret||0===e.secret.length)throw new a.ArgumentError("The provided secret is invalid: "+e.secret);if(null===e.audience||void 0===e.audience)throw new a.ArgumentError("Must provide a valid audience");if("string"!=typeof e.audience||0===e.audience.length)throw new a.ArgumentError("The provided audience is invalid: "+e.audience);if(null===e.rta||void 0===e.rta)throw new a.ArgumentError("Must provide a valid rta");if("string"!=typeof e.rta||0===e.rta.length)throw new a.ArgumentError("The provided rta is invalid: "+e.rta);if(null===e.domain||void 0===e.domain)throw new a.ArgumentError("Must provide a valid domain");if("string"!=typeof e.domain||0===e.domain.length)throw new a.ArgumentError("The provided domain is invalid: "+e.domain);if(null===e.baseUrl||void 0===e.baseUrl)throw new a.ArgumentError("Must provide a valid base URL");if("string"!=typeof e.baseUrl||0===e.baseUrl.length)throw new a.ArgumentError("The provided base URL is invalid: "+e.baseUrl);if(null===e.clientName||void 0===e.clientName)throw new a.ArgumentError("Must provide a valid client name");if("string"!=typeof e.clientName||0===e.clientName.length)throw new a.ArgumentError("The provided client name is invalid: "+e.clientName);const t=e.stateKey||"state",n=e.nonceKey||"nonce",u=e.urlPrefix||"",l=e.sessionStorageKey||"apiToken",d=r.Router();return d.get(u+"/login",function(r,i){const s=o.randomBytes(16).toString("hex"),l=o.randomBytes(16).toString("hex");i.cookie(t,s),i.cookie(n,l);const d=new a.SessionManager(e.rta,e.domain,e.baseUrl).createAuthorizeUrl({redirectUri:c.getBaseUrl(r)+u+"/login/callback",scopes:e.scopes,expiration:e.expiration,nonce:l,state:s});i.redirect(d)}),d.post(u+"/login/callback",i(),function(r,o,i){var u;try{u=s.decode(r.body.id_token)}catch(e){u=null}if(!u||!r.cookies||r.cookies[n]!==u.nonce)return i(new a.ValidationError("Login failed. Nonce mismatch."));if(!r.cookies||r.cookies[t]!==r.body.state)return i(new a.ValidationError("Login failed. State mismatch."));return new a.SessionManager(e.rta,e.domain,e.baseUrl).create(r.body.id_token,r.body.access_token,{secret:e.secret,issuer:e.baseUrl,audience:e.audience,noAccessToken:e.noAccessToken}).then(function(e){o.header("Content-Type","text/html"),o.status(200).send('<html><head><script type="text/javascript">sessionStorage.setItem("'+l+'", "'+e+'");window.location.href = "'+c.getBaseUrl(r)+'";<\/script></head></html>')}).catch(function(e){i(e)})}),d.get(u+"/logout",function(t,n){const r=encodeURIComponent(c.getBaseUrl(t));n.header("Content-Type","text/html"),n.status(200).send('<html><head><script type="text/javascript">sessionStorage.removeItem("'+l+'");window.location.href = "https://'+e.rta+"/v2/logout/?returnTo="+r+"&client_id="+r+'";<\/script></head></html>')}),d.get("/.well-known/oauth2-client-configuration",function(t,n){n.header("Content-Type","application/json"),n.status(200).send({redirect_uris:[c.getBaseUrl(t)+u+"/login/callback"],client_name:e.clientName,post_logout_redirect_uris:[c.getBaseUrl(t)]})}),d}},function(e,t){e.exports=require("express@4.16.3")},function(e,t){e.exports=require("crypto")},function(e,t,n){"use strict";var r=n(28),o=n(29);function i(e){if("string"==typeof e&&"j:"===e.substr(0,2))try{return JSON.parse(e.slice(2))}catch(e){return}}function s(e){for(var t,n,r=Object.keys(e),o=0;o<r.length;o++)(n=i(e[t=r[o]]))&&(e[t]=n);return e}function a(e,t){if("string"==typeof e){if("s:"!==e.substr(0,2))return e;for(var n=!t||Array.isArray(t)?t||[]:[t],r=0;r<n.length;r++){var i=o.unsign(e.slice(2),n[r]);if(!1!==i)return i}return!1}}function c(e,t){for(var n,r,o,i=Object.keys(e),s=Object.create(null),c=0;c<i.length;c++)(o=e[r=i[c]])!==(n=a(o,t))&&(s[r]=n,delete e[r]);return s}e.exports=function(e,t){var n=!e||Array.isArray(e)?e||[]:[e];return function(e,o,i){if(e.cookies)return i();var a=e.headers.cookie;if(e.secret=n[0],e.cookies=Object.create(null),e.signedCookies=Object.create(null),!a)return i();e.cookies=r.parse(a,t),0!==n.length&&(e.signedCookies=c(e.cookies,n),e.signedCookies=s(e.signedCookies)),e.cookies=s(e.cookies),i()}},e.exports.JSONCookie=i,e.exports.JSONCookies=s,e.exports.signedCookie=a,e.exports.signedCookies=c},function(e,t,n){"use strict";t.parse=function(e,t){if("string"!=typeof e)throw new TypeError("argument str must be a string");for(var n={},o=t||{},s=e.split(i),c=o.decode||r,u=0;u<s.length;u++){var l=s[u],d=l.indexOf("=");if(!(d<0)){var p=l.substr(0,d).trim(),f=l.substr(++d,l.length).trim();'"'==f[0]&&(f=f.slice(1,-1)),void 0==n[p]&&(n[p]=a(f,c))}}return n},t.serialize=function(e,t,n){var r=n||{},i=r.encode||o;if("function"!=typeof i)throw new TypeError("option encode is invalid");if(!s.test(e))throw new TypeError("argument name is invalid");var a=i(t);if(a&&!s.test(a))throw new TypeError("argument val is invalid");var c=e+"="+a;if(null!=r.maxAge){var u=r.maxAge-0;if(isNaN(u))throw new Error("maxAge should be a Number");c+="; Max-Age="+Math.floor(u)}if(r.domain){if(!s.test(r.domain))throw new TypeError("option domain is invalid");c+="; Domain="+r.domain}if(r.path){if(!s.test(r.path))throw new TypeError("option path is invalid");c+="; Path="+r.path}if(r.expires){if("function"!=typeof r.expires.toUTCString)throw new TypeError("option expires is invalid");c+="; Expires="+r.expires.toUTCString()}r.httpOnly&&(c+="; HttpOnly");r.secure&&(c+="; Secure");if(r.sameSite){var l="string"==typeof r.sameSite?r.sameSite.toLowerCase():r.sameSite;switch(l){case!0:c+="; SameSite=Strict";break;case"lax":c+="; SameSite=Lax";break;case"strict":c+="; SameSite=Strict";break;case"none":c+="; SameSite=None";break;default:throw new TypeError("option sameSite is invalid")}}return c};var r=decodeURIComponent,o=encodeURIComponent,i=/; */,s=/^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;function a(e,t){try{return t(e)}catch(t){return e}}},function(e,t,n){var r=n(26);function o(e){return r.createHash("sha1").update(e).digest("hex")}t.sign=function(e,t){if("string"!=typeof e)throw new TypeError("Cookie value must be provided as a string.");if("string"!=typeof t)throw new TypeError("Secret string must be provided.");return e+"."+r.createHmac("sha256",t).update(e).digest("base64").replace(/\=+$/,"")},t.unsign=function(e,n){if("string"!=typeof e)throw new TypeError("Signed cookie string must be provided.");if("string"!=typeof n)throw new TypeError("Secret string must be provided.");var r=e.slice(0,e.lastIndexOf("."));return o(t.sign(r,n))==o(e)&&r}},function(e,t){e.exports=require("jsonwebtoken@7.1.9")},function(e,t,n){"use strict";n.r(t),function(e){var r=n(32),o=n.n(r),i=n(25),s=n.n(i),a=n(3),c=n(1),u=n(33),l=n(35),d=n(39),p=n(41),f=n(34),h=n.n(f),g=n(36),m=n.n(g);t.default=function(t,n){h.a.setProvider(t);var r=n?new a.WebtaskStorageContext(n):new a.FileStorageContext(o.a.join(e,"./data.json")),i=new s.a;return console.log(h.a),i.use(c.routes.dashboardAdmins({secret:h()("EXTENSION_SECRET"),audience:"urn:example-extension",rta:h()("AUTH0_RTA").replace("https://",""),domain:h()("AUTH0_DOMAIN"),baseUrl:h()("PUBLIC_WT_URL"),webtaskUrl:h()("PUBLIC_WT_URL"),clientName:"Example Extension",sessionStorageKey:"example-extension:apiToken",noAccessToken:!0,urlPrefix:"/admins",scopes:"read:users"})),i.use("/api",Object(u.default)(r)),i.use("/app",s.a.static(o.a.join(e,"../dist"))),i.use("/meta",Object(d.default)()),i.use("/.extensions",Object(l.default)()),i.get("*",Object(p.default)()),i.use(c.middlewares.errorHandler(m.a.error.bind(m.a))),i}}.call(this,"/")},function(e,t){e.exports=require("path")},function(e,t,n){"use strict";n.r(t);var r=n(25),o=n(1),i=n(34),s=n.n(i);t.default=function(e){var t=o.middlewares.managementApiClient({domain:s()("AUTH0_DOMAIN"),clientId:s()("AUTH0_CLIENT_ID"),clientSecret:s()("AUTH0_CLIENT_SECRET")}),n=Object(r.Router)();return n.use(o.middlewares.authenticateUsers.optional({domain:s()("AUTH0_DOMAIN"),audience:s()("EXTENSION_CLIENT_ID"),credentialsRequired:!1,onLoginSuccess:function(e,t,n){return n()}})),n.use(o.middlewares.authenticateAdmins.optional({credentialsRequired:!1,secret:s()("EXTENSION_SECRET"),audience:"urn:example-extension",baseUrl:s()("PUBLIC_WT_URL"),onLoginSuccess:function(e,t,n){return n()}})),n.get("/clients",t,function(e,t,n){e.auth0.clients.getAll().then(function(e){return t.json(e)}).catch(function(e){return n(e)})}),n.get("/settings",function(t,n,r){e.read().then(function(e){return n.json(e)}).catch(function(e){return r(e)})}),n.post("/settings",function(t,n,r){e.read().then(function(e){return Object.assign({},e,t.body.settings)}).then(function(t){return e.write(t)}).then(function(){return t.send(204)}).catch(function(e){return r(e)})}),n}},function(e,t,n){e.exports=n(3).config()},function(e,t,n){"use strict";n.r(t);var r=n(25),o=n(1),i=n(34),s=n.n(i),a=n(36),c=n.n(a),u=n(38),l=n.n(u);t.default=function(){var e=o.middlewares.validateHookToken(s()("AUTH0_DOMAIN"),s()("WT_URL"),s()("EXTENSION_SECRET")),t=Object(r.Router)();return t.use("/on-uninstall",e("/.extensions/on-uninstall")),t.use("/on-install",e("/.extensions/on-install")),t.use(o.middlewares.managementApiClient({domain:s()("AUTH0_DOMAIN"),clientId:s()("AUTH0_CLIENT_ID"),clientSecret:s()("AUTH0_CLIENT_SECRET")})),t.post("/on-install",function(e,t){console.log("here1"),console.log(l.a),e.auth0.rules.create({name:"risk-threshold-rule",script:l.a.template,order:50,enabled:!0,stage:"login_success"}).then(function(){console.log("here2"),t.sendStatus(204)}).catch(function(){console.log("here3"),t.sendStatus(500)})}),t.delete("/on-uninstall",function(e,t){c.a.debug("Uninstall running..."),e.auth0.clients.delete({client_id:s()("AUTH0_CLIENT_ID")}).then(function(){c.a.debug(`Deleted client: ${s()("AUTH0_CLIENT_ID")}`),t.sendStatus(204)}).catch(function(e){c.a.debug(`Error deleting client: ${s()("AUTH0_CLIENT_ID")}`),c.a.error(e),t.sendStatus(204)})}),t}},function(e,t,n){var r=n(37);r.emitErrs=!0;var o=new r.Logger({transports:[new r.transports.Console({timestamp:!0,level:"debug",handleExceptions:!0,json:!1,colorize:!0})],exitOnError:!1});e.exports=o,e.exports.stream={write:function(e){o.info(e.replace(/\n$/,""))}}},function(e,t){e.exports=require("winston@1.0.0")},function(e,t){e.exports=function(){return`function (user, context, callback) {\n\n\n/**\n   * This rule has been automatically generated by\n   * ${username} at ${(new Date).toISOString()}\n   */\n\n  var LOG_TAG = '[RISK_RULE]: ';\n  console.log(LOG_TAG, 'Entered Risk Rule...');     \n     if(context.anomalyDetection)\n     {\n     var overallConfidence = context.anomalyDetection.confidence;\n     console.log("Overall login confidence: " + overallConfidence);\n     var assessments = context.anomalyDetection.assessments;\n     console.log(JSON.stringify(assessments, null, 2));\n     if(overallConfidence < 1 )\n     {\n           context.multifactor = {\n           provider: 'guardian',\n         // optional, defaults to true. Set to false to force Guardian authentication every time.\n         // See https://auth0.com/docs/multifactor-authentication/custom#change-the-frequency-of-authentication-requests for details\n         allowRememberBrowser: true\n       };\n     }\n     }\n     callback(null, user, context);\n   }`}},function(e,t,n){"use strict";n.r(t);var r=n(25),o=n.n(r),i=n(40);t.default=function(){var e=o.a.Router();return e.get("/",function(e,t){t.status(200).send(i)}),e}},function(e){e.exports={title:"Auth0 Example Extension",name:"auth0-example-extension",version:"0.0.0",author:"auth0",useHashName:!1,description:"Auth0 example extension with the comments",type:"application",category:"end_user",logoUrl:"https://cdn.auth0.com/styleguide/components/1.0.8/media/logos/img/badge.png",initialUrlPath:"/",repository:"https://github.com/pushpabrol/example-extension",keywords:["auth0","extension"],auth0:{createClient:!0,onUninstallPath:"/.extensions/on-uninstall",scopes:"read:clients delete:clients read:rules create:rules update:rules delete:rules"},secrets:{FEATURE_ENABLED:{description:"Select with options",type:"select",allowMultiple:!1,options:[{value:"false",text:"No"},{value:"true",text:"Yes"}]},FEATURE_THING:{description:"Field that became visible only when certain option is selected",required:!0,visibleIf:{FEATURE_ENABLED:"true"}},TEAM:{description:"Text field with default value",default:"Sarcastic Snails",required:!0},USERNAME:{description:"Text field with placeholder",example:"awsome_name",required:!0},PASSWORD:{description:"Password secret, doesn't show contents in dashboard",type:"password",required:!0}}}},function(e,t,n){"use strict";n.r(t),function(e){n(42),n(43);var r=n(44),o=n.n(r),i=(n(32),n(1)),s=n(34),a=n.n(s);t.default=function(){var e='\n    <!DOCTYPE html>\n    <html lang="en">\n    <head>\n      <title><%= config.TITLE %></title>\n      <meta charset="UTF-8" />\n      <meta http-equiv="X-UA-Compatible" content="IE=Edge" />\n      <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n      <link rel="shortcut icon" href="<%= assets.favIcon %>" />\n      <meta name="viewport" content="width=device-width, initial-scale=1">\n      <link rel="stylesheet" type="text/css" href="https://cdn.auth0.com/styles/zocial.min.css" />\n      <link rel="stylesheet" type="text/css" href="https://cdn.auth0.com/manage/v0.3.1672/css/index.min.css" />\n      <link rel="stylesheet" type="text/css" href="https://cdn.auth0.com/styleguide/4.6.13/index.min.css" />\n      <% if (assets.style) { %><link rel="stylesheet" type="text/css" href="/app/<%= assets.style %>" /><% } %>\n      <% if (assets.version) { %><link rel="stylesheet" type="text/css" href="<%= assets.cdnPath %>/auth0-example-extension.ui.<%= assets.version %>.css" /><% } %>\n    </head>\n    <body>\n      <div id="app"></div>\n      <script src="https://cdn.auth0.com/js/auth0/9.8.2/auth0.min.js"><\/script>\n      <script type="text/javascript" src="//cdn.auth0.com/manage/v0.3.1672/js/bundle.js"><\/script>\n      <script type="text/javascript">window.config = <%- JSON.stringify(config) %>;<\/script>\n      <% if (assets.vendors) { %><script type="text/javascript" src="/app/<%= assets.vendors %>"><\/script><% } %>\n      <% if (assets.app) { %><script type="text/javascript" src="/app/<%= assets.app %>"><\/script><% } %>\n      <% if (assets.version) { %>\n      <script type="text/javascript" src="<%= assets.cdnPath %>/auth0-example-extension.ui.vendors.<%= assets.version %>.js"><\/script>\n      <script type="text/javascript" src="<%= assets.cdnPath %>/auth0-example-extension.ui.<%= assets.version %>.js"><\/script>\n      <% } %>\n    </body>\n    </html>\n    ';return function(t,n,r){if(0===t.url.indexOf("/api"))return r();var s=i.urlHelpers.getBasePath(t),c={AUTH0_DOMAIN:a()("AUTH0_DOMAIN"),EXTENSION_CLIENT_ID:a()("EXTENSION_CLIENT_ID"),BASE_URL:i.urlHelpers.getBaseUrl(t),BASE_PATH:s,USER:a()("USERNAME"),TEAM:a()("TEAM")},u=a()("FAVICON_PATH")||"https://cdn.auth0.com/styleguide/4.6.13/lib/logos/img/favicon.png",l=a()("CDN_PATH")||"//cdn.auth0.com/extensions/auth0-example-extension/assets";return n.send(o.a.render(e,{config:c,assets:{version:"0.0.0",cdnPath:l,favIcon:u}}))}}}.call(this,"/")},function(e,t){e.exports=function(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}},function(e,t){e.exports=require("fs")},function(e,t){e.exports=require("ejs@2.3.1")}]);