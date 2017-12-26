/* eslint react/no-did-mount-set-state: 0 */
/* eslint react/prop-types: 0 */
/* eslint consistent-return: 0 */

import React from 'react';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import * as turnosActions from '../../../actions/turnosActions';
import s from './TurnosList.css';
import TurnosModal from '../../../components/Turnos/TurnosModal/TurnosModal';
import TurnosModalRemove from '../../../components/Turnos/TurnosModalRemove/TurnosModalRemove';
import LoadingList from '../../../components/Turnos/LoadingList/LoadingList';

class TurnosList extends React.Component {
  static convertDateUnix(date, format) {
    const days = [
      'Lunes',
      'Martes',
      'Miércoles',
      'Jueves',
      'Viernes',
      'Sábado',
      'Domingo',
    ];
    const year = date.substring(0, 4);
    const month = date.substring(4, 6);
    const day = date.substring(6, 8);
    const hour = date.substring(8, 10);
    const min = date.substring(10, 12);
    const dateFormated = new Date(`${year}-${month}-${day} ${hour}:${min}:00`);
    const dayWeek = dateFormated.getDay();

    if (format === 'U') {
      return Math.round(dateFormated.getTime() / 1000);
    }

    return `${days[dayWeek - 1]} ${day}/${month}/${year} ${hour}:${min}`;
  }

  static showHeaderList() {
    return (
      <div className={`${s.list_header} container`}>
        <div className={`${s.list_title} row`}>
          <div className="col-md-3">Fecha</div>
          <div className="col-md-3">Tipo de estudio</div>
          <div className="col-md-3">Estado</div>
          <div className="col-md-3">Acciones</div>
        </div>
      </div>
    );
  }

  static getDateFormated(dif) {
    const date = new Date();
    date.setMonth(date.getMonth() + dif);

    let month = date.getUTCMonth() + 1;
    let day = date.getUTCDate();
    const year = date.getUTCFullYear();

    day = `0${day}`;
    month = `0${month}`;

    if (day.length > 2) {
      day = day.substring(1, day.length);
    }

    if (month.length > 2) {
      month = month.substring(1, month.length);
    }

    return year + month + day;
  }

  constructor(props) {
    super(props);

    this.state = {
      turnoRemove: '',
    };

    this.onDetailTurnosClick = this.onDetailTurnosClick.bind(this);
    this.onRemoveTurnosClick = this.onRemoveTurnosClick.bind(this);
    this.showListTurnos = this.showListTurnos.bind(this);
  }

  componentDidMount() {
    this.initializeDate();
  }

  onDetailTurnosClick(turno) {
    this.props.fetchDetalleTurnos(turno);
  }

  onRemoveTurnosClick(turno) {
    this.setState({
      turnoRemove: turno,
    });
  }

  initializeDate() {
    const next90days = TurnosList.getDateFormated(3);
    const prev90days = TurnosList.getDateFormated(-3);
    this.props.fetchTurnos(prev90days, next90days);
  }

  showListTurnos(turnos) {
    const tipo = turnos.exten_deno;
    const estado = turnos.detalle;
    const id = turnos.consulta_id;
    const fecha = turnos.fecha_desde_dia;
    const formatDate = TurnosList.convertDateUnix(fecha, 'F'); // Devuelve Lunes 08/08/2017 20:30
    const turnoUnixDate = TurnosList.convertDateUnix(fecha, 'U'); // Devuelve formato Unix
    const currentDate = Math.round(new Date().getTime() / 1000);
    const removeTurnoBtn =
      currentDate > turnoUnixDate
        ? ''
        : <div className="col-xs-4">
            <span
              role="button"
              tabIndex="0"
              className={`${s.icono_remove} ${s.icono_acciones} fa fa-remove`}
              onClick={() => this.onRemoveTurnosClick(id)}
              data-toggle="modal"
              data-target="#modalRemoveTurno"
            />
          </div>;
    const claseTurno = removeTurnoBtn !== '' ? s.turnoEnabled : s.turnoDisabled;

    return (
      <div key={id} className={`${s.list_item} ${claseTurno} row`}>
        <div className={`${s.divColFecha} col-md-3`}>
          {formatDate}
        </div>
        <div className="col-md-3">
          {tipo}
        </div>
        <div className="col-md-3">
          {estado}
        </div>
        <div className={`${s.divAcciones} col-md-3 row`}>
          <div className="col-xs-4">
            <span
              role="button"
              tabIndex="0"
              className={`${s.icono_acciones} fa fa-search`}
              data-toggle="modal"
              data-target="#modalDetalleTurno"
              onClick={() => this.onDetailTurnosClick(id)}
            />
          </div>
          {removeTurnoBtn}
        </div>
      </div>
    );
  }

  render() {
    const jsonTurnos = this.props.turnos;
    if (!jsonTurnos) {
      return (
        <div>
          {TurnosList.showHeaderList()}
          <LoadingList />
        </div>
      );
    }

    if (jsonTurnos && jsonTurnos.length === 0) {
      return (
        <div id="noData">
          {TurnosList.showHeaderList()}
          <div>Aún no cuenta con turnos agendados.</div>
        </div>
      );
    }

    return (
      <div id="turnos_container">
        <div className="container">
          {TurnosList.showHeaderList()}
          <div>
            {jsonTurnos.map(this.showListTurnos)}
          </div>
          <TurnosModal turno={this.props.detalle} />
          <TurnosModalRemove
            turnoRemove={this.state.turnoRemove}
            fechaDesde={this.props.fDesde}
            fechaHasta={this.props.fHasta}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  turnos: state.turnos.turnos,
  detalle: state.turnos.detalle,
  fDesde: state.turnos.fechaDesde,
  fHasta: state.turnos.fechaHasta,
});

export default connect(mapStateToProps, turnosActions)(
  withStyles(s)(TurnosList),
);
