/* eslint react/no-did-mount-set-state: 0 */
/* eslint react/prop-types: 0 */
/* eslint consistent-return: 0 */

import React from 'react';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './TurnosModalRemoveResp.css';
import * as turnosActions from '../../../actions/turnosActions';

class TurnosModalRemoveResp extends React.Component {
  onButtonAceptClick() {
    this.props.cleanTurnosDeleted();
    this.props.cleanListTurnos();
    this.props.fetchTurnos(this.props.fechaDesde, this.props.fechaHasta);
  }
  render() {
    return (
      <div
        className="modal fade"
        id="modalRemoveTurnoResp"
        data-backdrop="static"
      >
        <div className="modal-dialog">
          <div className={`${s.modalContent} modal-content`}>
            <div className="modal-header">
              <h6 className="modal-title">
                {this.props.header}
              </h6>
            </div>
            <div className="modal-body">
              {this.props.message}
            </div>
            <div className="modal-footer">
              <button
                className={`${s.boton_rojo} btn btn-danger pull-left`}
                data-dismiss="modal"
                onClick={() => this.onButtonAceptClick()}
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

export default connect(null, turnosActions)(
  withStyles(s)(TurnosModalRemoveResp),
);
