/* eslint consistent-return: 0 */

import {
  FETCH_TELEMEDICINA_DISPONIBILIDAD_SUCCESS,
  TELEMEDICINA_CLEAN_LIST_SUCCESS,
  FETCH_TELEMEDICINA_TURNOS_SUCCESS,
  DELETE_TELEMEDICINA_TURNOS_SUCCESS,
  DETAIL_TELEMEDICINA_TURNOS_SUCCESS,
  SHOW_VALIDACIONES_TECNICAS,
  FETCH_FECHAS_DISPONIBLES_SUCCESS,
  TELEMEDICINA_INTEGRANTE_SELECCIONADO,
  FETCH_TELEMEDICINA_TURNOS_FILTER,
  FETCH_ESPECIALIDADES_SUCCESS,
  FETCH_ESPECIALIDADES_ERROR,
  CLEAN_LIST_ESPECIALIDAD,
} from '../constants/index';

const defaultState = {
  showAlert: false,
  display: 'none',
  validaciones_tecnicas: false,
};

function fechas(data) {
  const arrFechas = [];
  data.forEach(option => {
    const year = option.fecha.substring(0, 4);
    const month = option.fecha.substring(4, 6);
    const day = option.fecha.substring(6, 8);
    const dateFormat = `${day}/${month}/${year}`;
    arrFechas.push(dateFormat);
  });
  return arrFechas;
}

function filterTurnos(inte, newState) {
  const turnos = newState.turnos;
  let newTurnos = [];
  newTurnos = turnos.filter(item => item.inte === inte);
  return newTurnos;
}

// MAESTROS ESPECIALIDADES
function cargaEspecialidades(data) {
  let options = [];
  options = data.map((option, index) => {
    let newOption = {};
    if (option.exten !== '') {
      let color = '#333';
      if (option.visualiza === 'V') {
        color = '#f40000';
      }

      newOption = {
        id: index + 1,
        text: option.exten,
        value: option.espe,
        mensaje_edad: option.mensaje__edad,
        observ: option.observacion,
        visualiza: option.visualiza,
        mensaje: option.mensaje,
        color,
        espe: option.espe,
      };
    }
    return newOption;
  });

  options.unshift({
    id: '0',
    text: 'Seleccione especialidad',
    value: '0',
    mensaje_edad: '',
    observ: '',
    visualiza: '',
    mensaje: '',
    color: '#333',
  });

  return options;
}

function cargaEspecialidadesError() {
  return {
    text:
      'En estos momentos no es posible asignar turnos. Para la asignación de este turno le solicitamos se comunique por favor con nuestro Contact Center al 0810-333-8876',
  };
}

export default function telemedicina(state = defaultState, action) {
  const newState = { ...state };

  switch (action.type) {
    case FETCH_TELEMEDICINA_DISPONIBILIDAD_SUCCESS:
      newState.showAlert = true;
      newState.disponibilidad = action.data;
      return newState;

    case TELEMEDICINA_CLEAN_LIST_SUCCESS:
      newState.showAlert = false;
      return newState;

    case TELEMEDICINA_INTEGRANTE_SELECCIONADO:
      newState.integrante = action.data;
      return newState;

    case FETCH_TELEMEDICINA_TURNOS_SUCCESS:
      newState.turnos = action.data;
      return newState;
    case DELETE_TELEMEDICINA_TURNOS_SUCCESS:
      newState.delete = action.data;
      return newState;
    case DETAIL_TELEMEDICINA_TURNOS_SUCCESS:
      newState.detail = action.data;
      return newState;
    case SHOW_VALIDACIONES_TECNICAS:
      return { validaciones_tecnicas: true };
    case FETCH_FECHAS_DISPONIBLES_SUCCESS:
      newState.fechas_disponibles = null;
      newState.fechas_disponibles = fechas(action.data);
      return newState;

    case FETCH_TELEMEDICINA_TURNOS_FILTER:
      newState.turnosFilter = filterTurnos(action.data, newState);
      return newState;
    // MAESTROS ESPECIALIDADES OK
    case FETCH_ESPECIALIDADES_SUCCESS:
      newState.especialidadOptions = cargaEspecialidades(action.data);
      return newState;
    // MAESTROS ESPECIALIDADES ERROR
    case FETCH_ESPECIALIDADES_ERROR:
      newState.errorEspecialidades = cargaEspecialidadesError();
      return newState;
    case CLEAN_LIST_ESPECIALIDAD:
      newState.especialidadOptions = null;
      return newState;

    default:
      return state;
  }
}
