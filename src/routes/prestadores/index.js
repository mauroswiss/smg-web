/**
 * @author Juan Carlos Cancela <cancela.juancarlos@gmail.com>
 */

import React from 'react';
import PrestadoresPage from './PrestadoresPage';
import Layout from '../../components/Layout';

async function action() {
  return {
    chunks: ['prestadores'],
    title: 'SMG - Prestadores',
    component: (
      <Layout>
        <PrestadoresPage />
      </Layout>
    ),
  };
}

export default action;
