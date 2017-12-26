import React from 'react';
import ConsultaTurnosPage from './ConsultaTurnosPage';
import Layout from '../../../components/Layout';

async function action() {
  return {
    chunks: ['telemedicinaConsultaTurnos'],
    title: 'Telemedicina Consulta de Turnos',
    component: (
      <Layout>
        <ConsultaTurnosPage />
      </Layout>
    ),
  };
}

export default action;
