/**
 * @author Juan Carlos Cancela <cancela.juancarlos@gmail.com>
 */

import React from 'react';
import HomePage from './HomePage';
import Layout from '../../components/Layout';

async function action() {
  return {
    chunks: ['home'],
    title: 'SMG',
    component: (
      <Layout>
        <HomePage />
      </Layout>
    ),
  };
}

export default action;
