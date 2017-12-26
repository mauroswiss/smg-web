/**
 * @author Juan Carlos Cancela <cancela.juancarlos@gmail.com>
 */

import React from 'react';
import RrhhPage from './RrhhPage';
import Layout from '../../components/Layout';

async function action() {
  return {
    chunks: ['rrhh'],
    title: 'SMG - RRHH',
    component: (
      <Layout>
        <RrhhPage />
      </Layout>
    ),
  };
}

export default action;
