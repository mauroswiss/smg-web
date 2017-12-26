import request from 'request';
import * as authActions from './authActions';
import {
  FETCH_TURNOS_SUCCESS,
  FETCH_DETALLE_TURNOS_SUCCESS,
  FETCH_REMOVE_TURNOS_SUCCESS,
  LOCALSTORAGE_AUTH_KEY,
  FETCH_ESPECIALIDADES_SUCCESS,
  FETCH_ESPECIALIDADES_ERROR,
  FETCH_PRACTICAS_SUCCESS,
  FETCH_PRACTICAS_ERROR,
  FETCH_CENTROS_SUCCESS,
  FETCH_CENTROS_ERROR,
  CLEAN_TURNOS_LIST,
  FETCH_PREPARACIONES_SUCCESS,
  FETCH_PREPARACIONES_ERROR,
  FETCH_PROFESIONALES_SUCCESS,
  FETCH_PROFESIONALES_ERROR,
  FETCH_PRIMER_FECHA_DISPONIBLE_SUCCESS,
  FETCH_PRIMER_FECHA_DISPONIBLE_ERROR,
  FETCH_TURNO_POR_FECHA_SUCCESS,
  FETCH_TURNO_POR_FECHA_ERROR,
  CLEAN_TURNOS_DELETED,
  FETCH_EMAIL_ERROR,
  FETCH_EMAIL_SUCCESS,
  FETCH_PHONE_SUCCESS,
  FETCH_PHONE_ERROR,
  LOCALHOST_SERVER,
} from '../constants/index';

function getToken() {
  const auth = localStorage.getItem(LOCALSTORAGE_AUTH_KEY);
  let token;
  if (auth) {
    token = JSON.parse(auth).token;
  }
  return token;
}

function getDataUser() {
  const auth = localStorage.getItem(LOCALSTORAGE_AUTH_KEY);
  let user;
  if (auth) {
    user = {
      prepaga: JSON.parse(auth).user.prepaga,
      contra: JSON.parse(auth).user.contra,
      inte: JSON.parse(auth).user.inte,
    };
  }
  return user;
}

//
// TURNOS LISTADO COMIENZO
// ------------------------------------------------------------------------------

export const cleanListTurnos = () => ({
  type: CLEAN_TURNOS_LIST,
});

export const cleanTurnosDeleted = () => ({
  type: CLEAN_TURNOS_DELETED,
});

export const fetchTurnosSuccess = (data, fechaDesde, fechaHasta) => ({
  type: FETCH_TURNOS_SUCCESS,
  data,
  fechaDesde,
  fechaHasta,
});

export const fetchTurnos = (fechaDesde, fechaHasta) => dispatch => {
  const token = getToken();
  const dataUser = getDataUser();
  const options = {
    uri: `${LOCALHOST_SERVER}api/turnos`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    json: {
      token,
      fechaDesde,
      fechaHasta,
      contra: dataUser.contra,
      intes: [
        {
          inte: dataUser.inte,
        },
      ],
      prepaga: dataUser.prepaga,
    },
  };

  request(options, (err, rsp, body) => {
    if (err || rsp.statusCode === 401) {
      dispatch(authActions.renewToken(token, fetchTurnos));
    }
    if (!err && rsp.statusCode === 200) {
      dispatch(fetchTurnosSuccess(body, fechaDesde, fechaHasta));
    }
  });
};

export const fetchDetalleTurnosSuccess = data => ({
  type: FETCH_DETALLE_TURNOS_SUCCESS,
  data,
});

export const fetchDetalleTurnos = idTurno => dispatch => {
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
      dispatch(authActions.renewToken(token, fetchDetalleTurnos));
    }
    if (!err && rsp.statusCode === 200) {
      dispatch(fetchDetalleTurnosSuccess(body));
    }
  });
};

export const fetchRemoveTurnosSuccess = data => ({
  type: FETCH_REMOVE_TURNOS_SUCCESS,
  data,
});

export const fetchRemoveTurnos = idTurno => dispatch => {
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
    if (err || rsp.statusCode === 401) {
      dispatch(authActions.renewToken(token, fetchRemoveTurnos));
    }
    if (!err && rsp.statusCode === 200) {
      // const resp = '{"mensajerespuesta":"","estadoOk":false}';
      // dispatch(fetchRemoveTurnosSuccess(JSON.parse(resp)));
      dispatch(fetchRemoveTurnosSuccess(body));
    }
  });
};

