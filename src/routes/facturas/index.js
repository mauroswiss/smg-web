import React from 'react';
import { defineMessages } from 'react-intl';
import Layout from '../../components/Layout';
import FacturasPage from './FacturasPage';

const messages = defineMessages({
  title: {
    id: 'login.title',
    description: 'Facturas',
    defaultMessage: 'Facturas',
  },
});

function action({ intl }) {
  const title = intl.formatMessage(messages.title);
  return {
    chunks: ['facturas'],
    title,
    component: (
      <Layout>
        <FacturasPage title={title} />
      </Layout>
    ),
  };
}

export default action;
