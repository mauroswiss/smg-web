/* global $ */
/* eslint react/no-did-mount-set-state: 0 */
/* eslint react/prop-types: 0 */
/* eslint consistent-return: 0 */

import React from 'react';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './TurnosModalRemove.css';
import * as turnosActions from '../../../actions/turnosActions';
import TurnosModalRemoveResp from '../../../components/Turnos/TurnosModalRemoveResp/TurnosModalRemoveResp';

class TurnosModalRemove extends React.Component {
  onButtonRemoveClick() {
    this.props.fetchRemoveTurnos(this.props.turnoRemove);
  }
  render() {
    let responseOK;
    if (this.props.removeTurnoResp) {
      $('#modalRemoveTurnoResp').modal('show');
      if (this.props.removeTurnoResp.estadoOk) {
        responseOK = true;
      } else {
        responseOK = false;
      }
    }
    return (
      <div className="modal fade" id="modalRemoveTurno">
        {this.props.removeTurnoResp && responseOK
          ? <TurnosModalRemoveResp
              message="El turno ha sido cancelado."
              header=""
              fechaDesde={this.props.fechaDesde}
              fechaHasta={this.props.fechaHasta}
            />
          : <TurnosModalRemoveResp
              message="El turno no pudo ser cancelado."
              header="ERROR!"
              fechaDesde={this.props.fechaDesde}
              fechaHasta={this.props.fechaHasta}
            />}
        <div className="modal-dialog">
          <div className={`${s.modalContent} modal-content`}>
            <div className="modal-body">
              ¿ Est&aacute; seguro que desea cancelar el turno ?
            </div>
            <div className="modal-footer">
              <button
                data-dismiss="modal"
                className={`${s.boton_blanco} btn btn-default pull-left`}
              >
                Cancelar
              </button>
              <button
                className={`${s.boton_rojo} btn btn-danger pull-left`}
                onClick={() => this.onButtonRemoveClick()}
              >
                Aceptar
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  removeTurnoResp: state.turnos.remove,
});

export default connect(mapStateToProps, turnosActions)(
  withStyles(s)(TurnosModalRemove),
);
