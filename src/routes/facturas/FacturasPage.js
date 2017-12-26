/**
 * @author Juan Carlos Cancela <cancela.juancarlos@gmail.com>
 */

import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './FacturasPage.css';
import TablaFacturas from '../../components/TablaFacturas/TablaFacturas';

class FacturasPage extends React.Component {
  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <TablaFacturas />
        </div>
      </div>
    );
  }
}

export default withStyles(s)(FacturasPage);
