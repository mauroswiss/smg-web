/**
 * @author Esteban Huerta <caaweasadgrsgfdgsdfergsdfadfsf.huerta@gmail.com>
 */

import React from 'react';
import TurnosSolicitudPage from './TurnosSolicitudPage';
import Layout from '../../components/Layout';

async function action() {
  return {
    chunks: ['turnosSolicitud'],
    title: 'SMG - Solicitud de turnos',
    component: (
      <Layout>
        <TurnosSolicitudPage />
      </Layout>
    ),
  };
}

export default action;
