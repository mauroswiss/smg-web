/**
 * @author Juan Carlos Cancela <cancela.juancarlos@gmail.com>
 */

import React from 'react';
import ProveedoresPage from './ProveedoresPage';
import Layout from '../../components/Layout';

async function action() {
  return {
    chunks: ['proveedores'],
    title: 'SMG - Proveedores',
    component: (
      <Layout>
        <ProveedoresPage />
      </Layout>
    ),
  };
}

export default action;
