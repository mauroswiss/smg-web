/* eslint react/no-did-mount-set-state: 0 */
/* eslint react/prop-types: 0 */
/* eslint consistent-return: 0 */

import React from 'react';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './TurnosModal.css';
import logo from './images/swissgroup.png';

class TurnosModal extends React.Component {
  static convertDate(date) {
    const days = [
      'Lunes',
      'Martes',
      'Miércoles',
      'Jueves',
      'Viernes',
      'Sábado',
      'Domingo',
    ];
    const months = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
    ];
    const year = date.substring(0, 4);
    const month = date.substring(4, 6);
    const day = date.substring(6, 8);
    const hour = date.substring(8, 10);
    const min = date.substring(10, 12);
    const dateFormated = new Date(`${year}-${month}-${day} ${hour}:${min}:00`);
    const dayWeek = dateFormated.getDay();
    // Martes 8 de agosto de 2017 8:15AM
    return `${days[dayWeek - 1]} ${day} de ${months[
      parseInt(month, 10) - 1
    ]} de ${year} ${hour}:${min}`;
  }

  render() {
    return (
      <div className="modal fade" id="modalDetalleTurno" data-backdrop="static">
        <div className="modal-dialog">
          <div className={`${s.modalContent} modal-content`}>
            <div id="bodyForPrint">
              <div className={`${s.divTable}`}>
                <div className={`${s.tableModal}`}>
                  <div className={`${s.columnTitle}`}>
                    <span className={`${s.spanTitle}`}>Detalle de turno</span>
                  </div>
                  <div className={`${s.columnImage}`}>
                    &#160;<img src={logo} alt="" />
                  </div>
                </div>
              </div>
              <div className="modal-body" id="bodyTicket">
                {this.props.turno
                  ? <table width="100%">
                      <tbody>
                        <tr>
                          <td>&#160;</td>
                        </tr>
                        <tr>
                          <td colSpan="3">
                            <span className={`${s.spanLevel}`}>
                              D&iacute;a y Hora:
                            </span>
                            <br />
                            <span className={`${s.spanDate}`}>
                              {TurnosModal.convertDate(
                                this.props.turno.fechaHora,
                              )}
                            </span>
                            <br />
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="3">
                            <span className={`${s.spanLevel}`}>Paciente:</span>
                            <br />
                            <span className={`${s.spanDate}`}>
                              {`${this.props.turno.afiliado.nombre} ${this.props
                                .turno.afiliado.apellido}`}
                            </span>
                            <br />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <span className={`${s.spanLevel}`}>
                              Nro. Socio:
                            </span>
                            <br />
                            <span className={`${s.spanDate}`}>
                              {`${this.props.turno.afiliado.contra}/${this.props
                                .turno.afiliado.inte}`}
                            </span>
                          </td>
                          <td colSpan="2">
                            <span className={`${s.spanLevel}`}>Prepaga:</span>
                            <br />
                            <span className={`${s.spanDate}`}>
                              {this.props.turno.afiliado.descPrepaga}
                            </span>
                          </td>
                        </tr>
                        {this.props.turno.titular.apeRazon !== '' &&
                        this.props.turno.titular.nombreAbre !== ''
                          ? <tr>
                              <td colSpan="3">
                                <span className={`${s.spanLevel}`}>
                                  Profesional:
                                </span>
                                <br />
                                <span className={`${s.spanDate}`}>
                                  {`${this.props.turno.titular.apeRazon}, ${this
                                    .props.turno.titular.nombreAbre}`}
                                </span>
                                <br />
                              </td>
                            </tr>
                          : ''}
                        {this.props.turno.reemplazo.apeRazon !== '' &&
                        this.props.turno.reemplazo.nombreAbre !== ''
                          ? <tr>
                              <td colSpan="3">
                                <span className={`${s.spanLevel}`}>
                                  Profesional Reemplazante:
                                </span>
                                <br />
                                <span className={`${s.spanDate}`}>
                                  {`${this.props.turno.reemplazo
                                    .apeRazon}, ${this.props.turno.reemplazo
                                    .nombreAbre}`}
                                </span>
                                <br />
                              </td>
                            </tr>
                          : ''}
                        <tr>
                          <td colSpan="3">
                            <span className={`${s.spanLevel}`}>
                              Especialidad:
                            </span>
                            <br />
                            <span className={`${s.spanDate}`}>
                              {this.props.turno.descEspecialidad}
                            </span>
                            <br />
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="3">
                            <span className={`${s.spanLevel}`}>
                              Lugar de atenci&oacute;n:
                            </span>
                            <br />
                            <span className={`${s.spanDate}`}>
                              {this.props.turno.centro.descripcion}
                            </span>
                            <br />
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="3">
                            <span className={`${s.spanLevel}`}>
                              Direcci&oacute;n:
                            </span>
                            <br />
                            <span className={`${s.spanDate}`}>
                              {this.props.turno.centro.direccion}
                            </span>
                            <br />
                          </td>
                        </tr>
                        <tr>
                          <td>&#160;</td>
                        </tr>
                        {this.props.turno.preparacion
                          ? <tr>
                              <td colSpan="3">
                                <span className={`${s.spanLevel}`}>
                                  Preparaci&oacute;n:
                                </span>
                                <br />
                                <span className={`${s.spanDate}`} />
                                <br />
                              </td>
                            </tr>
                          : ''}
                        <tr>
                          <td>&#160;</td>
                        </tr>
                        {this.props.turno.requiereAutorizacionPrevia
                          ? <tr>
                              <td colSpan="3">
                                <span className={`${s.spanAutorizacion}`}>
                                  Este turno contiene pr&#225;cticas que
                                  REQUIEREN AUTORIZACION PREVIA.
                                </span>
                                <br />
                              </td>
                            </tr>
                          : ''}
                        <tr>
                          <td>&#160;</td>
                        </tr>
                        {this.props.turno.mensaje !== ''
                          ? <tr>
                              <td colSpan="3">
                                <span className={`${s.spanMensaje} ${s.bold}`}>
                                  Importante:
                                </span>
                                <br />
                                <span className={`${s.spanMensaje}`}>
                                  {`${this.props.turno.mensaje} ${this.props
                                    .turno.telefono}`}
                                </span>
                                <br />
                              </td>
                            </tr>
                          : ''}
                      </tbody>
                    </table>
                  : ''}
              </div>
            </div>
            <div className="modal-footer">
              <button data-dismiss="modal" className={`${s.boton_blanco} btn`}>
                Cerrar
              </button>
              <button
                id="botonImprimir"
                className={`${s.boton_rojo} btn btn-danger pull-left`}
              >
                Imprimir
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, null)(withStyles(s)(TurnosModal));
