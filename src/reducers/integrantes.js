import {
  FETCH_INTEGRANTES,
  FETCH_INTEGRANTES_SUCCESS,
  FETCH_INTEGRANTES_ERROR,
} from '../constants';

function fetchedIntegrantes(state = [], action) {
  switch (action.type) {
    case FETCH_INTEGRANTES:
      return action.data;
    case FETCH_INTEGRANTES_SUCCESS:
      return action.data;
    case FETCH_INTEGRANTES_ERROR:
      return [];
    default:
      return state;
  }
}

export default fetchedIntegrantes;
