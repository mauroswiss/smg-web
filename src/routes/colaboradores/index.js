/**
 * @author Juan Carlos Cancela <cancela.juancarlos@gmail.com>
 */

import React from 'react';
import ColaboradoresPage from './ColaboradoresPage';
import Layout from '../../components/Layout';

async function action() {
  return {
    chunks: ['colaboradores'],
    title: 'SMG - Colaboradores',
    component: (
      <Layout>
        <ColaboradoresPage />
      </Layout>
    ),
  };
}

export default action;
