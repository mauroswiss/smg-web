/* global $ */
/* eslint react/no-did-mount-set-state: 0 */
/* eslint react/prop-types: 0 */
/* eslint consistent-return: 0 */

import React from 'react';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ValidacionesTecnicas.css';
import ModalVideoLlamada from '../ModalVideoLlamada/ModalVideoLlamada';
import Icondesktop from '../../../../public/images/ic_desktop.png';
import IconMicrophone from '../../../../public/images/ic_microphone.png';
import IconPadlock from '../../../../public/images/ic_padlock.png';
import IconVideo from '../../../../public/images/ic_video.png';
import IconCheckedOk from '../../../../public/images/ic_checked_chequeo.png';
import IconCheckedError from '../../../../public/images/ic_error_chequeo.png';

class ValidacionesTecnicas extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      validationVideo: false,
      validationMicro: false,
      iniciarLlamada: false,
    };
    this.validateVideo = this.validateVideo.bind(this);
    this.validateMicro = this.validateMicro.bind(this);
    this.changeStateVideo = this.changeStateVideo.bind(this);
    this.changeStateMicro = this.changeStateMicro.bind(this);
    this.onButtonContinuarClick = this.onButtonContinuarClick.bind(this);
  }

  componentDidMount() {
    this.validateMicro();
    this.validateVideo();
  }

  onButtonContinuarClick() {
    this.setState({
      iniciarLlamada: true,
    });
    $('#modalVideoLlamada').fadeIn(200);
  }

  onButtonReintentarClick() {
    this.validateMicro();
    this.validateVideo();
  }

  validateVideo() {
    navigator.getMedia =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia;

    navigator.getMedia(
      { video: true },
      () => this.changeStateVideo(true),
      () => this.changeStateVideo(false),
    );
  }
  validateMicro() {
    navigator.getMedia =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia;

    navigator.getMedia(
      { audio: true },
      () => this.changeStateMicro(true),
      () => this.changeStateMicro(false),
    );
  }
  changeStateMicro(value) {
    this.setState({
      validationMicro: value,
    });
  }
  changeStateVideo(value) {
    this.setState({
      validationVideo: value,
    });
  }

  render() {
    return (
      <div className="col-md-10">
        <div className="col-md-12 row">
          <div className="col-md-1">
            <img alt="icon" src={Icondesktop} />
            {this.state.iniciarLlamada
              ? <div className="col-md-1">
                  <img alt="icon" src={IconCheckedOk} />
                  <ModalVideoLlamada />
                </div>
              : ''}
          </div>
          <div className={`${s.container} col-md-11`}>
            {!this.state.iniciarLlamada
              ? <strong>
                  Tu consulta se iniciará una vez que chequeemos que tu cámara y
                  micrófono funcionan correctamente.
                </strong>
              : <strong>
                  Tu consulta ha sido iniciada, por favor aguardá a ser atendido
                  por uno de nuestros médicos.{' '}
                </strong>}
          </div>
        </div>
        <br /> <br />
        <div className="col-md-12 row">
          <div className="col-md-1">
            <img alt="icon" src={IconMicrophone} />
            {this.state.validationMicro
              ? <div className="col-md-1">
                  <img alt="icon" src={IconCheckedOk} />
                </div>
              : <div className="col-md-1">
                  <img alt="icon" src={IconCheckedError} />
                </div>}
          </div>
          <div className={`${s.container} col-md-11`}>
            Recordá que es mejor utilizar auriculares para que la calidad de
            audio sea óptima.<br />
            {!this.state.validationMicro
              ? <span>
                  Tu micrófono no funciona correctamente, por favor chequealo
                  para continuar.
                </span>
              : ''}
          </div>
        </div>
        <br /> <br />
        <div className="col-md-12 row">
          <div className="col-md-1">
            <img alt="icon" src={IconVideo} />
            {this.state.validationVideo
              ? <div className="col-md-1">
                  <img alt="icon" src={IconCheckedOk} />
                </div>
              : <div className="col-md-1">
                  <img alt="icon" src={IconCheckedError} />
                </div>}
          </div>
          <div className={`${s.container} col-md-11`}>
            Es necesario que poseas una webcam para que el médico pueda observar
            tu estado y síntomas.<br />
            {!this.state.validationVideo
              ? <span>
                  Tu cámara no funciona correctamente, por favor chequeala para
                  continuar.
                </span>
              : ''}
          </div>
        </div>
        <br /> <br />
        <div className="col-md-12 row">
          <div className="col-md-1">
            <img alt="icon" src={IconPadlock} />
            {this.state.validationVideo && this.state.validationMicro
              ? <div className="col-md-1">
                  <img alt="icon" src={IconCheckedOk} />
                </div>
              : <div className="col-md-1">
                  <img alt="icon" src={IconCheckedError} />
                </div>}
          </div>
          <div className={`${s.container} col-md-11`}>
            Tu navegador va a solicitar los permisos para utilizar la webcam y
            el micrófono, recordá habilitarlos.
          </div>
        </div>
        <br /> <br />
        <div className="col-md-12 row">
          <div className="col-md-3">
            {this.state.validationVideo && this.state.validationMicro
              ? <button
                  className={`${s.boton_rojo} btn btn-danger pull-left`}
                  onClick={() => this.onButtonContinuarClick()}
                >
                  Continuar
                </button>
              : <button
                  className={`${s.boton_rojo} btn btn-danger pull-left`}
                  onClick={() => this.onButtonReintentarClick()}
                >
                  Reintentar
                </button>}
          </div>
          <div className="col-md-10" />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  validaciones: state.telemedicina.validaciones_tecnicas,
});

export default connect(mapStateToProps, null)(
  withStyles(s)(ValidacionesTecnicas),
);
