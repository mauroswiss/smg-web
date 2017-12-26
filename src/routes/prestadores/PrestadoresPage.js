/**
 * @author Juan Carlos Cancela <cancela.juancarlos@gmail.com>
 */

import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './PrestadoresPage.css';

class PrestadoresPage extends React.Component {
  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>PrestadoresPage</div>
      </div>
    );
  }
}

export default withStyles(s)(PrestadoresPage);
