/* eslint react/no-did-mount-set-state: 0 */
/* eslint react/prop-types: 0 */
/* eslint consistent-return: 0 */

import React from 'react';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ModalConfirmacionTurnoResp.css';
import ImageEnvelope from '../../../../public/images/ic_envelope.png';

// import * as turnosActions from '../../../actions/turnosActions';
// import ModalConfirmacionTurno from '../../../components/Telemedicina/TurnosModalRemoveResp/TurnosModalRemoveResp';

class ModalConfirmacionTurnoResp extends React.Component {
  render() {
    return (
      <div className="modal fade" id="modalConfirmTurnoResp">
        <div className="modal-dialog">
          <div className={`${s.modalContent} modal-content`}>
            <div className="modal-header">
              <h5 className="modal-title">¡Confirmación exitosa!</h5>
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
                src={ImageEnvelope}
                alt="Medico"
              />
              <br />
              <br />
              <div>
                <strong>
                  {' '}Se ha enviado un correo electrónico a {this.props.email}{' '}
                  con los datos de la consulta online.
                </strong>
              </div>
            </div>
            <div className={`${s.modalFooter} modal-footer`}>
              <button
                data-dismiss="modal"
                className={`${s.boton_rojo} btn btn-danger pull-left`}
              >
                Finalizar
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

export default connect(null, null)(withStyles(s)(ModalConfirmacionTurnoResp));
