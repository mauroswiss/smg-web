/**
 * @author React - Componente de Footer.js
 */

import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Accordion.css';
import FooterNavigation from '../FooterNavigation/FooterNavigation';

class Accordion extends React.Component {
  render() {
    return (
      <div className={s.root}>
        <input className={s.toggle} type="checkbox" />
        <i className={s.label}>&nbsp;</i>
        <div className={s.collapsed}>
          <div className={`${s.container} container`}>
            <FooterNavigation />
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Accordion);
