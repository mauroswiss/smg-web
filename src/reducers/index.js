import { combineReducers } from 'redux';
import user from './user';
import auth from './auth';
import facturas from './facturas';
import runtime from './runtime';
import intl from './intl';
import footer from './footer';
import turnos from './turnos';
import integrantes from './integrantes';
import sendEmail from './sendEmail';
import loading from './loading';
import telemedicina from './telemedicina';

export default function createRootReducer({ apolloClient }) {
  return combineReducers({
    apollo: apolloClient.reducer(),
    user,
    auth,
    facturas,
    runtime,
    intl,
    footer,
    turnos,
    integrantes,
    sendEmail,
    loading,
    telemedicina,
  });
}
