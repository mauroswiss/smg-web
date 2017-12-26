/* eslint react/no-did-mount-set-state: 0 */
/* eslint react/prop-types: 0 */
/* eslint consistent-return: 0 */
/* global $ */

import React from 'react';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './CardHeader.css';
import ImagearrowNext from '../../../../public/images/ic_arrow_foward.png';
import ImagearrowPrevious from '../../../../public/images/ic_arrow_back.png';
import IconCalendar from '../../../../public/images/ic_mini_calendar.png';

class CardHeader extends React.Component {
  render() {
    const fechasDisponibles = this.props.fechasDisponibles;
    if (fechasDisponibles) {
      $('#calendario').datepicker({
        format: 'dd/mm/yyyy',
        autoclose: false,
        language: 'es',
        allowInputToggle: true,
        enableOnReadonly: false,
        // DefaultViewDate: '2016/11/11',
        beforeShowDay(date) {
          const onlyThisDates = fechasDisponibles;
          let jsonReturn;
          const day = `${date.getDate()}/${date.getMonth() +
            1}/${date.getFullYear()}`;
          if (onlyThisDates.indexOf(day) !== -1) {
            jsonReturn = {
              enabled: true,
              tooltip: 'Seleccionar fecha',
            };
          } else {
            jsonReturn = {
              enabled: false,
              tooltip: 'Fecha no disponible',
            };
          }
          return jsonReturn;
        },
      });
    }
    return (
      <div className="card col-md-12">
        <div className={`${s.header_card} card-header row`}>
          <div className="col-md-1" style={{ marginTop: '15px' }}>
            <img
              alt="Anterior"
              src={ImagearrowPrevious}
              // onClick={() => this.props.back(this.props.slep)}
            />
          </div>
          <div className="col-md-3" style={{ marginTop: '15px' }}>
            <span>Turno anterior</span>
          </div>
          <div className="col-md-4">
            Médicos disponibles el{' '}
            <h4 id="calendario">
              13/10/2017
              <img alt="calendario" src={IconCalendar} />
            </h4>
          </div>
          <div className="col-md-3">
            <span>Próximo turno disponible</span>
          </div>
          <div className="col-md-1" style={{ marginTop: '15px' }}>
            <img
              alt="Siguiente"
              src={ImagearrowNext}
              // onClick={() => this.props.next(this.props.slep)}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  fechasDisponibles: state.telemedicina.fechas_disponibles,
});

export default connect(mapStateToProps, null)(withStyles(s)(CardHeader));
