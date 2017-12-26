/**
 * @author Juan Carlos Cancela <cancela.juancarlos@gmail.com>
 */

import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Footer.css';
import LegalGroup from '../LegalGroup/LegalGroup';
import Carousel from '../Carousel/Carousel';
import Accordion from '../Accordion/Accordion';

class Footer extends React.Component {
  render() {
    return (
      <footer className={`${s.root} hidden-xs`}>
        <Accordion className="hidden-xs" />
        <Carousel
          className="hidden-sm-down"
          items={5}
          duration={15000}
          width="100%"
          easing="linear"
          timeoutDuration={0}
          pauseOnHover="immediate"
        />
        <LegalGroup />
      </footer>
    );
  }
}

export default withStyles(s)(Footer);
