/**
 * @author Juan Carlos Cancela <cancela.juancarlos@gmail.com>
 */

import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// external-global styles must be imported in your JS.
import normalizeCss from 'normalize.css';
import s from './Loading.css';
import Logo from './images/4.gif';

class Loading extends React.Component {
  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <img src={Logo} alt="loading" />
        </div>
      </div>
    );
  }
}

export default withStyles(normalizeCss, s)(Loading);
