import { SEND_EMAIL_SUCCESS, SEND_EMAIL_ERROR } from '../constants/index';

function emailSucces(state) {
  const newState = Object.assign({}, state);
  newState.send = true;
  return newState;
}
function emailError(state) {
  const newState = Object.assign({}, state);
  newState.send = false;
  return newState;
}

export default function sendEmail(state = [], action) {
  switch (action.type) {
    case SEND_EMAIL_SUCCESS:
      return emailSucces(state);
    case SEND_EMAIL_ERROR:
      return emailError(state);
    default:
      return state;
  }
}
