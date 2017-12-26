/**
 * @author Juan Carlos Cancela <cancela.juancarlos@gmail.com>
 */
/* eslint consistent-return: 0 */

import request from 'request';
import * as authActions from './authActions';
import {
  FETCH_FACTURAS_SUCCESS,
  LOCALSTORAGE_AUTH_KEY,
  LOCALHOST_SERVER,
} from '../constants/index';

export const fetchFacturasSuccess = data => ({
  type: FETCH_FACTURAS_SUCCESS,
  data,
});

export const fetchFacturas = () => dispatch => {
  const auth = localStorage.getItem(LOCALSTORAGE_AUTH_KEY);
  let token;
  if (auth) {
    token = JSON.parse(auth).token;
  }
  const options = {
    uri: `${LOCALHOST_SERVER}api/facturas`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    json: {
      token,
    },
  };
  request(options, (err, rsp, body) => {
    if (err || rsp.statusCode === 401) {
      dispatch(authActions.renewToken(token, fetchFacturas));
    }
    if (!err && rsp.statusCode === 200) {
      dispatch(fetchFacturasSuccess(body));
    }
  });
};
