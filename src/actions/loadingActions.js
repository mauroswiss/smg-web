import { RESPONSE_WAIT, RESPONSE_END } from '../constants/index';

export const responseWait = data => ({
  type: RESPONSE_WAIT,
  data,
});

export const responseEnd = data => ({
  type: RESPONSE_END,
  data,
});
