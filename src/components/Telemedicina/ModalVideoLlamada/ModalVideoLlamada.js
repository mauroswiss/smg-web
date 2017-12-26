/* global $ */
/* eslint react/no-did-mount-set-state: 0 */
/* eslint react/prop-types: 0 */
/* eslint consistent-return: 0 */

import React from 'react';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ModalVideoLlamada.css';

class ModalVideoLlamada extends React.Component {
  static hideModalVideoLlamada() {
    $('#modalVideoLlamada').fadeOut(200);
  }

  static restoreModalVideoLlamada() {
    // Si esta en full screen la saca
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  }

  constructor(props) {
    super(props);

    this.state = {
      popPrevSize: {
        width: '350px',
        height: 'auto',
        left: '0',
        top: '0',
      },
      file: '',
    };
    // this.showModalVideoLlamada = this.showModalVideoLlamada.bind(this);
    this.maximizeModalVideoLlamada = this.maximizeModalVideoLlamada.bind(this);
    this.exitHandler = this.exitHandler.bind(this);
    this.toggleMaximize = this.toggleMaximize.bind(this);
    this.getPhoto = this.getPhoto.bind(this);
  }

  componentDidMount() {
    $('#modalVideoLlamada')
      /* .resizable({
        resize() {
          $('#modalMaximize').show();
          $('#modalRestore').hide();
        },
      }) */
      .draggable({
        containment: '#app',
      });

    document.addEventListener('fullscreenchange', this.exitHandler);
    document.addEventListener('webkitfullscreenchange', this.exitHandler);
    document.addEventListener('mozfullscreenchange', this.exitHandler);
    document.addEventListener('MSFullscreenChange', this.exitHandler);

    $('#modalVideoLlamada').fadeIn(200);
  }

  getPhoto(e) {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];

    reader.onloadend = () => {
      $('#modalVideoLlamadaUploads').show(200);
      this.setState({
        file,
        imagePreviewUrl: reader.result,
      });
    };
    reader.readAsDataURL(file);
  }

  maximizeModalVideoLlamada() {
    this.setState({
      popPrevSize: {
        width: $('#modalVideoLlamada').width(),
        height: $('#modalVideoLlamada').height(),
        left: $('#modalVideoLlamada').css('left'),
        top: $('#modalVideoLlamada').css('top'),
      },
    });

    $('#modalVideoLlamada').css({
      width: '100%',
      height: '100%',
      left: '0',
      top: '0',
      padding: '0',
      border: '0',
    });

    $('#texto_modal_videollamada').hide();
    $('#iframe_llamada').height('100%');

    $('#modalMaximize').hide();
    $('#modalRestore').show();

    const elem = document.getElementById('modalVideoLlamada');
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    }
    /*
    $('#modalVideoLlamada').mousemove(() => {
      if (!$('#modalVideoLlamadaFooter').is(':visible')) {
        $('#modalVideoLlamadaFooter').slideUp(100);
        setTimeout(() => {
          $('#modalVideoLlamadaFooter').slideDown(1000);
        }, 2000);
      }
    });

    setTimeout(() => {
      $('#modalVideoLlamadaFooter').slideDown(1000);
    }, 2000);
    */
  }

  toggleMaximize() {
    if (
      !document.fullscreenElement && // alternative standard method
      !document.mozFullScreenElement &&
      !document.webkitFullscreenElement &&
      !document.msFullscreenElement
    ) {
      this.maximizeModalVideoLlamada();
    } else {
      ModalVideoLlamada.restoreModalVideoLlamada();
    }
  }

  exitHandler() {
    if (
      !document.fullscreenElement &&
      !document.webkitIsFullScreen &&
      !document.mozFullScreen &&
      !document.msFullscreenElement
    ) {
      $('#modalVideoLlamada').css({
        width: this.state.popPrevSize.width,
        height: this.state.popPrevSize.height,
        left: this.state.popPrevSize.left,
        top: this.state.popPrevSize.top,
        padding: '10px 10px 50px 10px',
        border: '1px solid #ccc',
      });
      $('#modalVideoLlamadaFooter').show();

      $('#texto_modal_videollamada').show();
      $('#iframe_llamada').height('200px');

      $('#modalRestore').hide();
      $('#modalMaximize').show();
    }
  }

  render() {
    const { imagePreviewUrl } = this.state;
    let imagePreview = null;
    if (imagePreviewUrl) {
      imagePreview = <img src={imagePreviewUrl} alt="Archivo subido" />;
    }

    return (
      <div style={{ height: '10px' }}>
        <div id="modalVideoLlamada" className={s.modalVideoLLamada}>
          <div
            style={{
              backgroundColor: '#000',
              width: '100%',
              height: '200px',
            }}
            id="iframe_llamada"
            onDoubleClick={this.toggleMaximize}
          />
          <p id="texto_modal_videollamada">
            Posicion en la fila
            <br />
            Espera aproximada de 10 minutos
          </p>
          <div
            className={s.modalVideoLlamadaFooter}
            id="modalVideoLlamadaFooter"
          >
            <i className="fa fa-paperclip" aria-hidden="true" />
            <i className="fa fa-volume-up" aria-hidden="true" />
            <i
              id="modalMaximize"
              className="fa fa-arrows-alt"
              aria-hidden="true"
              onClick={this.maximizeModalVideoLlamada}
            />
            <i
              id="modalRestore"
              className="fa fa-compress"
              aria-hidden="true"
              style={{
                display: 'none',
              }}
              onClick={ModalVideoLlamada.restoreModalVideoLlamada}
            />
          </div>
          <div
            className={s.modalVideoLlamadaUploads}
            id="modalVideoLlamadaUploads"
          >
            Subiendo Archivos
            <br /> {imagePreview}
          </div>
          <span
            id="modalVideoLlamadaHide"
            className={s.modalVideoLlamadaHide}
            onClick={ModalVideoLlamada.hideModalVideoLlamada}
            role="button"
            tabIndex="-1"
          >
            X
          </span>
        </div>
      </div>
    );
  }
}

// const mapStateToProps = state => ({
//   removeTurnoResp: state.turnos.remove,
// });

/*
<form
              action="."
              encType="multipart/form-data"
              className={s.modalVideoLlamadaFormUpload}
            >
              <i className="fa fa-paperclip" aria-hidden="true">
                <input type="file" onChange={this.getPhoto} />
              </i>
            </form>
            */

export default connect(null, null)(withStyles(s)(ModalVideoLlamada));
