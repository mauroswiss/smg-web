/**
 * @author Juan Carlos Cancela <cancela.juancarlos@gmail.com>
 */

import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ProveedoresPage.css';

class ProveedoresPage extends React.Component {
  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>ProveedoresPage</div>
      </div>
    );
  }
}

export default withStyles(s)(ProveedoresPage);
