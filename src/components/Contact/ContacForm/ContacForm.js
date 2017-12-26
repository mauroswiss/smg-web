/**
 * Contact Component
 */
/* eslint react/no-did-mount-set-state: 0 */
/* eslint react/prop-types: 0 */
/* eslint consistent-return: 0 */

import React from 'react';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import _ from 'lodash';
import PropTypes from 'prop-types';
import * as authActions from '../../../actions/authActions';
import {
  LOCALSTORAGE_AUTH_KEY,
  LOGIN_STATUS_PENDING,
  LOGIN_STATUS_NOT_LOGGED_IN,
} from '../../../constants';

class ContactForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginStatus: LOGIN_STATUS_PENDING,
      name: '',
      email: '',
      phone: '',
      description: '',
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

  nameChange(e) {
    this.setState({ name: e.target.value });
  }
  emailChange(e) {
    this.setState({ email: e.target.value });
  }
  phoneChange(e) {
    this.setState({ phone: e.target.value });
  }
  descriptionChange(e) {
    this.setState({ description: e.target.value });
  }
  render() {
    return (
      <form className="form-horizontal">
        {_.isEmpty(this.props.auth)
          ? <div>
              <div className="form-group">
                <div className="col-sm-12">
                  <input
                    type="text"
                    placeholder="Nombre y Apellido"
                    required=""
                    className="form-control"
                    value={this.state.name}
                    onChange={e => this.nameChange(e)}
                  />
                </div>
              </div>
              <div className="form-group">
                <div className="col-sm-12">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="E-Mail"
                    required=""
                    value={this.state.email}
                    onChange={e => this.emailChange(e)}
                  />
                </div>
              </div>
            </div>
          : null}
        <div className="form-group">
          <div className="col-sm-12">
            <input
              type="tel"
              className="form-control"
              placeholder="Teléfono"
              required=""
              value={this.state.phone}
              onChange={e => this.phoneChange(e)}
            />
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-12">
            <textarea
              className="form-control"
              placeholder="Consulta"
              required=""
              rows="3"
              value={this.state.description}
              onChange={e => this.descriptionChange(e)}
            />
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-12 ">
            <button
              className="btn btn-danger boton_rojo pull-right"
              onClick={e =>
                this.props.onClickSendMail(
                  e,
                  this.state.name,
                  this.state.email,
                  this.state.phone,
                  this.state.description,
                  this.props.sendEmailProps,
                )}
            >
              ENVIAR
            </button>
          </div>
        </div>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  sendEmail: state.sendEmail.send,
});

ContactForm.propTypes = {
  onClickSendMail: PropTypes.func.isRequired,
  sendEmailProps: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, authActions)(withStyles()(ContactForm));
