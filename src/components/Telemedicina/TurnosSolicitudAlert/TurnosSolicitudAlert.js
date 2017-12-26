/* eslint react/no-did-mount-set-state: 0 */
/* eslint react/prop-types: 0 */
/* eslint consistent-return: 0 */

import React from 'react';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './TurnosSolicitudAlert.css';

class TurnosSolicitudAlert extends React.Component {
  render() {
    const alertType = this.props.alertType;
    let style;
    if (alertType === 'success') {
      style = s.success;
    } else if (alertType === 'warning') {
      style = s.warning;
    }

    return (
      <div
        className={`${style} alert alert-${alertType} text-left row`}
        role="alert"
      >
        {this.props.children}
      </div>
    );
  }
}

export default connect(null, null)(withStyles(s)(TurnosSolicitudAlert));
