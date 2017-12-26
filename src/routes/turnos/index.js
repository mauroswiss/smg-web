/**
 * @author Juan Carlos Cancela <cancela.juancarlos@gmail.com>
 */

import React from 'react';
import TurnosPage from './TurnosPage';
import Layout from '../../components/Layout';

async function action() {
  return {
    chunks: ['turnos'],
    title: 'Turnos',
    component: (
      <Layout>
        <TurnosPage />
      </Layout>
    ),
  };
}

export default action;
