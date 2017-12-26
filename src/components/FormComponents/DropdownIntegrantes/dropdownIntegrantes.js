import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import s from './dropdownIntegrantes.css';
import fetchIntegrantes from '../../../actions/integrantes';
import { LOCALSTORAGE_AUTH_KEY } from '../../../constants';

class DropdownIntegrantes extends React.Component {
  static get propTypes() {
    return {
      fetchIntegrantes: PropTypes.func.isRequired,
      integrantes: PropTypes.array.isRequired,
      setIntegrante: PropTypes.func.isRequired,
    };
  }

  static calculateAge(dob) {
    const diffMs = Date.now() - dob.getTime();
    const ageDt = new Date(diffMs);
    return Math.abs(ageDt.getUTCFullYear() - 1970);
  }

  constructor(props) {
    super(props);
    this.state = {
      integranteSeleccionado: 'Integrantes',
      integranteSeleccionadoEdad: '',
      integranteSeleccionadoSexo: '',
    };
    this.seleccionarIntegrante = this.seleccionarIntegrante.bind(this);
  }

  componentDidMount() {
    const datos = JSON.parse(localStorage.getItem(LOCALSTORAGE_AUTH_KEY));
    if (datos) {
      this.props.fetchIntegrantes(datos.user.contra);
    }
  }

  componentWillReceiveProps(nextProps) {
    // Si vienen lso datos para el combo integrantes
    if (
      JSON.stringify(this.props.integrantes) !==
      JSON.stringify(nextProps.integrantes)
    ) {
      if (
        typeof nextProps.integrantes.afiliado !== 'undefined' &&
        typeof nextProps.integrantes.afiliado[0] !== 'undefined' &&
        typeof nextProps.integrantes.afiliado[0].datospersonales !== 'undefined'
      ) {
        // Selecciono el primer integrante
        this.setState({
          integranteSeleccionado: `${nextProps.integrantes.afiliado[0]
            .datospersonales.apellido}, ${nextProps.integrantes.afiliado[0]
            .datospersonales.nombre}`,
        });
      }
    }
  }

  seleccionarIntegrante(e) {
    const integranteSel = e.currentTarget.innerHTML;
    const sexoIntegranteSel = e.currentTarget.getAttribute('data-sexo');
    const fechaNac = new Date(e.currentTarget.getAttribute('data-edad'));
    const edadIntegranteSel = DropdownIntegrantes.calculateAge(
      new Date(fechaNac.getFullYear(), fechaNac.getDate(), fechaNac.getMonth()),
    );

    this.setState({ integranteSeleccionado: integranteSel });
    this.setState({ integranteSeleccionadoEdad: edadIntegranteSel });
    this.setState({ integranteSeleccionadoSexo: sexoIntegranteSel });
    this.props.setIntegrante(integranteSel);
  }

  render() {
    if (_.isEmpty(this.props.integrantes)) {
      return (
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          id="dropdownMenuButton"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
          style={{
            width: '100%',
            textAlign: 'left',
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
            height: 'calc(2.25rem + 2px)',
            fontSize: '14px',
          }}
        >
          <div style={{ width: '98%', display: 'inline-block' }}>
            loading...
          </div>
        </button>
      );
    }

    return (
      <div className="dropdown" style={{ width: '100%' }}>
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          id="dropdownMenuButton"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
          style={{
            width: '100%',
            textAlign: 'left',
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
            height: 'calc(2.25rem + 2px)',
            fontSize: '14px',
          }}
          data-edad={this.state.integranteSeleccionadoEdad}
          data-sexo={this.state.integranteSeleccionadoSexo}
        >
          <div style={{ width: '98%', display: 'inline-block' }}>
            {this.state.integranteSeleccionado}
          </div>
        </button>

        <div
          className="dropdown-menu"
          aria-labelledby="dropdownMenuButton"
          style={{ width: '100%' }}
        >
          {this.props.integrantes.afiliado.map(afiliado =>
            <ul
              className="dropdown-item"
              key={afiliado.contra + afiliado.inte}
              style={{
                marginBottom: 0,
                fontSize: '14px',
                width: '100%',
                padding: 0,
              }}
            >
              <li
                role="menuitem"
                className={s.itemList}
                onClick={this.seleccionarIntegrante}
                style={{ padding: '3px 1.5rem', cursor: 'pointer' }}
                data-edad={afiliado.datospersonales.fechanacimiento}
                data-sexo={afiliado.datospersonales.sexo}
              >
                {`${afiliado.datospersonales.apellido}, ${afiliado
                  .datospersonales.nombre}`}
              </li>
            </ul>,
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    integrantes: state.integrantes,
    auth: state.auth,
  };
}

DropdownIntegrantes.defaultProps = {
  integrantes: [],
};

export default connect(mapStateToProps, { fetchIntegrantes })(
  withStyles(s)(DropdownIntegrantes),
);
