/**
 * @author Juan Carlos Cancela <cancela.juancarlos@gmail.com>
 */

/* eslint consistent-return: 0 */
import path from 'path';
import Promise from 'bluebird';
import express from 'express';
import cookieParser from 'cookie-parser';
import requestLanguage from 'express-request-language';
import bodyParser from 'body-parser';
import expressGraphQL from 'express-graphql';
import nodeFetch from 'node-fetch';
import React from 'react';
import ReactDOM from 'react-dom/server';
import { getDataFromTree } from 'react-apollo';
import PrettyError from 'pretty-error';
import { IntlProvider } from 'react-intl';
import request from 'request';
import nodemailer from 'nodemailer';

import './serverIntlPolyfill';
import createApolloClient from './core/createApolloClient';
import App from './components/App';
import Html from './components/Html';
import { ErrorPageWithoutStyle } from './routes/error/ErrorPage';
import errorPageStyle from './routes/error/ErrorPage.css';
import createFetch from './createFetch';
import router from './router';
import models from './data/models';
import schema from './data/schema';
import assets from './assets.json'; // eslint-disable-line import/no-unresolved
import configureStore from './store/configureStore';
import { setRuntimeVariable } from './actions/runtime';
import { setLocale } from './actions/intl';
import config from './config';

require('newrelic');

const app = express();

// const URL_SERVER = 'https://mobilepre.swissmedical.com.ar';
const URL_SERVER = 'https://mobileqa.swissmedical.com.ar';
// const URL_SERVER = 'https://mobilepre.swissmedical.com.ar';

// TODO Review later
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

//
// Tell any CSS tooling (such as Material UI) to use all vendor prefixes if the
// user agent is not known.
// -----------------------------------------------------------------------------
global.navigator = global.navigator || {};
global.navigator.userAgent = global.navigator.userAgent || 'all';

//
// Register Node.js middleware
// -----------------------------------------------------------------------------
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(cookieParser());
app.use(
  requestLanguage({
    languages: config.locales,
    queryName: 'lang',
    cookie: {
      name: 'lang',
      options: {
        path: '/',
        maxAge: 3650 * 24 * 3600 * 1000, // 10 years in miliseconds
      },
      url: '/lang/{language}',
    },
  }),
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//
// Send EMail
// -----------------------------------------------------------------------------

app.post('/send', (req, res) => {
  const transporter = nodemailer.createTransport({
    // host: 'smtp.ethereal.email',
    // port: 587,
    // secure: false,
    service: 'Gmail',
    auth: {
      user: 'nose@swissmedical.com',
      pass: 'password',
    },
  });

  const mailOptions = {
    from: req.body.email,
    to: 'sebas.sm.sac@gmail.com',
    subject: req.body.name,
    text: req.body.description,
    // html: '<b>Hello world?</b>',
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(401).send(error);
    }
    return res.status(200).send(info);
  });
});

//
// Authentication
// -----------------------------------------------------------------------------
if (__DEV__) {
  app.enable('trust proxy');
}

app.post('/auth', (req, res) => {
  const url = `${URL_SERVER}/cl/api-smg/v0/auth-login-Client`;
  const documento = req.body.documento;
  const password = req.body.password;
  const json = {
    request: {
      tipodoc: 'DU',
      documento,
      password,
      canal: 'cfe67e56f3c90368a238',
      device: {
        bloqueado: true,
        recordar: true,
        deviceid: 'aaaaahhhgggkkkllllllllll',
        messagingid: 'EsteEsElIDDeMensajeria',
        nombre: 'Juauei 0.8 Mate',
      },
    },
  };

  const options = {
    uri: url,
    method: 'POST',
    json,
  };

  return request(options, (err, rsp, body) => {
    if (err) return res.status(401).send(err);
    if (!err && parseInt(rsp.statusCode, 10) === 200) {
      res.setHeader('content-type', 'application/json');
      return res.status(200).send(body);
    }
  });
});

