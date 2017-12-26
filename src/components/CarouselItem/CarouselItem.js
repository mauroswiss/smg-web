/**
 * @author React - Componente de Footer.js
 */
/* eslint-env jquery */

import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import PropTypes from 'prop-types';
import s from './CarouselItem.css';

class CarouselItem extends React.Component {
  constructor() {
    super();
    this.state = {
      hover: false,
    };
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
  }

  handleMouseOver() {
    this.setState({
      hover: true,
    });
  }

  style() {
    let style;
    const background = this.props.background;
    const backgroundHover = this.props.backgroundHover;
    if (this.state.hover === false) {
      style = { content: `url(${background})` };
    } else {
      style = { content: `url(${backgroundHover})` };
    }
    return style;
  }

  handleMouseOut() {
    this.setState({
      hover: false,
    });
  }

  render() {
    return (
      <div className={s.item}>
        <a
          href={this.props.href}
          onMouseOver={this.handleMouseOver}
          onMouseOut={this.handleMouseOut}
          style={this.style()}
          target="_blank"
        >
          &nbsp;
        </a>
      </div>
    );
  }
}

CarouselItem.propTypes = {
  href: PropTypes.string.isRequired,
  background: PropTypes.string.isRequired,
  backgroundHover: PropTypes.string.isRequired,
};

export default withStyles(s)(CarouselItem);
