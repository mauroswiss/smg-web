/**
 * @author Juan Carlos Cancela <cancela.juancarlos@gmail.com>
 */

import React from 'react';
import EmpresasPage from './EmpresasPage';
import Layout from '../../components/Layout';

async function action() {
  return {
    chunks: ['empresas'],
    title: 'SMG - Empresas',
    component: (
      <Layout>
        <EmpresasPage />
      </Layout>
    ),
  };
}

export default action;
