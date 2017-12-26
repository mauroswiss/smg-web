import { RESPONSE_WAIT, RESPONSE_END } from '../constants/index';

function responseWait(state) {
  const newState = Object.assign({}, state);
  newState.wait = true;
  return newState;
}

function responseEnd(state) {
  const newState = Object.assign({}, state);
  newState.wait = false;
  return newState;
}

export default function sendEmail(state = [], action) {
  switch (action.type) {
    case RESPONSE_WAIT:
      return responseWait(state);
    case RESPONSE_END:
      return responseEnd(state);
    default:
      return state;
  }
}
