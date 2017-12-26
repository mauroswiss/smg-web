/* eslint react/no-did-mount-set-state: 0 */
/* eslint consistent-return: 0 */
/* eslint react/prop-types: 0 */

import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import NotLoggedIn from '../../components/NotLoggedIn/NotLoggedIn';
import TurnosPageUserLoggedIn from './TurnosPageUserLoggedIn';
import {
  LOGIN_STATUS_PENDING,
  LOGIN_STATUS_NOT_LOGGED_IN,
  LOGIN_STATUS_LOGGED_IN,
} from '../../constants/index';

class TurnosPage extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: LOGIN_STATUS_PENDING,
    };
  }

  componentDidMount() {
    if (_.isEmpty(this.props.auth)) {
      this.setState({ isLoggedIn: LOGIN_STATUS_NOT_LOGGED_IN });
    }
  }

  componentWillReceiveProps() {
    if (!_.isEmpty(this.props.auth)) {
      this.setState({ isLoggedIn: LOGIN_STATUS_NOT_LOGGED_IN });
    } else {
      this.setState({ isLoggedIn: LOGIN_STATUS_LOGGED_IN });
    }
  }

  render() {
    if (
      !_.isEmpty(this.props.auth) ||
      this.state.isLoggedIn === LOGIN_STATUS_LOGGED_IN
    ) {
      return <TurnosPageUserLoggedIn />;
    }
    if (this.state.isLoggedIn === LOGIN_STATUS_NOT_LOGGED_IN) {
      return (
        <NotLoggedIn>
          Por favor, inicie sesión para gestionar turnos a través de nuestro
          sitio web.
        </NotLoggedIn>
      );
    }
    if (this.state.isLoggedIn === LOGIN_STATUS_PENDING) {
      return <div />;
    }
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, null)(withStyles()(TurnosPage));
