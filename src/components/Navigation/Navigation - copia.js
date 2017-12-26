/**
 * @author Juan Carlos Cancela <cancela.juancarlos@gmail.com>
 */
/* eslint react/no-did-mount-set-state: 0 */
/* eslint react/prop-types: 0 */
/* eslint consistent-return: 0 */

import React from 'react';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import _ from 'lodash';
import * as authActions from '../../actions/authActions';
import { LOCALSTORAGE_AUTH_KEY } from '../../constants';
import s from './Navigation.css';
import ExternalLink from '../ExternalLink';

const LOGIN_STATUS_PENDING = 'pending';
const LOGIN_STATUS_NOT_LOGGED_IN = 'not-logged-in';

class Navigation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loginStatus: LOGIN_STATUS_PENDING,
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

  render() {
    return (
      <div
        className={`${s.root} hidden-sm-down`}
        role="navigation"
        id="navigation_top"
      >
        {_.isEmpty(this.props.auth) ? (
          <ul>
            <li>
              <ExternalLink
                className={`${s.link} ${s.active} `}
                target="_self"
                to="https://www.swissmedical.com.ar/smgnewsite/prepaga/index.php"
              >
                PERSONAS
              </ExternalLink>
            </li>
            <li>
              <span className={s.spacer}> | </span>
            </li>
            <li>
              <ExternalLink
                className={s.link}
                target="_self"
                to="https://www.swissmedical.com.ar/smgnewsite/prepagaempresas/index.php"
              >
                EMPRESAS
              </ExternalLink>
            </li>
            <li>
              <span className={s.spacer}> | </span>
            </li>
            <ExternalLink
              className={s.link}
              target="_self"
              to="https://www.swissmedical.com.ar/prestadores/home/"
            >
              PRESTADORES
            </ExternalLink>
            <li>
              <span className={s.spacer}> | </span>
            </li>
            <li>
              <ExternalLink
                className={s.link}
                target="_self"
                to="https://www.swissmedical.com.ar/proveedores/"
              >
                PROVEEDORES
              </ExternalLink>
            </li>
            <li>
              <span className={s.spacer}> | </span>
            </li>
            <li>
              <ExternalLink
                className={s.link}
                target="_self"
                to="https://sts.swissmedical.com.ar/adfs/ls/?client-request-id=8dd8db82-48a4-402a-8cc2-bc85131f4299&username=&wa=wsignin1.0&wtrealm=urn%3afederation%3aMicrosoftOnline&wctx=estsredirect%3d2%26estsrequest%3drQIIAeNisDLKKCkpKLbS1y8uzywuzk1NyUxOzEkvyi8t0CvOSCxKLcjPzCvRS87P1csvSs9MAbGKhLgEmm7f6F3ioeXQc2hPq7C808xZjMLIBoA1JBatYvQh1nj94syS1GL95Py81OSSxJT8Yv2AxPTMvMRi_cy8lNQKvcTigooLjIwvGBlvMQn6F6V7poQXu6WmpBYllmTm511gEXjFwmPAbMXBwSbAKMGgwPCDhXERK9ChCVl28VuL5Bzn9u69xsTFznCKVT_SK8o4wCQ92LRAOy_S0TUsNTjL3yInItGsOKus1ELfJMfR1zUy0zTPzdPT1sDKcAKb0AQ2plNsDLs4qeobAA2"
              >
                COLABORADORES
              </ExternalLink>
            </li>
            <li>
              <span className={s.spacer}> | </span>
            </li>
            <li>
              <ExternalLink
                className={s.link}
                target="_self"
                to="http://rrhh.swissmedical.com.ar/frontend/index.asp"
              >
                RRHH
              </ExternalLink>
            </li>
          </ul>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, authActions)(withStyles(s)(Navigation));
