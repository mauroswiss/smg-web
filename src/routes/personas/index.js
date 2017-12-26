/**
 * @author Juan Carlos Cancela <cancela.juancarlos@gmail.com>
 */

import React from 'react';
import PersonasPage from './PersonasPage';
import Layout from '../../components/Layout';

async function action() {
  return {
    chunks: ['personas'],
    title: 'SMG - Personas',
    component: (
      <Layout>
        <PersonasPage />
      </Layout>
    ),
  };
}

export default action;
