/* eslint react/no-did-mount-set-state: 0 */
/* eslint react/prop-types: 0 */
/* eslint consistent-return: 0 */

import React from 'react';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Image from '../../../components/Telemedicina/images/medico.png';
import s from './ListCards.css';
// import ModalConfirmacionTurno from '../../../components/Telemedicina/ModalConfirmacionTurno/ModalConfirmacionTurno';

class ListCards extends React.Component {
  render() {
    return (
      <div>
        <div className={`${s.card} card`}>
          <div className="media">
            <img className="align-self-center mr-3" src={Image} alt="Medico" />
            <div className="media-body">
              <h5 className="mt-0">
                <strong>Gonzalo Manuel Roberto</strong>
              </h5>
              <p>Horarios de atención</p>
              <button
                type="button"
                data-toggle="modal"
                data-target="#modalConfirmTurno"
                className={`${s.button} btn btn-outline-danger`}
              >
                08:00
              </button>
              &nbsp;&nbsp;
              <button
                type="button"
                className={`${s.button} btn btn-outline-danger`}
              >
                08:00
              </button>
              &nbsp;&nbsp;
              <button
                type="button"
                className={`${s.button} btn btn-outline-danger`}
              >
                08:00
              </button>
              &nbsp;&nbsp;
              <button
                type="button"
                className={`${s.button} btn btn-outline-danger`}
              >
                08:00
              </button>
              &nbsp;&nbsp;
              <button
                type="button"
                className={`${s.button} btn btn-outline-danger`}
              >
                08:00
              </button>
              &nbsp;&nbsp;
              <button
                type="button"
                className={`${s.button} btn btn-outline-danger`}
              >
                08:00
              </button>
              &nbsp;&nbsp;
              <button
                type="button"
                className={`${s.button} btn btn-outline-danger`}
              >
                08:00
              </button>
              &nbsp;&nbsp;
              <button
                type="button"
                className={`${s.button} btn btn-outline-danger`}
              >
                08:00
              </button>
              &nbsp;&nbsp;
              <button
                type="button"
                className={`${s.button} btn btn-outline-danger`}
              >
                08:00
              </button>
              &nbsp;&nbsp;
              <button
                type="button"
                className={`${s.button} btn btn-outline-danger`}
              >
                08:00
              </button>
              &nbsp;&nbsp;
              <button
                type="button"
                className={`${s.button} btn btn-outline-danger`}
              >
                08:00
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, null)(withStyles(s)(ListCards));
