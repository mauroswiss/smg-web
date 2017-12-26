/* global $ */
/* eslint react/no-did-mount-set-state: 0 */
/* eslint react/prop-types: 0 */
/* eslint consistent-return: 0 */

import React from 'react';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './TurnosFilter.css';
import * as turnosActions from '../../../actions/turnosActions';

class TurnosFilter extends React.Component {
  static getDateFormated(dif, format) {
    const date = new Date();
    date.setMonth(date.getMonth() + dif);

    let finalDate;
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

    if (format === 'dd/mm/yyyy') {
      finalDate = `${day}/${month}/${year}`;
    }
    return finalDate;
  }

  constructor(props) {
    super(props);

    this.state = {
      fechaInicialDesde: '',
      fechaInicialHasta: '',
    };
  }

  componentDidMount() {
    this.initializeDate();
  }

  onTurnosDataSubmit() {
    this.props.cleanListTurnos();
    const fechaDesde = $('#fechaDesde').val();
    const fechaHasta = $('#fechaHasta').val();
    const arrFechaDesde = fechaDesde.split('/');
    const arrFechaHasta = fechaHasta.split('/');
    const fechaDesdeServicio =
      arrFechaDesde[2] + arrFechaDesde[1] + arrFechaDesde[0];
    const fechaHastaServicio =
      arrFechaHasta[2] + arrFechaHasta[1] + arrFechaHasta[0];

    this.props.fetchTurnos(fechaDesdeServicio, fechaHastaServicio);
  }

  initializeDate() {
    const date = new Date();
    const today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    let next90days = new Date(today);
    let prev90days = new Date(today);

    next90days.setDate(today.getDate() + 90);
    prev90days.setDate(today.getDate() - 90);

    prev90days = TurnosFilter.getDateFormated(-3, 'dd/mm/yyyy'); // '08/08/2016';
    next90days = TurnosFilter.getDateFormated(3, 'dd/mm/yyyy'); // '08/08/2017';

    this.setState({
      fechaInicialDesde: prev90days, // '08/08/2016',
      fechaInicialHasta: next90days, // '08/08/2017',
    });

    $('.input-group.date input').datepicker({
      format: 'dd/mm/yyyy',
      autoclose: true,
      language: 'es',
      allowInputToggle: true,
      startDate: `${prev90days}`,
      endDate: `${next90days}`,
    });

    $('#fechaDesde').datepicker('setDate', prev90days);
    $('#fechaHasta').datepicker('setDate', next90days);

    $('#fechaHasta').datepicker().on('changeDate', e => {
      if (e.date < $('#fechaDesde').datepicker('getDate')) {
        $('#fechaDesde').datepicker('setDate', e.date);
      }
    });

    $('#fechaDesde').datepicker().on('changeDate', e => {
      if (e.date > $('#fechaHasta').datepicker('getDate')) {
        $('#fechaHasta').datepicker('setDate', e.date);
      }
    });
  }

  render() {
    return (
      <div className="">
        <link rel="stylesheet" href="/css/datepicker.css" />
        <script src="/js/bootstrap-datepicker.js" />
        <script src="/js/bootstrap-datepicker.es.js" />
        <div className={`${s.divFilter} row`}>
          <div className="col-md-5 col-xs-5">
            Desde
            <div className="form-group">
              <div className="input-group date">
                <input
                  type="text"
                  className="form-control"
                  id="fechaDesde"
                  value={this.state.fechaInicialDesde}
                  placeholder="DD/MM/AAAA"
                />
                <span className="input-group-addon">
                  <span className="fa fa-calendar" />
                </span>
              </div>
            </div>
          </div>
          <div className="col-md-5 col-xs-5 nopadding">
            Hasta
            <div className="form-group">
              <div className="input-group date">
                <input
                  type="text"
                  className="form-control"
                  id="fechaHasta"
                  value={this.state.fechaInicialHasta}
                  placeholder="DD/MM/AAAA"
                />
                <span className="input-group-addon">
                  <span className="fa fa-calendar" />
                </span>
              </div>
            </div>
          </div>
          <div className={`${s.div_buscar} col-md-1 col-xs-1`}>
            <span>&nbsp;</span>
            <button
              type="button"
              value="Buscar"
              className={`${s.btn_buscar} btn btn-default`}
              onClick={() => this.onTurnosDataSubmit()}
            >
              <i className="fa fa-search" />
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  fechaInicialDesde: state.fechaInicialDesde,
  fechaInicialHasta: state.fechaInicialHasta,
});

export default connect(mapStateToProps, turnosActions)(
  withStyles(s)(TurnosFilter),
);
