import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './TurnosPageUserLoggedIn.css';
import TurnosList from '../../components/Turnos/TurnosList/TurnosList';
import TurnosFilter from '../../components/Turnos/TurnosFilter/TurnosFilter';
import Link from '../../components/Link';

class TurnosPageUserLoggedIn extends React.Component {
  render() {
    return (
      <div className={`${s.root}`}>
        <div className={`${s.container} row`}>
          <div className="col-md-7 padding-top25">
            <h2 className={`${s.h2}`}>Consulta de turnos</h2>
            <TurnosFilter />
            <TurnosList />
          </div>
          <div
            className={`${s.divSeparador} col-md-1 hidden-xs padding-top25`}
          />
          <div className="col-md-4 padding-top25">
            <h2 className={`${s.h2}`}>Nuevo turno</h2>
            <div className={`${s.divLeyenda} col-md-12`}>
              <small>
                Solicite turnos en nuestras clínicas y centros médicos
                ambulatorios con la mayor comodidad.
              </small>
            </div>
            <Link
              to="../turnosSolicitud"
              className={`${s.boton_rojo} btn btn-danger pull-left`}
            >
              Solicitar
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(TurnosPageUserLoggedIn);
