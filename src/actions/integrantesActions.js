import request from 'request';
import {
  FETCH_INTEGRANTES_SUCCESS,
  FETCH_INTEGRANTES_ERROR,
  LOCALHOST_SERVER,
} from '../constants/index';

export const integrantesError = data => ({
  type: FETCH_INTEGRANTES_ERROR,
  data,
});
export const integrantesSucces = data => ({
  type: FETCH_INTEGRANTES_SUCCESS,
  data,
});

export const integrantesClean = data => ({
  type: FETCH_INTEGRANTES_SUCCESS,
  data,
});

export const fetchIntegrantes = contra => dispatch => {
  const options = {
    uri: `${LOCALHOST_SERVER}api/integrantes`,
    method: 'POST',
    json: {
      contra,
    },
  };
  request(options, (err, rsp, body) => {
    if (err || rsp.statusCode === 401) {
      dispatch(integrantesError());
    }
    if (!err && rsp.statusCode === 200) {
      dispatch(integrantesSucces(body));
    }
  });
};
