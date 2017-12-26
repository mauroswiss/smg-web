/**
 * @author Esteban Huerta <cancela.eshuer@gmaila.com>
 */
/* eslint react/prop-types: 0 */

import React from 'react';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './TurnosConfirmacion.css';
import * as turnosAction from '../../actions/turnosActions';

class TurnosConfirmacion extends React.Component {
  componentDidMount() {
    this.props.fetchEmail();
    this.props.fetchPhone();
  }
  render() {
    if (!this.props.phones) {
      return <div>cargando telefonos..</div>;
    }
    return (
      <div className={s.root}>
        <div className={s.container}>
          <div className={s.page_header}>
            <h1>
              Solicitud de Turnos&nbsp;
              <small className={s.copete}>
                en Centros M&#233;dicos propios.
              </small>
            </h1>
          </div>

          <div className="col-md-12" style={{ marginBottom: '20px' }}>
            <div className="clearfix">
              <div className={`${s.breadcrumb} col-md-12`}>
                <span>Solicitar &gt;&gt;</span>&nbsp;<span
                  className={`${s.breadcrumb_red}`}
                >
                  Confirmar
                </span>&nbsp;
                <span> &gt;&gt;Detalle</span>
              </div>
            </div>
          </div>

          <div className="alert alert-warning" role="alert">
            Su turno no se encuentra confirmado. Por favor seleccione el
            bot&#243;n <span className={`${s.text_red}`}>Confirmar Turno</span>,
            para agendarlo correctamente.
          </div>

          <br />

          <div className="row clearfix">
            <div className="col-md-12">
              <div className="form-group">
                <div className="col-md-12 row">
                  <div className="col-md-3" style={{ maxWidth: '20%' }}>
                    Datos de Contacto
                  </div>
                  <div className="col-md-9">
                    <hr />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="alert alert-warning" role="alert">
            En caso de tener que notificarle alg&#250;n cambio sobre el turno
            nos contactaremos a los siguientes datos.
          </div>

          <div className="row clearfix">
            <div className="col-md-6">
              <div className="form-group">
                <div className="col-md-12">
                  <table cellSpacing="5" width="92%" height="70px">
                    <tbody>
                      <tr align="left">
                        <td colSpan="6" align="left">
                          Telefono Fijo:
                        </td>
                      </tr>
                      <tr align="left">
                        <td align="left">
                          <span className={`${s.title_input}`}>Cod. Pais</span>
                          <br />
                          <input
                            type="text"
                            size="4"
                            id="tel1Pais"
                            name="tel1Pais"
                            defaultValue="54"
                          />
                        </td>
                        <td align="left">
                          <span className={`${s.title_input}`}>DDN</span>
                          <br />
                          <input
                            type="text"
                            size="4"
                            id="tel1Area"
                            name="tel1Area"
                            defaultValue="11"
                          />
                        </td>
                        <td align="left">
                          <span className={`${s.title_input}`}>Prefijo</span>
                          <br />
                          <input
                            type="text"
                            size="5"
                            id="tel1Prefijo"
                            name="tel1Prefijo"
                            defaultValue={this.props.phones.part.caracteristica}
                          />
                        </td>
                        <td align="left">
                          <br />-
                        </td>
                        <td align="left">
                          <span className={`${s.title_input}`}>Sufijo</span>
                          <br />
                          <input
                            type="text"
                            size="5"
                            id="tel1Sufijo"
                            name="tel1Sufijo"
                            defaultValue={this.props.phones.part.numero}
                          />
                        </td>
                        <td className={`${s.title_int}`}>
                          <br />
                          <b>Int.</b>
                        </td>
                        <td align="left">
                          <br />
                          <input
                            type="text"
                            size="5"
                            id="tel1Int"
                            name="tel1Int"
                            defaultValue={this.props.phones.part.int}
                          />
                        </td>
                      </tr>
                      <tr align="left">
                        <td align="left">
                          <span className={`${s.title_input}`}>Cod. Pais</span>
                          <br />
                          <input
                            type="text"
                            size="4"
                            id="tel2Pais"
                            name="tel2Pais"
                            defaultValue="54"
                          />
                        </td>
                        <td align="left">
                          <span className={`${s.title_input}`}>DDN</span>
                          <br />
                          <input
                            type="text"
                            size="4"
                            id="tel2Area"
                            name="tel2Area"
                            defaultValue="11"
                          />
                        </td>
                        <td align="left">
                          <span className={`${s.title_input}`}>Prefijo</span>
                          <br />
                          <input
                            type="text"
                            size="5"
                            id="tel2Prefijo"
                            name="tel2Prefijo"
                          />
                        </td>
                        <td align="left">
                          &#160;<br />-
                        </td>
                        <td align="left">
                          <span className={`${s.title_input}`}>Sufijo</span>
                          <br />
                          <input
                            type="text"
                            size="5"
                            id="tel2Sufijo"
                            name="tel2Sufijo"
                          />
                        </td>
                        <td className={`${s.title_int}`}>
                          <br />
                          <b>Int.</b>
                        </td>
                        <td align="left">
                          <br />
                          <input
                            type="text"
                            size="5"
                            id="tel2Int"
                            name="tel2Int"
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-group">
                <div className="col-md-12">
                  <table cellSpacing="5" width="92%" height="70px">
                    <tbody>
                      <tr align="left">
                        <td colSpan="6" align="left">
                          Tel. Celular:
                        </td>
                      </tr>
                      <tr align="left">
                        <td align="left">
                          <span className={`${s.title_input}`}>Cod. Pais</span>
                          <br />
                          <input
                            type="text"
                            size="4"
                            id="cel1Pais"
                            name="cel1Pais"
                            defaultValue="54"
                          />
                        </td>
                        <td align="left">
                          <span className={`${s.title_input}`}>DDN</span>
                          <br />
                          <input
                            type="text"
                            size="4"
                            id="cel1Area"
                            name="cel1Area"
                            defaultValue="11"
                          />
                        </td>
                        <td align="left">
                          <span className={`${s.title_input}`}>Prefijo</span>
                          <br />
                          <input
                            type="text"
                            size="5"
                            id="cel1Prefijo"
                            name="cel1Prefijo"
                            defaultValue={this.props.phones.cel.caracteristica}
                          />
                        </td>
                        <td align="left">
                          <br />-
                        </td>
                        <td align="left">
                          <span className={`${s.title_input}`}>Sufijo</span>
                          <br />
                          <input
                            type="text"
                            size="5"
                            id="cel1Sufijo"
                            name="cel1Sufijo"
                            defaultValue={this.props.phones.cel.numero}
                          />
                        </td>
                      </tr>
                      <tr align="left">
                        <td align="left">
                          <span className={`${s.title_input}`}>Cod. Pais</span>
                          <br />
                          <input
                            type="text"
                            size="4"
                            id="cel2Pais"
                            name="cel2Pais"
                            defaultValue="54"
                          />
                        </td>
                        <td align="left">
                          <span className={`${s.title_input}`}>DDN</span>
                          <br />
                          <input
                            type="text"
                            size="4"
                            id="cel2Area"
                            name="cel2Area"
                            defaultValue="11"
                          />
                        </td>
                        <td align="left">
                          <span className={`${s.title_input}`}>Prefijo</span>
                          <br />
                          <input
                            type="text"
                            size="5"
                            id="cel2Prefijo"
                            name="cel2Prefijo"
                          />
                        </td>
                        <td align="left">
                          &#160;<br />-
                        </td>
                        <td align="right">
                          <span className={`${s.title_input}`}>Sufijo</span>
                          <br />
                          <input
                            type="text"
                            size="5"
                            id="cel2Sufijo"
                            name="cel2Sufijo"
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div className="row clearfix">
            <div className={`${s.breadcrumb} col-md-6`}>
              <div className="form-group">
                <div className="col-sm-12">
                  <div className="col-sm-12">
                    <span className={`${s.breadcrumb_red}`}>E-mail 1</span>
                    <br />
                    <input
                      type="email"
                      className="form-control"
                      id="email1"
                      placeholder="Email 1"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className={`${s.breadcrumb} col-md-6`}>
              <div className="form-group">
                <div className="col-sm-12">
                  <div className="col-sm-12">
                    <span className={`${s.breadcrumb_red}`}>E-mail 2</span>
                    <br />
                    <input
                      type="email"
                      className="form-control"
                      id="email2"
                      placeholder="Email 2"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <br />
          <div className="alert alert-warning" role="alert">
            Si desea puede modificar los datos de contacto.
          </div>
          <br />

          <div className="row clearfix">
            <div className="col-md-12">
              <div className="form-group">
                <div className="col-md-11 row">
                  <div className="col-md-3" style={{ maxWidth: '20%' }}>
                    Datos del Turno
                  </div>
                  <div className="col-md-9">
                    <hr />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-8" style={{ paddingLeft: 0 }}>
            <div className="form-group row">
              <span className={`${s.input_label} col-lg-4`}>
                <b>Paciente:</b>
              </span>
              <div className="col-lg-8">
                <input
                  type="text"
                  className={`${s.input_text} form-control`}
                  autoComplete="off"
                  id="pacienteSolicitante"
                  defaultValue="paciente"
                  readOnly
                />
              </div>
            </div>
            <div className="form-group row">
              <span className={`${s.input_label} col-lg-4`}>
                <b>Tipo de turno:</b>
              </span>
              <div className="col-lg-8">
                <input
                  type="text"
                  className={`${s.input_text} form-control`}
                  autoComplete="off"
                  id="tipoTurnoSolicitado"
                  defaultValue={this.props.data.tipoTurno}
                  readOnly
                />
              </div>
            </div>
            <div className="form-group row">
              <span className={`${s.input_label} col-lg-4`}>
                <b>Especialidad:</b>
              </span>
              <div className="col-lg-8">
                <input
                  type="text"
                  className={`${s.input_text} form-control`}
                  autoComplete="off"
                  id="especialidadSolicitada"
                  defaultValue={this.props.data.especialidad}
                  readOnly
                />
              </div>
            </div>
            <div className="form-group row">
              <span className={`${s.input_label} col-lg-4`}>
                <b>Pr&#225;ctica:</b>
              </span>
              <div className="col-lg-8">
                <input
                  type="text"
                  className={`${s.input_text} form-control`}
                  autoComplete="off"
                  id="practicaSolicitada"
                  defaultValue={this.props.data.practica}
                  readOnly
                />
              </div>
            </div>
            <div className="form-group row">
              <span className={`${s.input_label} col-lg-4`}>
                <b>Lugar de atenci&#243;n:</b>
              </span>
              <div className="col-lg-8">
                <input
                  type="text"
                  className={`${s.input_text} form-control`}
                  autoComplete="off"
                  id="centroSolicitado"
                  defaultValue=""
                  readOnly
                />
              </div>
            </div>
            <div className="form-group row">
              <span className={`${s.input_label} col-lg-4`}>
                <b>Profesional:</b>
              </span>
              <div className="col-lg-8">
                <input
                  type="text"
                  className={`${s.input_text} form-control`}
                  autoComplete="off"
                  id="reemplazanteSolicitado"
                  defaultValue=""
                  readOnly
                />
              </div>
            </div>
            <div className="form-group row">
              <span className={`${s.input_label} col-lg-4`}>
                <b>D&#237;a y hora:</b>
              </span>
              <div className="col-lg-8">
                <input
                  type="text"
                  className={`${s.input_text} form-control`}
                  autoComplete="off"
                  id="diaHora"
                  defaultValue=""
                  readOnly
                />
              </div>
            </div>
            <br />
            <div>
              <table width="100%">
                <tbody>
                  <tr>
                    <td width="65%" />
                    <td width="25%">
                      <button
                        data-dismiss="modal"
                        className="btn btn-md btn-secondary"
                        style={{ cursor: 'pointer' }}
                        cursor="pointer"
                        onClick={() => this.props.nextScreen('1')}
                      >
                        Volver
                      </button>
                    </td>
                    <td width="10%">
                      <button
                        data-dismiss="modal"
                        className="btn btn-md btn-danger"
                        style={{ cursor: 'pointer' }}
                        cursor="pointer"
                        // onClick={() => this.onButtonRemoveClick()}
                      >
                        Confirmar Turno
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  emails: state.turnos.emails,
  phones: state.turnos.phones,
});

export default connect(mapStateToProps, turnosAction)(
  withStyles(s)(TurnosConfirmacion),
);