//
// TURNOS LISTADO FIN
// ------------------------------------------------------------------------------

//
// TURNOS SOLICITUD COMIENZO
// ------------------------------------------------------------------------------

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
    uri: `${LOCALHOST_SERVER}api/turnosEspecialidades`,
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

/** ******************* PRACTICAS *********************** */

export const fetchPracticasSuccess = data => ({
  type: FETCH_PRACTICAS_SUCCESS,
  data,
});

export const fetchPracticasError = error => ({
  type: FETCH_PRACTICAS_ERROR,
  data: error,
});

export const fetchPracticas = (sexo, edad, especialidad) => dispatch => {
  const token = getToken();
  const options = {
    uri: `${LOCALHOST_SERVER}api/turnosPracticas`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    json: {
      token,
      sexo,
      edad,
      especialidad,
    },
  };
  request(options, (err, rsp, body) => {
    if (err || rsp.statusCode === 401) {
      dispatch(fetchPracticasError(err));
    }
    if (!err && rsp.statusCode === 200) {
      dispatch(fetchPracticasSuccess(body));
    }
  });
};

/** ******************* CENTROS *********************** */

export const fetchCentrosSuccess = data => ({
  type: FETCH_CENTROS_SUCCESS,
  data,
});

export const fetchCentrosError = error => ({
  type: FETCH_CENTROS_ERROR,
  data: error,
});

export const fetchCentros = (
  sexo,
  edad,
  especialidad,
  practica,
) => dispatch => {
  const token = getToken();
  const options = {
    uri: `${LOCALHOST_SERVER}api/turnosCentros`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    json: {
      token,
      sexo,
      edad,
      especialidad,
      practica,
    },
  };
  request(options, (err, rsp, body) => {
    if (err || rsp.statusCode === 401) {
      dispatch(fetchCentrosError(err));
    }
    if (!err && rsp.statusCode === 200) {
      dispatch(fetchCentrosSuccess(body));
    }
  });
};

/** ******************* PREPARACIONES *********************** */

export const fetchPreparacionesSuccess = data => ({
  type: FETCH_PREPARACIONES_SUCCESS,
  data,
});

export const fetchPreparacionesError = error => ({
  type: FETCH_PREPARACIONES_ERROR,
  data: error,
});

export const fetchPreparaciones = (
  prestacion,
  filtro,
  consulta,
) => dispatch => {
  const token = getToken();
  const options = {
    uri: `${LOCALHOST_SERVER}api/turnosPreparaciones`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    json: {
      token,
      prestacion,
      filtro,
      consulta,
    },
  };
  request(options, (err, rsp, body) => {
    if (err || rsp.statusCode === 401) {
      dispatch(fetchPreparacionesError(err));
    }
    if (!err && rsp.statusCode === 200) {
      dispatch(fetchPreparacionesSuccess(body));
    }
  });
};

/** ******************* CARGA PROFESIONALES *********************** */

export const fetchProfesionalesSuccess = data => ({
  type: FETCH_PROFESIONALES_SUCCESS,
  data,
});

export const fetchProfesionalesError = error => ({
  type: FETCH_PROFESIONALES_ERROR,
  data: error,
});

export const fetchProfesionales = (
  edad,
  especialidad,
  practica,
  centro,
  sexo,
) => dispatch => {
  const token = getToken();
  const options = {
    uri: `${LOCALHOST_SERVER}api/turnosProfesionales`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    json: {
      token,
      edad,
      sexo,
      especialidad,
      practica,
      centro,
    },
  };
  request(options, (err, rsp, body) => {
    if (err || rsp.statusCode === 401) {
      dispatch(fetchProfesionalesError(err));
    }
    if (!err && rsp.statusCode === 200) {
      dispatch(fetchProfesionalesSuccess(body));
    }
  });
};

/** ******************* BUSQUEDA PRIMER TURNO DISPONIBLE *********************** */

export const fetchPrimerFechaDisponibleSuccess = data => ({
  type: FETCH_PRIMER_FECHA_DISPONIBLE_SUCCESS,
  data,
});

export const fetchPrimerFechaDisponibleError = error => ({
  type: FETCH_PRIMER_FECHA_DISPONIBLE_ERROR,
  data: error,
});

