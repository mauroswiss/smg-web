import {
  AUTH_SUCCESS,
  AUTH_REFRESH_TOKEN,
  LOCALSTORAGE_AUTH_KEY,
  AUTH_LOGOUT,
} from '../constants/index';

export default function auth(state = {}, action) {
  const newState = { ...state };
  switch (action.type) {
    case AUTH_SUCCESS:
      newState.loginResponse = action.data;
      return newState;
    case AUTH_LOGOUT:
      newState.loginResponse = '';
      return {};
    case AUTH_REFRESH_TOKEN: {
      const authData = localStorage.getItem(LOCALSTORAGE_AUTH_KEY);
      const authJson = JSON.parse(authData);
      authJson.token = action.data.token;
      authJson.exp = action.data.exp;
      localStorage.setItem(LOCALSTORAGE_AUTH_KEY, JSON.stringify(authJson));
      newState.loginResponse = authJson;
      return newState;
    }
    default:
      return state;
  }
}
