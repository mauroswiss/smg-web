/**
 * @author Juan Carlos Cancela <cancela.juancarlos@gmail.com>
 */
/* eslint consistent-return: 0 */

import request from 'request';
import { responseWait, responseEnd } from './loadingActions';
import {
  AUTH_SUCCESS,
  AUTH_ERROR,
  AUTH_REFRESH_TOKEN,
  AUTH_LOGOUT,
  LOCALHOST_SERVER,
} from '../constants/index';

export const authSuccess = data => ({
  type: AUTH_SUCCESS,
  data,
});

export const logoutSuccess = data => ({
  type: AUTH_LOGOUT,
  data,
});

export const authError = error => ({
  type: AUTH_ERROR,
  data: error,
});

export const authTokenRefresh = data => ({
  type: AUTH_REFRESH_TOKEN,
  data,
});

export const authLogOut = () => dispatch => {
  localStorage.clear();
  localStorage.removeItem('smg_auth');
  dispatch(logoutSuccess());
};

export const fetchAuth = (documento, password) => dispatch => {
  dispatch(responseWait());
  const options = {
    uri: `${LOCALHOST_SERVER}auth`,
    method: 'POST',
    json: {
      documento,
      password,
    },
  };
  request(options, (err, rsp, body) => {
    if (err) {
      dispatch(responseEnd());
      return authError(err);
    }
    if (!err && rsp.statusCode === 200) {
      dispatch(authSuccess(body.data));
      dispatch(responseEnd());
    }
  });
};

export const renewToken = (token, callbackAction) => dispatch => {
  const options = {
    uri: `${LOCALHOST_SERVER}renew-token`,
    method: 'POST',
    json: {
      token,
    },
  };
  request(options, (err, rsp, body) => {
    if (err || (rsp.statusCode !== 200 && rsp.statusCode !== 201)) {
      dispatch(authLogOut());
      // return authError(err);
    }
    if (!err && rsp.statusCode === 200) {
      dispatch(authTokenRefresh(body.data));
      if (callbackAction) dispatch(callbackAction());
    }
  });
};
