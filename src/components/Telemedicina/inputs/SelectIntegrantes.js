/* eslint react/prop-types:0 */
/* eslint class-methods-use-this:0 */
import React from 'react';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { LOCALSTORAGE_AUTH_KEY } from '../../../constants';
import * as integrantesActions from '../../../actions/integrantesActions';

class SelectIntegrantes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectIntegrantes: 'PENDING',
    };
  }
  componentWillMount() {
    const data = JSON.parse(localStorage.getItem(LOCALSTORAGE_AUTH_KEY));
    const contra = data.user.contra;
    this.inte = data.user.inte.substring(1);
    this.props.fetchIntegrantes(contra);
  }

  componentWillReceiveProps(props) {
    if (!_.isEmpty(props.integrantes)) {
      const integrante = this.integrante(
        props.integrantes[this.inte - 1].inte,
        props.integrantes[this.inte - 1].sexo,
        props.integrantes[this.inte - 1].edad,
      );
      this.props.onChange(integrante);
      this.setState({ selectIntegrantes: 'SUCCESS' });
    }
  }

  onChangeSelectIntegrantes(e) {
    const integrante = this.integrante(
      e.target.value,
      e.target[e.target.selectedIndex].getAttribute('data-sexo'),
      e.target[e.target.selectedIndex].getAttribute('data-edad'),
    );
    this.props.onChange(integrante);
  }

  integrante(inte, sexo, edad) {
    const integrante = {
      inte,
      sexo,
      edad,
    };
    return integrante;
  }

  render() {
    const selectStyle = {
      textTransform: 'capitalize',
    };

    const options = this.props.integrantes.map(integrante =>
      <option
        key={integrante.inte}
        data-sexo={integrante.sexo}
        data-edad={integrante.edad}
        value={integrante.inte}
      >
        {_.lowerCase(integrante.apellido)}, {_.lowerCase(integrante.nombre)}
      </option>,
    );
    return (
      <div>
        <select
          onChange={e => this.onChangeSelectIntegrantes(e)}
          className="form-control"
          style={selectStyle}
        >
          {this.state.selectIntegrantes === 'PENDING'
            ? <option value="" data-sexo="" data-edad="">
                Cargando...
              </option>
            : null}
          {options}
        </select>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  integrantes: state.integrantes,
});

export default connect(mapStateToProps, integrantesActions)(
  withStyles()(SelectIntegrantes),
);

SelectIntegrantes.propTypes = {
  onChange: PropTypes.func.isRequired,
};
SelectIntegrantes.defaultProp = {
  sexo: false,
  edad: false,
  integrantes: [],
};
