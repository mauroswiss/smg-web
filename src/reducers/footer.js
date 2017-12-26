import { TOGGLE_MENU } from '../constants/index';

function toggleMenu(state) {
  const newState = Object.assign({}, state);
  newState.show = !newState.show;
  return newState;
}

export default function footer(state = [], action) {
  switch (action.type) {
    case TOGGLE_MENU:
      return toggleMenu(state);
    default:
      return state;
  }
}
