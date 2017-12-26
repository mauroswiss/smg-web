/* global $ */
/* eslint react/no-did-mount-set-state: 0 */
/* eslint react/prop-types: 0 */
/* eslint consistent-return: 0 */

import React from 'react';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './TurnosSolicitudFilter.css';
import * as telemedicinaActions from '../../../actions/telemedicinaActions';
import SelectIntegrantes from '../inputs/SelectIntegrantes';
import TurnosSolicitudAlert from '../../../components/Telemedicina/TurnosSolicitudAlert/TurnosSolicitudAlert';
import IconWarning from '../../../../public/images/ic_exclamation.png';

class TurnosSolicitudFilter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      disabledButton: true,
    };
    this.onIntegrantesChange = this.onIntegrantesChange.bind(this);
  }

  onEspecialidadChange() {
    //  this.props.cleanListTurnos();
    const especialidad = $('#especialidad').val();
    let disabledButtonValue;
    if (especialidad === '0') {
      disabledButtonValue = true;
      this.props.cleanList();
    } else {
      disabledButtonValue = false;
    }
    this.setState({
      disabledButton: disabledButtonValue,
    });
  }
  onIntegrantesChange(selectValue) {
    this.props.cleanList();
    this.props.cleanListEspecialidad();
    const edad = selectValue.edad;
    const sexo = selectValue.sexo;
    this.props.fetchEspecialidades(sexo, edad);
  }

  onVerDisponibilidadClick() {
    const especialidad = $('#especialidad').val();
    /* const inte = this.state.inte; */
    this.props.fetchDisponibilidad(especialidad);
    this.props.fetchFechasDisponibles();
  }

  renderOption() {
    return this.props.especialidades.map(item =>
      <option key={item.id} id={item.id} value={item.value}>
        {item.text}
      </option>,
    );
  }

  render() {
    // console.log('ESPECIALIDADES:' + this.props.especialidades);
    // const { showAlert } = this.props.telemedicina;
    return (
      <div className={`${s.divFilter} row`}>
        <div className="col-md-4">
          <strong>Integrante</strong>
          <div className="form-group">
            {/*
          <select id="usuario" className="form-control">
              <option id="0" value="0">
                Sergio Luis Piana
              </option>
            </select>
          
          */}
            <SelectIntegrantes onChange={this.onIntegrantesChange} />
          </div>
        </div>
        <div className="col-md-5">
          <strong>Especialidad</strong>
          <div className="form-group">
            <select
              id="especialidad"
              className="form-control"
              required="true"
              onChange={() => this.onEspecialidadChange()}
            >
              {this.props.especialidades
                ? this.renderOption()
                : <option id="0" value="0">
                    Cargando especialidades..
                  </option>}
            </select>
          </div>
        </div>
        <div className="col-md-3">
          <br />
          <div className="form-group">
            <button
              onClick={() => this.onVerDisponibilidadClick()}
              disabled={this.state.disabledButton}
              type="button"
              className={`${s.input_button} btn btn-danger`}
            >
              Ver disponibilidad
            </button>
          </div>
        </div>
        {this.props.errorEspecialidades
          ? <TurnosSolicitudAlert alertType="warning">
              <div className="col-md-1">
                <img alt="Anterior" src={IconWarning} />
              </div>
              <div className="col-md-11">
                <span>
                  {this.props.errorEspecialidades.text}
                </span>
              </div>
            </TurnosSolicitudAlert>
          : ''}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  telemedicina: state.telemedicina,
  especialidades: state.telemedicina.especialidadOptions,
  errorEspecialidades: state.telemedicina.errorEspecialidades,
});

export default connect(mapStateToProps, telemedicinaActions)(
  withStyles(s)(TurnosSolicitudFilter),
);
