/* global $ */
/* eslint react/no-did-mount-set-state: 0 */
/* eslint react/prop-types: 0 */
/* eslint consistent-return: 0 */

import React from 'react';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ModalConfirmacionTurno.css';
// import * as turnosActions from '../../../actions/turnosActions';

class ModalConfirmacionTurno extends React.Component {
  static onButtonAgendarClick() {
    // this.props.fetchRemoveTurnos(this.props.turnoRemove);
    $('#modalConfirmTurno').modal('hide');
    $('#modalConfirmTurnoResp').modal('show');
  }
  render() {
    return (
      <div className="modal fade" id="modalConfirmTurno">
        <div className="modal-dialog">
          <div className={`${s.modalContent} modal-content`}>
            <div className="modal-header">
              <h5 className="modal-title">Confirmación de turno</h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <img
                className="align-self-center mr-3"
                src={this.props.image}
                alt="Medico"
              />
              <div>
                Profesional: {this.props.profesional}
              </div>
              <div>
                Fecha: {this.props.fecha}
              </div>
              <div>
                Hora: {this.props.hora}
              </div>
            </div>
            <div className={`${s.modalFooter} modal-footer`}>
              <button
                data-dismiss="modal"
                className={`${s.boton_blanco} btn btn-default pull-left`}
              >
                Cancelar
              </button>
              <button
                className={`${s.boton_rojo} btn btn-danger pull-left`}
                onClick={() => ModalConfirmacionTurno.onButtonAgendarClick()}
              >
                Agendar
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

/* const mapStateToProps = state => ({
  removeTurnoResp: state.turnos.remove,
}); */

export default connect(null, null)(withStyles(s)(ModalConfirmacionTurno));
