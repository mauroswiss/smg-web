/* eslint react/prop-types: 0 */
/* eslint class-methods-use-this:0 */
import React from 'react';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import _ from 'lodash';
import Trash from '../../../../public/images/ic_trash.png';
import Search from '../../../../public/images/ic_search.png';
import * as telemedicinaActions from '../../../actions/telemedicinaActions';

class TurnosConsultaList extends React.Component {
  componentDidMount() {
    this.cargarTurnosDisponibles();
  }

  componentWillReceiveProps(nextProps) {
    if (!_.isEmpty(nextProps.integrante) && !_.isEmpty(nextProps.turnos)) {
      if (this.props.integrante !== nextProps.integrante) {
        this.props.fetchTelemedicinaTurnosFilter(nextProps.integrante);
      }
      if (
        _.isEmpty(this.props.turnosFilter) &&
        _.isEmpty(nextProps.turnosFilter)
      ) {
        this.props.fetchTelemedicinaTurnosFilter(nextProps.integrante);
      }
    }
  }

  cargarTurnosDisponibles() {
    this.props.fetchConsultaTurnos();
  }
  formatDate(date) {
    const year = date.substring(0, 4);
    const month = date.substring(4, 6);
    const day = date.substring(6, 8);
    const hour = date.substring(8, 10);
    const min = date.substring(10, 12);
    const dateFormated = `${day}/${month}/${year} - ${hour}:${min} Hs`;
    return dateFormated;
  }

  borrarTurno(id) {
    this.props.deleteTurno(id);
  }

  verTurno(id) {
    this.props.verTurno(id);
  }

  render() {
    let data = [];
    if (!_.isEmpty(this.props.turnosFilter)) {
      data = this.props.turnosFilter;
      this.listaDeTurnos = data.map(turnos => (
        <tr key={turnos.consulta_id}>
          <td>{this.formatDate(turnos.fecha_desde)}</td>
          <td>{turnos.ape_razon_atencion}</td>
          <td>{turnos.exten_deno}</td>
          <td>
            <a href="/iniciar" className={`btn btn-danger`}>
              Iniciar turno online
            </a>
          </td>
        </tr>
      ));
    }
    const listaDeTurnos = data.map(turnos => (
      <tr key={turnos.consulta_id}>
        <td>{this.formatDate(turnos.fecha_desde)}</td>
        <td>{turnos.ape_razon_atencion}</td>
        <td>{turnos.exten_deno}</td>
        <td>
          <a href="/iniciar" className={`btn btn-danger`}>
            Iniciar turno online
          </a>
        </td>
        <td>
          <a
            onClick={() => {
              this.borrarTurno(turnos.consulta_id);
            }}
            role="button"
            tabIndex="0"
          >
            <img
              className="align-self-center"
              style={{ margin: '0 10px', width: '15px' }}
              src={Trash}
              alt="Medico"
            />
          </a>
          <a
            onClick={() => {
              this.verTurno(turnos.consulta_id);
            }}
            role="button"
            tabIndex="0"
          >
            <img
              className="align-self-center"
              style={{ width: '15px' }}
              src={Search}
              alt="Medico"
            />
          </a>
        </td>
      </tr>
    ));

    return (
      <div>
        {!_.isEmpty(this.props.turnos) ? (
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Fecha</th>
                <th scope="col">Médico</th>
                <th scope="col">Especialidad</th>
                <th scope="col">Lugar de atención</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody>{listaDeTurnos}</tbody>
          </table>
        ) : (
          <div>
            <img alt="loading" src="img/loading.gif" />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  turnos: state.telemedicina.turnos,
  turnosFilter: state.telemedicina.turnosFilter,
  integrante: state.telemedicina.integrante,
  deleteTurno: state.telemedicina.delete,
  verTurno: state.telemedicina.detail,
});

export default connect(mapStateToProps, telemedicinaActions)(
  withStyles()(TurnosConsultaList),
);

TurnosConsultaList.defaultProps = {
  turnos: [],
  turnosFilter: [],
};
