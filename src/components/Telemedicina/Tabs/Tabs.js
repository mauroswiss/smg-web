/* global $ */
/* eslint react/no-did-mount-set-state: 0 */
/* eslint react/prop-types: 0 */
/* eslint consistent-return: 0 */

import React from 'react';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Tabs.css';
import TurnosConsulta from '../../../components/Telemedicina/TurnosConsulta/TurnosConsulta';
import TurnosSolicitud from '../../../components/Telemedicina/TurnosSolicitud/TurnosSolicitud';

class Tabs extends React.Component {
  componentDidMount() {
    $('li.nav-item>a.active').css('border-top', '3px solid #f20000');
    $('li.nav-item>a.nav-link').on('click', function() {
      $(this).css('border-top', '3px solid #f20000');
      $('li.nav-item>a.nav-link')
        .not($(this))
        .css('border-top', '3px solid transparent');
    });
  }

  render() {
    return (
      <div>
        <div className={s.container}>
          <ul className="nav nav-tabs" id="myTab" role="tablist">
            <li className="nav-item">
              <a
                className={`${s.navItemLink} nav-link active`}
                id="home-tab"
                data-toggle="tab"
                href="#home"
                role="tab"
                aria-controls="home"
                aria-selected="true"
              >
                Solicitud turnos
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`${s.navItemLink} nav-link`}
                id="profile-tab"
                data-toggle="tab"
                href="#profile"
                role="tab"
                aria-controls="profile"
                aria-selected="false"
              >
                Consulta turnos
              </a>
            </li>
          </ul>
          <div className="tab-content" id="myTabContent">
            <div
              className="tab-pane fade show active"
              id="home"
              role="tabpanel"
              aria-labelledby="home-tab"
            >
              <TurnosSolicitud />
            </div>
            <div
              className="tab-pane fade"
              id="profile"
              role="tabpanel"
              aria-labelledby="profile-tab"
            >
              <TurnosConsulta />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// const mapStateToProps = state => ({
//   removeTurnoResp: state.turnos.remove,
// });

export default connect(null, null)(withStyles(s)(Tabs));
