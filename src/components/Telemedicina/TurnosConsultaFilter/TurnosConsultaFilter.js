import React from 'react';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import PropTypes from 'prop-types';
import s from './TurnosConsultaFilter.css';
import * as telemedicinaActions from '../../../actions/telemedicinaActions';
import SelectIntegrantes from '../inputs/SelectIntegrantes';

class TurnosConsultaFilter extends React.Component {
  constructor(props) {
    super(props);
    this.CargarTurnosDisponibles = this.CargarTurnosDisponibles.bind(this);
  }

  CargarTurnosDisponibles(selectValue) {
    const inte = selectValue.inte;
    this.props.getIntegranteSeleccionado(inte);
  }

  render() {
    return (
      <div className={`${s.divFilter} row`}>
        <div className="col-md-4">
          Integrante
          <div className="form-group">
            <SelectIntegrantes onChange={this.CargarTurnosDisponibles} />
          </div>
        </div>
        <div className="col-md-4">
          Tipo de turno
          <div className="form-group">
            <select
              ref={ref => {
                this.tipo = ref;
              }}
              defaultValue="1"
              className="form-control"
            >
              <option value="0">Seleccione</option>
              <option value="1">Online</option>
            </select>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, telemedicinaActions)(
  withStyles(s)(TurnosConsultaFilter),
);

TurnosConsultaFilter.propTypes = {
  getIntegranteSeleccionado: PropTypes.func.isRequired,
};
