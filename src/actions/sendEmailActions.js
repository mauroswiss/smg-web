import request from 'request';
import { responseWait, responseEnd } from './loadingActions';
import {
  SEND_EMAIL_SUCCESS,
  SEND_EMAIL_ERROR,
  LOCALHOST_SERVER,
} from '../constants/index';

export const sendEmailError = data => ({
  type: SEND_EMAIL_ERROR,
  data,
});
export const sendEmailSucces = data => ({
  type: SEND_EMAIL_SUCCESS,
  data,
});

export const sendEmail = (name, email, phone, description) => dispatch => {
  dispatch(responseWait());
  const options = {
    uri: `${LOCALHOST_SERVER}send`,
    method: 'POST',
    json: {
      name,
      email,
      phone,
      description,
    },
  };
  request(options, (err, rsp) => {
    if (err || rsp.statusCode === 401) {
      dispatch(sendEmailError());
      dispatch(responseEnd());
    }
    if (!err && rsp.statusCode === 200) {
      dispatch(sendEmailSucces());
      dispatch(responseEnd());
    }
  });
};
