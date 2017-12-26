/* eslint react/no-did-mount-set-state: 0 */
/* eslint react/prop-types: 0 */
/* eslint consistent-return: 0 */
/* global $ */

import React from 'react';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import ImagearrowNext from '../../../../public/images/ic_arrow_foward.png';
import ImagearrowPrevious from '../../../../public/images/ic_arrow_back.png';
import ImageTelemedicina from '../../../../public/images/ic_medico_online.png';
import ImageAmbulance from '../../../../public/images/ic_ambulance.png';
import ImageCalendar from '../../../../public/images/ic_calendar.png';
import ImageWebcam from '../../../../public/images/ic_webcam.png';
import ImageStar from '../../../../public/images/ic_stars.png';
import s from './ModalBienvenida.css';

class ModalBienvenida extends React.Component {
  componentDidMount() {
    $('#ModalBienvenida').modal('show');
  }
  componentWillUnmount() {
    $('#ModalBienvenida').modal('hide');
  }
  render() {
    let modal;
    switch (this.props.slep) {
      case 1:
        modal = (
          <div className="modal-body">
            <img
              className="align-self-center mr-3"
              src={ImageTelemedicina}
              alt="Telemedicina"
            />
            <br />
            <br />
            <div>
              Bienvenido a <strong>E-Consulta</strong>
            </div>
            <div>Conectate con un médico online en</div>
            <div>lugar de asistir al consultorio.</div>
            <br />
            <div className={`${s.modalFooter} modal-footer col-md-12`}>
              <div className="col-md-1" />
              <div className="col-md-3" />
              <div className="col-md-3">
                {this.props.slep}/5
              </div>
              <div className="col-md-2">
                <span> Siguiente</span>
              </div>
              <div className="col-md-2">
                <input
                  type="image"
                  alt="Siguiente"
                  src={ImagearrowNext}
                  onClick={() => this.props.next(this.props.slep)}
                />
              </div>
            </div>
          </div>
        );
        break;
      case 2:
        modal = (
          <div className="modal-body">
            <img
              className="align-self-center mr-3"
              src={ImageAmbulance}
              alt="Telemedicina"
            />
            <br />
            <br />
            <div>
              Recordá que <strong>E-Consulta</strong> solo debe ser
            </div>
            <div>
              utilizado <strong>si tu vida no se encuentra en riesgo.</strong>
            </div>
            <div>Por urgencias, acudí a la guardia más cercana.</div>
            <br />
            <div className={`${s.modalFooter} modal-footer col-md-12`}>
              <div className="col-md-1">
                <input
                  type="image"
                  alt="Anterior"
                  src={ImagearrowPrevious}
                  onClick={() => this.props.back(this.props.slep)}
                />
              </div>
              <div className="col-md-3">
                <span> Anterior</span>
              </div>
              <div className="col-md-3">
                {this.props.slep}/5
              </div>
              <div className="col-md-2">
                <span> Siguiente</span>
              </div>
              <div className="col-md-2">
                <input
                  type="image"
                  alt="Siguiente"
                  src={ImagearrowNext}
                  onClick={() => this.props.next(this.props.slep)}
                />
              </div>
            </div>
          </div>
        );
        break;
      case 3:
        modal = (
          <div className="modal-body">
            <img
              className="align-self-center mr-3"
              src={ImageWebcam}
              alt="Telemedicina"
            />
            <br />
            <br />
            <div>
              Es necesario que poseas una <strong>webcam</strong>, un
            </div>
            <div>
              <strong>micrófono</strong> y <strong>auriculares</strong> para que
            </div>
            <div>puedas interactuar con el profesional.</div>
            <br />
            <div className={`${s.modalFooter} modal-footer col-md-12`}>
              <div className="col-md-1">
                <input
                  type="image"
                  alt="Anterior"
                  src={ImagearrowPrevious}
                  onClick={() => this.props.back(this.props.slep)}
                />
              </div>
              <div className="col-md-3">
                <span> Anterior</span>
              </div>
              <div className="col-md-3">
                {this.props.slep}/5
              </div>
              <div className="col-md-2">
                <span> Siguiente</span>
              </div>
              <div className="col-md-2">
                <input
                  type="image"
                  alt="Siguiente"
                  src={ImagearrowNext}
                  onClick={() => this.props.next(this.props.slep)}
                />
              </div>
            </div>
          </div>
        );
        break;
      case 4:
        modal = (
          <div className="modal-body">
            <img
              className="align-self-center mr-3"
              src={ImageStar}
              alt="Telemedicina"
            />
            <br />
            <br />
            <div>Al finalizar la atención accederá a una</div>
            <div>
              {' '}<strong>encuesta</strong> para calificar la atención recibida
              y{' '}
            </div>
            <div>la calidad de la videollamada.</div>
            <br />
            <div className={`${s.modalFooter} modal-footer col-md-12`}>
              <div className="col-md-1">
                <input
                  type="image"
                  alt="Anterior"
                  src={ImagearrowPrevious}
                  onClick={() => this.props.back(this.props.slep)}
                />
              </div>
              <div className="col-md-3">
                <span> Anterior</span>
              </div>
              <div className="col-md-3">
                {this.props.slep}/5
              </div>
              <div className="col-md-2">
                <span> Siguiente</span>
              </div>
              <div className="col-md-2">
                <input
                  type="image"
                  alt="Siguiente"
                  src={ImagearrowNext}
                  onClick={() => this.props.next(this.props.slep)}
                />
              </div>
            </div>
          </div>
        );
        break;
      case 5:
        modal = (
          <div className="modal-body">
            <img
              style={{ paddingLeft: '35px' }}
              className="align-self-center mr-3"
              src={ImageCalendar}
              alt="Telemedicina"
            />
            <br />
            <br />
            <div>En el caso de que no haya médico</div>
            <div>
              disponible, podés <strong>programar tu E-Consulta</strong>
            </div>
            <div>para otro momento. </div>
            <br />
            <div className={`${s.modalFooter} modal-footer`}>
              <div className="col-md-8 row">
                <button
                  data-dismiss="modal"
                  className={`${s.boton_rojo} btn btn-danger pull-left`}
                >
                  Comenzar
                </button>
              </div>
            </div>
          </div>
        );
        break;
      default:
    }
    return (
      <div className="modal fade" id="ModalBienvenida">
        <div className="modal-dialog">
          <div className={`${s.modalContent} modal-content`}>
            <div className={`${s.modalHeader} modal-header`}>
              <div />
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            {modal}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, null)(withStyles(s)(ModalBienvenida));
