import get from './actions.utils';
import { FETCH_INTEGRANTES } from '../constants/index';
// const url = 'http://192.168.105.159:80/afiliados/datos/'
const url =
  'http://192.168.104.127/smgapi/react/afiliado_datos_integrantes.php/';

function fetchIntegrantes(contra) {
  return get(FETCH_INTEGRANTES, `${url}${contra}`);
}

export default fetchIntegrantes;