app.post('/renew-token', (req, res) => {
  const url = `${URL_SERVER}/cl/api-smg/v0/auth-refresh-Client`;
  const { token } = req.body;

  const json = {
    refresh: {
      tipodoc: 'DU',
      canal: 'cfe67e56f3c90368a238',
      device: {
        bloqueado: true,
        recordar: true,
        deviceid: 'aaaaahhhgggkkkllllllllll',
        messagingid: 'EsteEsElIDDeMensajeria',
        nombre: 'Juauei 0.8 Mate',
      },
    },
  };

  const options = {
    uri: url,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Cache-Control': 'no-cache',
      Authorization: `Bearer ${token}`,
    },
    json,
  };

  return request(options, (err, rsp, body) => {
    if (err) {
      return res.status(401).send(err);
    }

    if (parseInt(rsp.statusCode, 10) !== 200) {
      return res.status(401).send(body);
    }
    if (!err && parseInt(rsp.statusCode, 10) === 200) {
      res.setHeader('content-type', 'application/json');
      return res.status(200).send(body);
    }
  });
});

app.post('/api/facturas', (req, res) => {
  const uri =
    'https://mobile.swissmedical.com.ar/cl/api-smg/v0/clientes/0441334/integrantes/01/facturas?desde=20160101&hasta=20170101';
  const { token } = req.body;
  const options = {
    uri,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  request(options, (err, rsp, body) => {
    if (err) {
      return res.status(401).send(err);
    }

    if (parseInt(rsp.statusCode, 10) === 401) {
      return res.status(401).send(body);
    }

    if (!err && parseInt(rsp.statusCode, 10) === 200) {
      res.setHeader('content-type', 'application/json');
      return res.status(200).send(body);
    }
  });
});

//
// INTEGRANTES
//-------------------------------------------------------------------------------

/** ******************* FETCHINTEGRANTES *********************** */
app.post(
  '/api/integrantes',
  (req, res) => {
    const json = [
      {
        inte: '01',
        nombre: 'SERGIO LUIS',
        apellido: 'PIANA',
        edad: '20',
        sexo: 'M',
      },
      {
        inte: '02',
        nombre: 'URSULA LUCILA',
        apellido: 'LLASER',
        edad: '40',
        sexo: 'F',
      },
    ];

    res.status(200).send(json);
  },

  /*
  const fechaDesde = req.body.fechaDesde;
  const fechaHasta = req.body.fechaHasta;
  const intes = req.body.intes;
  const contra = req.body.contra;
  const prepaga = req.body.prepaga;
  const token = req.body.token;
  const uri =
    'https://mobilepre.swissmedical.com.ar/api-smg/v0/turnos/CMA/tomados';

  const json = {
    criteria: {
      fechaDesde,
      fechaHasta,
      contra,
      intes,
      prepaga,
    },
  };

  const options = {
    uri,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    json,
  };

  request(options, (err, rsp, body) => {
    if (err) {
      return res.status(401).send(err);
    }

    if (parseInt(rsp.statusCode, 10) === 401) {
      return res.status(401).send(body);
    }

    if (!err && parseInt(rsp.statusCode, 10) === 200) {
      res.setHeader('content-type', 'application/json');
      return res.status(200).send(body);
    }
  }); */
);

//
// TELEMEDICINA COMIENZO
//-------------------------------------------------------------------------------

/** ******************* FECHAS DISPONIBLES *********************** */
app.post('/api/telemedicinaFechasDisponibles', (req, res) => {
  /* const fechaDesde = req.body.fechaDesde;
  const fechaHasta = req.body.fechaHasta;
  const intes = req.body.intes;
  const contra = req.body.contra;
  const prepaga = req.body.prepaga; */
  const token = req.body.token;
  const uri = `${URL_SERVER}/api-smg/v0/turnos/CMA/fechasDisponibles`;

  const json = {
    criteria: {
      prestad: null,
      dias: ['LUN', 'MAR', 'MIE', 'JUE', 'VIE', 'SAB', 'DOM'],
      fechaDesde: '20161211',
      fechaHasta: '20161225',
      horaDesde: '0000',
      horaHasta: '2359',
      estado: 'L',
      centros: [10],
      practicas: [580],
      esConsultorio: false,
      aplicativo: 'CMA',
      idEspecialidad: 100,
      cantidad: 1,
      sexo: '',
      prepaga: '0',
      contra: '441334',
      inte: '01',
      username: 'darioa',
    },
  };

  const options = {
    uri,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    json,
  };

  request(options, (err, rsp, body) => {
    if (err) {
      return res.status(401).send(err);
    }

    if (parseInt(rsp.statusCode, 10) === 401) {
      return res.status(401).send(body);
    }

    if (!err && parseInt(rsp.statusCode, 10) === 200) {
      res.setHeader('content-type', 'application/json');
      return res.status(200).send(body);
    }
  });
});

//
// TELEMEDICINA TURNOS LISTADO
// ------------------------------------------------------------------------------

/** ******************* LISTAR TURNOS *********************** */
app.post('/api/telemedicinaTurnos', (req, res) => {
  const fechaDesde = req.body.fechaDesde;
  const fechaHasta = req.body.fechaHasta;
  // const intes = req.body.intes;
  const contra = req.body.contra;
  const prepaga = req.body.prepaga;
  const token = req.body.token;
  const uri = `${URL_SERVER}/api-smg/v0/turnos/CMA/tomados`;

  const json = {
    criteria: {
      fechaDesde,
      fechaHasta,
      contra,
      intes: [
        {
          inte: '01',
        },
        {
          inte: '02',
        },
        {
          inte: '03',
        },
      ],
      prepaga,
    },
  };

  const options = {
    uri,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    json,
  };
  request(options, (err, rsp, body) => {
    if (err) {
      return res.status(401).send(err);
    }

    if (parseInt(rsp.statusCode, 10) === 401) {
      return res.status(401).send(body);
    }

    if (!err && parseInt(rsp.statusCode, 10) === 200) {
      res.setHeader('content-type', 'application/json');
      return res.status(200).send(body);
    }
  });
});

//
// TURNOS LISTADO COMIENZO
// ------------------------------------------------------------------------------

/** ******************* LISTAR TURNOS *********************** */
app.post('/api/turnos', (req, res) => {
  const fechaDesde = req.body.fechaDesde;
  const fechaHasta = req.body.fechaHasta;
  const intes = req.body.intes;
  const contra = req.body.contra;
  const prepaga = req.body.prepaga;
  const token = req.body.token;
  const uri = `${URL_SERVER}/api-smg/v0/turnos/CMA/tomados`;

  const json = {
    criteria: {
      fechaDesde,
      fechaHasta,
      contra,
      intes,
      prepaga,
    },
  };

  const options = {
    uri,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    json,
  };

  request(options, (err, rsp, body) => {
    if (err) {
      return res.status(401).send(err);
    }

    if (parseInt(rsp.statusCode, 10) === 401) {
      return res.status(401).send(body);
    }

    if (!err && parseInt(rsp.statusCode, 10) === 200) {
      res.setHeader('content-type', 'application/json');
      return res.status(200).send(body);
    }
  });
});

/** ******************* DETALLE TURNO *********************** */
app.post('/api/detalleTurnos', (req, res) => {
  const idTurno = req.body.idTurno;
  const token = req.body.token;
  const uri = `${URL_SERVER}/api-smg/v0/turnos/CMA/${idTurno}`;

  const options = {
    uri,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  request(options, (err, rsp, body) => {
    if (err) {
      return res.status(401).send(err);
    }

    if (parseInt(rsp.statusCode, 10) === 401) {
      return res.status(401).send(body);
    }

    if (!err && parseInt(rsp.statusCode, 10) === 200) {
      res.setHeader('content-type', 'application/json');
      return res.status(200).send(body);
    }
  });
});

/** ******************* DELETE TURNO *********************** */
app.post('/api/removeTurnos', (req, res) => {
  const idTurno = req.body.idTurno;
  const token = req.body.token;
  const uri = `${URL_SERVER}/api-smg/v0/turnos/CMA/${idTurno}`;

  const json = {
    observacion: 'Baja generada desde la Web',
    username: 'Usuario WEB',
  };

  const options = {
    uri,
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    json,
  };

  request(options, (err, rsp, body) => {
    if (err) {
      return res.status(401).send(err);
    }

    if (parseInt(rsp.statusCode, 10) === 401) {
      return res.status(401).send(body);
    }

    if (!err && parseInt(rsp.statusCode, 10) === 200) {
      res.setHeader('content-type', 'application/json');
      return res.status(200).send(body);
    }
  });
});
//
// TURNOS LISTADO FIN
// ------------------------------------------------------------------------------

//
// TURNOS SOLICITUD COMIENZO
// ------------------------------------------------------------------------------

/** ******************* MAESTROS ESPECIALIDADES *********************** */
app.post('/api/turnosEspecialidades', (req, res) => {
  const uri = `${URL_SERVER}/api-smg/v0/turnos/CMA/especialidades?edad=${req
    .body.edad}&sexo=${req.body.sexo}`;
  const token = req.body.token;
  const options = {
    uri,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  return request(options, (err, rsp, body) => {
    if (err) return res.status(401).send(err);
    if (!err && parseInt(rsp.statusCode, 10) === 200) {
      res.setHeader('content-type', 'application/json');
      return res.status(200).send(body);
    }
  });
});

/** ******************* MAESTROS PRACTICAS *********************** */
app.post('/api/turnosPracticas', (req, res) => {
  const uri = `${URL_SERVER}/api-smg/v0/turnos/CMA/practicas?edad=${req.body
    .edad}&sexo=${req.body.sexo}&especialidad=${req.body.especialidad}`;
  const token = req.body.token;
  const options = {
    uri,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  return request(options, (err, rsp, body) => {
    if (err) return res.status(401).send(err);
    if (!err && parseInt(rsp.statusCode, 10) === 200) {
      res.setHeader('content-type', 'application/json');
      return res.status(200).send(body);
    }
  });
});

/** ******************* MAESTROS CENTROS *********************** */
app.post('/api/turnosCentros', (req, res) => {
  const uri = `${URL_SERVER}/api-smg/v0/turnos/CMA/centros?edad=${req.body
    .edad}&sexo=${req.body.sexo}&especialidad=${req.body
    .especialidad}&practica=${req.body.practica}`;

  // const uri = 'https://mobileqa.swissmedical.com.ar/api-smg/v0/turnos/CMA/centros?edad=32&sexo=M&especialidad=500&practica=1651';
  const token = req.body.token;
  const options = {
    uri,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  return request(options, (err, rsp, body) => {
    if (err) return res.status(401).send(err);
    if (!err && parseInt(rsp.statusCode, 10) === 200) {
      res.setHeader('content-type', 'application/json');
      return res.status(200).send(body);
    }
  });
});

/** ******************* GET PREPARACIONES *********************** */
app.post('/api/turnosPreparaciones', (req, res) => {
  /*
  const uri =
    'https://mobileqa.swissmedical.com.ar/api-smg/v0/turnos/CMA/preparaciones?prestacion=EC01008&filtro=A';     
  */
  const uri = `${URL_SERVER}/api-smg/v0/turnos/CMA/preparaciones?prestacion=${req
    .body.prestacion}&filtro=${req.body.filtro}`; // &consulta=${req.body.consulta}
  const token = req.body.token;
  const options = {
    uri,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  return request(options, (err, rsp, body) => {
    if (err) return res.status(401).send(err);
    if (!err && parseInt(rsp.statusCode, 10) === 200) {
      res.setHeader('content-type', 'application/json');
      return res.status(200).send(body);
    }
  });
});

/** ******************* GET PROFESIONALES *********************** */
app.post('/api/turnosProfesionales', (req, res) => {
  const uri = `${URL_SERVER}/api-smg/v0/turnos/CMA/prestadores?edad=${req.body
    .edad}&sexo=${req.body.sexo}&especialidad=${req.body
    .especialidad}&practica=${req.body.practica}&centro=${req.body.centro}`;
  /*
  const uri =
    'https://mobileqa.swissmedical.com.ar/api-smg/v0/turnos/CMA/prestadores?edad=32&sexo=M&especialidad=600&practica=1403&centro=16';     
  */
  const token = req.body.token;
  const options = {
    uri,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  return request(options, (err, rsp, body) => {
    if (err) return res.status(401).send(err);
    if (!err && parseInt(rsp.statusCode, 10) === 200) {
      res.setHeader('content-type', 'application/json');
      return res.status(200).send(body);
    }
  });
});

/** ******************* GET PRIMER FECHA DISPONIBLE *********************** */
app.post('/api/turnosPrimerFechaDisponible', (req, res) => {
  const uri = `${URL_SERVER}/api-smg/v0/turnos/CMA/primerFechaDisponible`;
  const dataTurno = req.body.newData;
  let json = {
    criteria: {
      prestad: dataTurno.prestad,
      dias: dataTurno.dias,
      fechaDesde: dataTurno.fechaDesde,
      horaDesde: dataTurno.horaDesde,
      horaHasta: dataTurno.horaHasta,
      primeraVez: dataTurno.primeraVez,
      estado: dataTurno.estado,
      centros: dataTurno.centros,
      practicas: dataTurno.practicas,
      esConsultorio: dataTurno.esConsultorio,
      idEspecialidad: dataTurno.idEspecialidad,
      cantidad: dataTurno.cantidad,
      sexo: dataTurno.sexo,
      prepaga: dataTurno.prepaga,
      contra: dataTurno.contra,
      inte: dataTurno.inte,
      username: dataTurno.username,
    },
  };

  json = {
    criteria: {
      prestad: '21994',
      dias: ['LUN', 'MAR', 'MIE', 'JUE', 'VIE'],
      fechaDesde: '20171020',
      horaDesde: '0000',
      horaHasta: '2359',
      primeraVez: true,
      estado: 'L',
      centros: [4, 16, 11, 13, 8, 15, 10],
      practicas: [540, 1599],
      soloFecha: true,
      esConsultorio: false,
      idEspecialidad: 900,
      cantidad: 1,
      sexo: '',
      prepaga: '0',
      contra: '441334',
      inte: '01',
    },
  };

  const options = {
    uri,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${dataTurno.token}`,
    },
    json,
  };

  return request(options, (err, rsp, body) => {
    if (err) return res.status(401).send(err);
    if (!err && parseInt(rsp.statusCode, 10) === 200) {
      res.setHeader('content-type', 'application/json');
      return res.status(200).send(body);
    }
  });
});

/** ******************* GET TURNO POR FECHA *********************** */
app.post('/api/turnosTurnoPorFecha', (req, res) => {
  const uri = `${URL_SERVER}/api-smg/v0/turnos/CMA/consulta`;
  const dataTurno = req.body.newData;
  let json = {
    criteria: {
      prestad: dataTurno.prestad,
      dias: dataTurno.dias,
      fechaDesde: dataTurno.fechaDesde,
      horaDesde: dataTurno.horaDesde,
      horaHasta: dataTurno.horaHasta,
      primeraVez: dataTurno.primeraVez,
      estado: dataTurno.estado,
      centros: dataTurno.centros,
      practicas: dataTurno.practicas,
      soloFecha: dataTurno.soloFecha,
      esConsultorio: dataTurno.esConsultorio,
      idEspecialidad: dataTurno.idEspecialidad,
      cantidad: dataTurno.cantidad,
      sexo: dataTurno.sexo,
      prepaga: dataTurno.prepaga,
      contra: dataTurno.contra,
      inte: dataTurno.inte,
    },
  };

  json = {
    criteria: {
      prestad: '21994',
      dias: ['LUN', 'MAR', 'MIE', 'JUE', 'VIE', 'SAB', 'DOM'],
      fechaDesde: '20161201',
      horaDesde: '0000',
      horaHasta: '2359',
      primeraVez: true,
      estado: 'L',
      centros: [4, 16, 11, 13, 8, 15, 10],
      practicas: [540],
      esConsultorio: false,
      aplicativo: 'CMA',
      idEspecialidad: 900,
      cantidad: 1,
      sexo: '',
      prepaga: '0',
      contra: '441334',
      inte: '01',
      username: 'darioa',
    },
  };

  const options = {
    uri,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${dataTurno.token}`,
    },
    json,
  };

  return request(options, (err, rsp, body) => {
    if (err) return res.status(401).send(err);
    if (!err && parseInt(rsp.statusCode, 10) === 200) {
      res.setHeader('content-type', 'application/json');
      return res.status(200).send(body);
    }
  });
});

//
// TURNOS SOLICITUD FIN
// ------------------------------------------------------------------------------

//
// TURNOS CONFIRMACION INICIO
// -

/** ******************* CONSULTA DE MAILS *********************** */
app.post('/api/TurnosEmail', (req, res) => {
  const token = req.body.token;
  const contra = req.body.contra;
  const inte = req.body.inte;
  const prepaga = req.body.prepaga;
  const uri = `${URL_SERVER}/api-smg/v0/afiliados/emails/${prepaga}/${contra}/${inte}`;

  const options = {
    uri,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  request(options, (err, rsp, body) => {
    if (err) {
      return res.status(401).send(err);
    }

    if (parseInt(rsp.statusCode, 10) === 401) {
      return res.status(401).send(body);
    }

    if (!err && parseInt(rsp.statusCode, 10) === 200) {
      res.setHeader('content-type', 'application/json');
      return res.status(200).send(body);
    }
  });
});

/** ******************* CONSULTA DE TELEFONOS *********************** */
app.post('/api/TurnosPhone', (req, res) => {
  const token = req.body.token;
  const contra = req.body.contra;
  const inte = req.body.inte;
  const prepaga = req.body.prepaga;
  const uri = `${URL_SERVER}/api-smg/v0/afiliados/telefonos/${prepaga}/${contra}/${inte}`;
  // const uri = `https://mobilepre.swissmedical.com.ar/api-smg/v0/afiliados/telefonos/0/0801415/01`;

  const options = {
    uri,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  request(options, (err, rsp, body) => {
    if (err) {
      return res.status(401).send(err);
    }

    if (parseInt(rsp.statusCode, 10) === 401) {
      return res.status(401).send(body);
    }

    if (!err && parseInt(rsp.statusCode, 10) === 200) {
      res.setHeader('content-type', 'application/json');
      return res.status(200).send(body);
    }
  });
});

//
// TURNOS CONFIRMACION FIN
// ------------------------------------------------------------------------------

//
// Register API middleware
// -----------------------------------------------------------------------------
const graphqlMiddleware = expressGraphQL(req => ({
  schema,
  graphiql: __DEV__,
  rootValue: { request: req },
  pretty: __DEV__,
}));

app.use('/graphql', graphqlMiddleware);

//
// Register server-side rendering middleware
// -----------------------------------------------------------------------------
app.get('*', async (req, res, next) => {
  try {
    const apolloClient = createApolloClient({
      schema,
      rootValue: { request: req },
    });

    // Universal HTTP client
    const fetch = createFetch(nodeFetch, {
      baseUrl: config.api.serverUrl,
      cookie: req.headers.cookie,
      apolloClient,
    });

    const initialState = {
      user: req.user || null,
    };

    const store = configureStore(initialState, {
      cookie: req.headers.cookie,
      apolloClient,
      fetch,
      // I should not use `history` on server.. but how I do redirection? follow universal-router
      history: null,
    });

    store.dispatch(
      setRuntimeVariable({
        name: 'initialNow',
        value: Date.now(),
      }),
    );

    store.dispatch(
      setRuntimeVariable({
        name: 'availableLocales',
        value: config.locales,
      }),
    );

    const locale = req.language;
    const intl = await store.dispatch(
      setLocale({
        locale,
      }),
    );

    const css = new Set();

    // Global (context) variables that can be easily accessed from any React component
    // https://facebook.github.io/react/docs/context.html
    const context = {
      // Enables critical path CSS rendering
      // https://github.com/kriasoft/isomorphic-style-loader
      insertCss: (...styles) => {
        // eslint-disable-next-line no-underscore-dangle
        styles.forEach(style => css.add(style._getCss()));
      },
      fetch,
      // You can access redux through react-redux connect
      store,
      storeSubscription: null,
      // Apollo Client for use with react-apollo
      client: apolloClient,
      // intl instance as it can be get with injectIntl
      intl,
    };

    const route = await router.resolve({
      ...context,
      path: req.path,
      query: req.query,
      locale,
    });

    if (route.redirect) {
      res.redirect(route.status || 302, route.redirect);
      return;
    }

    const data = { ...route };

    const rootComponent = (
      <App context={context} store={store}>
        {route.component}
      </App>
    );
    await getDataFromTree(rootComponent);
    // this is here because of Apollo redux APOLLO_QUERY_STOP action
    await Promise.delay(0);
    data.children = await ReactDOM.renderToString(rootComponent);
    data.styles = [{ id: 'css', cssText: [...css].join('') }];

    data.scripts = [assets.vendor.js];
    if (route.chunks) {
      data.scripts.push(...route.chunks.map(chunk => assets[chunk].js));
    }
    data.scripts.push(assets.client.js);

    // Furthermore invoked actions will be ignored, client will not receive them!
    if (__DEV__) {
      // eslint-disable-next-line no-console
      console.log('Serializing store...');
    }
    data.app = {
      apiUrl: config.api.clientUrl,
      state: context.store.getState(),
      lang: locale,
    };

    const html = ReactDOM.renderToStaticMarkup(<Html {...data} />);
    res.status(route.status || 200);
    res.send(`<!doctype html>${html}`);
  } catch (err) {
    next(err);
  }
});

//
// Error handling
// -----------------------------------------------------------------------------
const pe = new PrettyError();
pe.skipNodeFiles();
pe.skipPackage('express');

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const locale = req.language;
  console.error(pe.render(err));
  const html = ReactDOM.renderToStaticMarkup(
    <Html
      title="Internal Server Error"
      description={err.message}
      styles={[{ id: 'css', cssText: errorPageStyle._getCss() }]} // eslint-disable-line no-underscore-dangle
      app={{ lang: locale }}
    >
      {ReactDOM.renderToString(
        <IntlProvider locale={locale}>
          <ErrorPageWithoutStyle error={err} />
        </IntlProvider>,
      )}
    </Html>,
  );
  res.status(err.status || 500);
  res.send(`<!doctype html>${html}`);
});

//
// Launch the server
// -----------------------------------------------------------------------------
const promise = models.sync().catch(err => console.error(err.stack));
if (!module.hot) {
  promise.then(() => {
    app.listen(config.port, () => {
      console.info(`The server is running at http://localhost:${config.port}/`);
    });
  });
}

//
// Hot Module Replacement
// -----------------------------------------------------------------------------
if (module.hot) {
  app.hot = module.hot;
  module.hot.accept('./router');
}

export default app;
