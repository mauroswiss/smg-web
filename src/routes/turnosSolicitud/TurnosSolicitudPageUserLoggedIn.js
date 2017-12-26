import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './TurnosSolicitudPageUserLoggedIn.css';
import TurnosSolicitudComponent from '../../components/TurnosSolicitud/TurnosSolicitud';

class TurnosSolicitud extends React.Component {
  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <TurnosSolicitudComponent />
        </div>
      </div>
    );
  }
}

export default withStyles(s)(TurnosSolicitud);