export const fetchPrimerFechaDisponible = data => dispatch => {
  const auth = localStorage.getItem(LOCALSTORAGE_AUTH_KEY);
  let prepaga;
  let contra;
  let inte;
  let token;

  if (auth) {
    const authJson = JSON.parse(auth);
    prepaga = authJson.user.prepaga;
    contra = authJson.user.contra;
    inte = authJson.user.inte;
    token = authJson.token;
  }

  const newData = { ...data };
  newData.prepaga = prepaga.toString();
  newData.contra = contra;
  newData.inte = inte;
  newData.token = token;

  const options = {
    uri: `${LOCALHOST_SERVER}api/turnosPrimerFechaDisponible`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    json: {
      newData,
    },
  };
  request(options, (err, rsp, body) => {
    if (err || rsp.statusCode === 401) {
      dispatch(fetchPrimerFechaDisponibleError(err));
    }
    if (!err && rsp.statusCode === 200) {
      dispatch(fetchPrimerFechaDisponibleSuccess(body));
    }
  });
};

/** ******************* BUSQUEDA TURNO POR FECHA *********************** */

export const fetchTurnoPorFechaSuccess = data => ({
  type: FETCH_TURNO_POR_FECHA_SUCCESS,
  data,
});

export const fetchTurnoPorFechaError = error => ({
  type: FETCH_TURNO_POR_FECHA_ERROR,
  data: error,
});

export const fetchTurnoPorFecha = data => dispatch => {
  const auth = localStorage.getItem(LOCALSTORAGE_AUTH_KEY);
  let prepaga;
  let contra;
  let inte;
  let token;

  if (auth) {
    const authJson = JSON.parse(auth);
    prepaga = authJson.user.prepaga;
    contra = authJson.user.contra;
    inte = authJson.user.inte;
    token = authJson.token;
  }

  const newData = { ...data };
  newData.prepaga = prepaga.toString();
  newData.contra = contra;
  newData.inte = inte;
  newData.token = token;

  const options = {
    uri: `${LOCALHOST_SERVER}api/turnosTurnoPorFecha`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    json: {
      newData,
    },
  };
  request(options, (err, rsp, body) => {
    if (err || rsp.statusCode === 401) {
      dispatch(fetchTurnoPorFechaError(err));
    }
    if (!err && rsp.statusCode === 200) {
      dispatch(fetchTurnoPorFechaSuccess(body));
    }
  });
};

//
// TURNOS SOLICITUD FIN
// ------------------------------------------------------------------------------

//
// TURNOS CONFIRMACION COMIENZO
//

/** ******************* EMAILS *********************** */

export const fetchEmailSuccess = data => ({
  type: FETCH_EMAIL_SUCCESS,
  data,
});

export const fetchEmailError = error => ({
  type: FETCH_EMAIL_ERROR,
  data: error,
});

export const fetchEmail = () => dispatch => {
  const token = getToken();
  const dataUser = getDataUser();
  const options = {
    uri: `${LOCALHOST_SERVER}api/turnosEmail`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    json: {
      token,
      contra: dataUser.contra,
      inte: dataUser.inte,
      prepaga: dataUser.prepaga,
    },
  };
  request(options, (err, rsp, body) => {
    if (err || rsp.statusCode === 401) {
      dispatch(fetchEmailError(err));
    }
    if (!err && rsp.statusCode === 200) {
      dispatch(fetchEmailSuccess(body));
    }
  });
};

/** ******************* PHONES *********************** */

export const fetchPhoneSuccess = data => ({
  type: FETCH_PHONE_SUCCESS,
  data,
});

export const fetchPhoneError = error => ({
  type: FETCH_PHONE_ERROR,
  data: error,
});

export const fetchPhone = () => dispatch => {
  const token = getToken();
  const dataUser = getDataUser();
  const options = {
    uri: `${LOCALHOST_SERVER}api/turnosPhone`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    json: {
      token,
      contra: dataUser.contra,
      inte: dataUser.inte,
      prepaga: dataUser.prepaga,
    },
  };
  request(options, (err, rsp, body) => {
    if (err || rsp.statusCode === 401) {
      dispatch(fetchPhoneError(err));
    }
    if (!err && rsp.statusCode === 200) {
      dispatch(fetchPhoneSuccess(body));
    }
  });
};
//
// TURNOS CONFIRMACION FIN
// ------------------------------------------------------------------------------
