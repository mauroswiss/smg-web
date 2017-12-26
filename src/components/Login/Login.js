/**
 * Login Component
 * @author Juan Carlos Cancela <cancela.juancarlos@gmail.com>
 */
/* global $ */
/* eslint react/no-did-mount-set-state: 0 */
/* eslint react/prop-types: 0 */
/* eslint consistent-return: 0 */

import React from 'react';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import _ from 'lodash';
import * as authActions from '../../actions/authActions';
import {
  LOCALSTORAGE_AUTH_KEY,
  LOGIN_STATUS_PENDING,
  LOGIN_STATUS_NOT_LOGGED_IN,
} from '../../constants';
import s from './Login.css';
import Link from '../Link';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loginStatus: LOGIN_STATUS_PENDING,
      showLoginPop: false,
      showUserPop: false,
    };
  }

  componentDidMount() {
    const auth = localStorage.getItem(LOCALSTORAGE_AUTH_KEY);
    if (_.isEmpty(auth)) {
      this.setState({ loginStatus: LOGIN_STATUS_NOT_LOGGED_IN });
    } else {
      this.props.authSuccess(JSON.parse(auth));
    }
  }

  componentWillReceiveProps(props) {
    if (
      _.isEmpty(props.auth) &&
      this.state.loginStatus !== LOGIN_STATUS_NOT_LOGGED_IN
    ) {
      this.setState({ loginStatus: LOGIN_STATUS_NOT_LOGGED_IN });
    }
    this.setState({ showLoginPop: false });
    this.setState({ showUserPop: false });
  }

  onLoginDataSubmit() {
    const user = $('#userField').val();
    const pass = $('#passwordField').val();
    this.props.fetchAuth(user, pass);
  }

  showLoginPop(showLoginPop) {
    this.setState({ showLoginPop: !showLoginPop });
  }

  showUserPop(showUserPop) {
    this.setState({ showUserPop: !showUserPop });
  }

  logOut(e) {
    e.preventDefault();
    this.props.authLogOut();
    this.setState({ loginStatus: LOGIN_STATUS_NOT_LOGGED_IN });
  }

  render() {
    const loginStatus = this.state.loginStatus;
    const showLoginPop = this.state.showLoginPop;
    const showUserPop = this.state.showUserPop;

    if (!_.isEmpty(this.props.auth)) {
      localStorage.setItem(
        LOCALSTORAGE_AUTH_KEY,
        JSON.stringify(this.props.auth),
      );
      const name = this.props.auth.user.nombre;
      const surname = this.props.auth.user.apellido;
      return (
        <div className={s.welcome}>
          <button
            onClick={() => this.showUserPop(showUserPop)}
            className={showUserPop ? `${s.active}` : null}
          >
            <i className={`${s.user_icon} glyphicon glyphicon-user`} />
            {name} {surname}
            <i
              className={`${s.down_arrow} fa fa-sort-desc`}
              aria-hidden="true"
            />
          </button>
          {showUserPop
            ? <ul
                id="listaAccionesUser"
                className={`${s.listaAccionesUser} dropdown-menu`}
                role="menu"
                aria-labelledby="dropDownUser"
              >
                <li role="presentation">
                  <a role="menuitem" tabIndex="-1" href="mis_datos.php">
                    Mis Datos
                  </a>
                </li>
                <li role="presentation">
                  <a
                    role="menuitem"
                    tabIndex="-1"
                    onClick={e => this.logOut(e)}
                  >
                    Cerrar Sesión
                  </a>
                </li>
              </ul>
            : null}
        </div>
      );
    }
    if (loginStatus === LOGIN_STATUS_PENDING) {
      return <div />;
    }
    if (loginStatus === LOGIN_STATUS_NOT_LOGGED_IN) {
      return (
        <div>
          <div className={`${s.loginWrap} hidden-sm-down`}>
            <button
              type="button"
              onClick={() => this.showLoginPop(showLoginPop)}
              className={`${s.btn_ing} btn btn-sm`}
            >
              Iniciar Sesión
            </button>
            <button type="button" className={`${s.btn_reg} btn btn-sm`}>
              Regístrese
            </button>
            {showLoginPop
              ? <div>
                  <div className={`${s.loginDialogArrow}`} />
                  <div className={`${s.loginDialog} container`}>
                    <div className={`${s.row} form-group row`}>
                      <div className={`${s.col} col-lg-5`}>
                        <select
                          className={`${s.loginTooltipTipoDoc} custom-select`}
                        >
                          <option value="DU">DNI</option>
                          <option value="LC">LC</option>
                          <option value="LE">LE</option>
                          <option value="PA">PA</option>
                        </select>
                      </div>
                      <div className={`${s.col} col-lg-7`}>
                        <input
                          id="userField"
                          type="text"
                          className="form-control"
                          placeholder="N° Documento"
                          maxLength="8"
                        />
                      </div>
                    </div>
                    <div className={`${s.row} form-group row`}>
                      <div className={`${s.col} col-lg-12`}>
                        <input
                          id="passwordField"
                          type="password"
                          className="form-control"
                          placeholder="Contraseña"
                        />
                      </div>
                    </div>
                    <div className={`${s.row} form-group row`}>
                      <div className={`${s.col} col-lg-12`}>
                        <button
                          type="button"
                          onClick={() => this.onLoginDataSubmit()}
                          className={`${s.boton_rojo} btn btn-danger`}
                        >
                          Iniciar Sesión
                        </button>
                      </div>
                    </div>

                    <div className="form-group">
                      <Link to="/">¿Olvidaste tu contraseña?</Link>
                    </div>
                  </div>
                </div>
              : null}
          </div>
          <div className={`${s.loginWrapSmall} hidden-md-up visible-md-down`}>
            <a className="btn boton_gris" href="login_mobile.php">
              <i className="fa fa-user" />
            </a>
            <a className="btn boton_gris" href="index.php">
              <i className="fa fa-home" />
            </a>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  auth: state.auth.loginResponse,
});

export default connect(mapStateToProps, authActions)(withStyles(s)(Login));
