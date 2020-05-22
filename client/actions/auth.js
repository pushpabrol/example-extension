import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { push } from 'react-router-redux';

import * as constants from '../constants';

// authorize end users using `auth0-js`
const webAuth = new auth0.WebAuth({
  domain: window.config.AUTH0_DOMAIN,
  clientID: window.config.EXTENSION_CLIENT_ID,
  scope: 'openid roles',
  responseType: 'id_token',
  redirectUri: `${window.config.BASE_URL}/login`
});

export function login() {
  webAuth.authorize();

  return {
    type: constants.SHOW_LOGIN
  };
}

// checks if a decoded token is expired
function isTokenExpired(decodedToken) {
  return isDateExpired(decodedToken.exp);
}

// checks if a given token exp is expired
function isDateExpired(exp) {
  // if there is no expiration date, return
  if (typeof exp === 'undefined') return true;

  // convert to date and store
  const d = new Date(0);
  d.setUTCSeconds(exp);

  // check if date is expired
  return !(d.valueOf() > (new Date().valueOf() + (30)));;
}

export function logout() {
  return (dispatch) => {
    sessionStorage.clear();
    localStorage.clear();

    window.location.href = `https://${window.config.AUTH0_DOMAIN}/v2/logout?client_id=${window.config.EXTENSION_CLIENT_ID}&returnTo=${encodeURIComponent(window.config.BASE_URL)}`;

    dispatch({
      type: constants.LOGOUT_PENDING
    });
  };
}

// calls checkSession to refresh idToken
function refreshToken() {
  return new Promise((resolve, reject) => {
    // invoke check session to get a new token
    webAuth.checkSession({},
      function(err, result) {
        if (err) { // there was an error
          reject(err);
        } else {  // we got a token
          resolve(result);
        }
      }
    );
  });
}

const processTokens = (dispatch, apiToken) => {
  return new Promise((resolve) => {
    // check token expiration date
    const decodedToken = jwtDecode(apiToken);
    if (isTokenExpired(decodedToken)) {
      return;
    }

    axios.defaults.headers.common.Authorization = `Bearer ${apiToken}`;

    sessionStorage.setItem('example-extension:apiToken:exp', decodedToken.exp);
    sessionStorage.setItem('example-extension:apiToken', apiToken);

    // creates an interceptor to refresh token if needed
    axios.interceptors.request.use((config) => {
      // get token expiration from storage
      const exp = sessionStorage.getItem('example-extension:apiToken:exp');

      // if there is no token, or it is expired, try to get one
      if (isDateExpired(exp)) {
        return refreshToken().then((tokenResponse) => {
          // we got one, store and load credentials
          return processTokens(dispatch, tokenResponse.idToken).then(() => {
            config.headers.Authorization = axios.defaults.headers.common.Authorization;
            return Promise.resolve(config);
          });
        })
          .catch((error) => {
            return Promise.reject(error);
          });
      }

      // token is not expired, move on.
      return config;
    }, error => Promise.reject(error));

    axios.interceptors.response.use(response => response, (error) => {
      const value = error.response;
      if (value && value.status === 401 && value.data.message === 'TokenExpired') {
        // renewToken performs authentication using username/password saved in sessionStorage/sessionStorage
        return refreshToken().then((tokenResponse) => {
          // we got one, store and load credentials
          return processTokens(dispatch, tokenResponse.idToken).then(() => {
            error.config.headers.Authorization = axios.defaults.headers.common.Authorization;
            return axios.request(error.config);
          });
        });
      }
      return Promise.reject(error);
    });

    dispatch({
      type: constants.LOADED_TOKEN,
      payload: {
        token: apiToken
      }
    });

    dispatch({
      type: constants.LOGIN_SUCCESS,
      payload: {
        token: apiToken,
        decodedToken,
        user: decodedToken
      }
    });

    dispatch(push('/user'));

    resolve();
  });
};

export function loadCredentials() {
  return (dispatch) => {
    if (window.location.hash) {
      dispatch({
        type: constants.LOGIN_PENDING
      });

      return webAuth.parseHash({
        hash: window.location.hash
      }, (err, hash) => {
        if (err || !hash || !hash.idToken) {
          // must have had hash, but didn't get an idToken in the hash
          console.error('login error: ', err);
          return dispatch({
            type: constants.LOGIN_FAILED,
            payload: {
              error: err && err.error ? `${err.error}: ${err.errorDescription}` : 'UnknownError: Unknown Error'
            }
          });
        }

        return processTokens(dispatch, hash.idToken);
      });
    }

    const token = sessionStorage.getItem('example-extension:apiToken');
    if (token) {
      return processTokens(dispatch, token);
    }
  };
}
