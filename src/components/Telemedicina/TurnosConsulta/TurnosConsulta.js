/* eslint react/no-did-mount-set-state: 0 */
/* eslint react/prop-types: 0 */
/* eslint consistent-return: 0 */

import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import TurnosConsultaFilter from '../TurnosConsultaFilter/TurnosConsultaFilter';
import TurnosConsultaList from '../TurnosConsultaList/TurnosConsultaList';

class TurnosConsulta extends React.Component {
  render() {
    return (
      <div>
        <TurnosConsultaFilter />
        <TurnosConsultaList />
      </div>
    );
  }
}

export default withStyles()(TurnosConsulta);
