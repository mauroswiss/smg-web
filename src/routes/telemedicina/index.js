import React from 'react';
import TelemedicinaPage from './TelemedicinaPage';
import Layout from '../../components/Layout';

async function action() {
  return {
    chunks: ['telemedicina'],
    title: 'Telemedicina',
    component: (
      <Layout>
        <TelemedicinaPage />
      </Layout>
    ),
  };
}

export default action;
