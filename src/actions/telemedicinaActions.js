/**
 * @author Juan Carlos Cancela <cancela.juancarlos@gmail.com>
 */
/* eslint consistent-return: 0 */
/* eslint no-console: 0 */
import request from 'request';
import * as authActions from './authActions';
import {
  FETCH_TELEMEDICINA_DISPONIBILIDAD_SUCCESS,
  TELEMEDICINA_CLEAN_LIST_SUCCESS,
  LOCALSTORAGE_AUTH_KEY,
  FETCH_TELEMEDICINA_TURNOS_SUCCESS,
  DELETE_TELEMEDICINA_TURNOS_SUCCESS,
  DETAIL_TELEMEDICINA_TURNOS_SUCCESS,
  SHOW_VALIDACIONES_TECNICAS,
  TELEMEDICINA_INTEGRANTE_SELECCIONADO,
  FETCH_TELEMEDICINA_TURNOS_FILTER,
  FETCH_FECHAS_DISPONIBLES_SUCCESS,
  LOCALHOST_SERVER,
  FETCH_ESPECIALIDADES_SUCCESS,
  FETCH_ESPECIALIDADES_ERROR,
  CLEAN_LIST_ESPECIALIDAD,
} from '../constants/index';

function getToken() {
  const auth = localStorage.getItem(LOCALSTORAGE_AUTH_KEY);
  let token;
  if (auth) {
    token = JSON.parse(auth).token;
  }
  return token;
}

// OBTENER FECHAS DISPONIBLES
export const fetchFechasDisponiblesSuccess = data => ({
  type: FETCH_FECHAS_DISPONIBLES_SUCCESS,
  data,
});

export const fetchFechasDisponibles = () => dispatch => {
  const token = getToken();
  // const dataUser = getDataUser();
  const options = {
    uri: `${LOCALHOST_SERVER}api/telemedicinaFechasDisponibles`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    json: {
      token,
    },
  };
  request(options, (err, rsp, body) => {
    if (err || rsp.statusCode === 401) {
      dispatch(authActions.renewToken(token, fetchFechasDisponibles));
    }
    if (!err && rsp.statusCode === 200) {
      dispatch(fetchFechasDisponiblesSuccess(body));
    }
  });
};

export const fetchDisponibilidad = especialidad => dispatch => {
  let disp;

  // INICIO BLOQUE HARDCODEADO
  switch (especialidad) {
    case '500':
      disp = 0; // muestro el alert verde con boton
      break;
    case '600':
      disp = 1; // muestro el amarillo
      break;
    default:
      disp = 2; // muestro el alert verde sin boton
  }
  // FIN BLOQUE HARDCODEADO
  dispatch({
    type: FETCH_TELEMEDICINA_DISPONIBILIDAD_SUCCESS,
    data: disp,
  });
};

export const cleanList = () => ({
  type: TELEMEDICINA_CLEAN_LIST_SUCCESS,
});

export const cleanListEspecialidad = () => ({
  type: CLEAN_LIST_ESPECIALIDAD,
});

export const showValidacionesTecnicas = () => ({
  type: SHOW_VALIDACIONES_TECNICAS,
});

// export default fetchDisponibilidad;

function getDataUser() {
  const auth = localStorage.getItem(LOCALSTORAGE_AUTH_KEY);
  let user;
  if (auth) {
    user = {
      prepaga: JSON.parse(auth).user.prepaga,
      contra: JSON.parse(auth).user.contra,
    };
  }
  return user;
}

export const fetchTelemedicinaTurnosSuccess = data => ({
  type: FETCH_TELEMEDICINA_TURNOS_SUCCESS,
  data,
});
export const fetchTelemedicinaTurnosFilter = data => ({
  type: FETCH_TELEMEDICINA_TURNOS_FILTER,
  data,
});

export const getIntegranteSeleccionado = data => dispatch => {
  dispatch({
    type: TELEMEDICINA_INTEGRANTE_SELECCIONADO,
    data,
  });
};

export const deleteTelemedicinaTurnosSuccess = data => ({
  type: DELETE_TELEMEDICINA_TURNOS_SUCCESS,
  data,
});

export const verTelemedicinaTurnosSuccess = data => ({
  type: DETAIL_TELEMEDICINA_TURNOS_SUCCESS,
  data,
});

export const fetchConsultaTurnos = inte => dispatch => {
  const token = getToken();
  const dataUser = getDataUser();
  const options = {
    uri: `${LOCALHOST_SERVER}api/telemedicinaTurnos`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    json: {
      token,
      fechaDesde: '20170625',
      fechaHasta: '20170725',
      contra: dataUser.contra,
      intes: [
        {
          inte,
        },
      ],
      prepaga: dataUser.prepaga,
    },
  };
  request(options, (err, rsp, body) => {
    if (err || rsp.statusCode === 401) {
      dispatch(authActions.renewToken(token, fetchConsultaTurnos));
    }
    if (err || rsp.statusCode === 404) {
      console.log('Error! 404');
    }
    if (!err && rsp.statusCode === 200) {
      dispatch(fetchTelemedicinaTurnosSuccess(body));
    }
  });
};

export const deleteTurno = idTurno => dispatch => {
  const token = getToken();
  const options = {
    uri: `${LOCALHOST_SERVER}api/removeTurnos`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    json: {
      token,
      idTurno,
    },
  };
  request(options, (err, rsp, body) => {
    console.log(rsp.statusCode);
    if (err || rsp.statusCode === 401) {
      dispatch(authActions.renewToken(token, fetchConsultaTurnos));
    }
    if (err || rsp.statusCode === 404) {
      console.log('Error! 404');
    }
    if (!err && rsp.statusCode === 200) {
      dispatch(deleteTelemedicinaTurnosSuccess(body));
    }
  });
};

export const verTurno = idTurno => dispatch => {
  const token = getToken();
  const options = {
    uri: `${LOCALHOST_SERVER}api/detalleTurnos`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    json: {
      token,
      idTurno,
    },
  };
  request(options, (err, rsp, body) => {
    if (err || rsp.statusCode === 401) {
      dispatch(authActions.renewToken(token, fetchConsultaTurnos));
    }
    if (err || rsp.statusCode === 404) {
      console.log('Error! 440');
    }
    if (!err && rsp.statusCode === 200) {
      dispatch(verTelemedicinaTurnosSuccess(body));
    }
  });
};

/** ******************* ESPECIALIDADES *********************** */

export const fetchEspecialidadesSuccess = data => ({
  type: FETCH_ESPECIALIDADES_SUCCESS,
  data,
});

export const fetchEspecialidadesError = error => ({
  type: FETCH_ESPECIALIDADES_ERROR,
  data: error,
});

export const fetchEspecialidades = (sexo, edad) => dispatch => {
  const token = getToken();
  const options = {
    uri: 'http://localhost:3000/api/turnosEspecialidades',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    json: {
      token,
      sexo,
      edad,
    },
  };
  request(options, (err, rsp, body) => {
    if (err || rsp.statusCode === 401) {
      dispatch(fetchEspecialidadesError(err));
    }
    if (!err && rsp.statusCode === 200) {
      dispatch(fetchEspecialidadesSuccess(body));
    }
  });
};
