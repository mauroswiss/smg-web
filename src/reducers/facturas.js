import { FETCH_FACTURAS_SUCCESS } from '../constants/index';

export default function facturas(state = [], action) {
  switch (action.type) {
    case FETCH_FACTURAS_SUCCESS:
      return action.data;

    default:
      return state;
  }
}
