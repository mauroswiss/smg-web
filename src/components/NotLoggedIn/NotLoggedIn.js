import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './NotLoggedIn.css';

class NotLoggedIn extends React.Component {
  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1>Titulo</h1>
          <div className={`${s.alert} alert alert-danger`}>
            <strong>
              {this.props.children}
            </strong>
          </div>
        </div>
      </div>
    );
  }
}

NotLoggedIn.propTypes = {
  children: PropTypes.node.isRequired,
};

export default withStyles(s)(NotLoggedIn);
