/**
 * @author React - Componente de Footer.js
 */
/* eslint-env jquery */
/* eslint global-require: "error" */
/* eslint no-return-assign: 2,
         no-extra-parens: 2,
         brace-style: 2,
         semi: 2
*/

import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import PropTypes from 'prop-types';
import s from './Carousel.css';
import CarouselItem from '../CarouselItem/CarouselItem';
import data from './items';

class Carousel extends React.Component {
  static importAll(path) {
    const images = [];
    path.keys().map(item => {
      images[item.replace('./', '')] = path(item);
      return images;
    });
    return images;
  }

  componentDidMount() {
    const carousel = this.carousel;
    $(carousel).carouFredSel({
      auto: {
        items: this.props.items,
        duration: this.props.duration,
        width: this.props.width,
        easing: this.props.easing,
        timeoutDuration: this.props.timeoutDuration,
        pauseOnHover: this.props.pauseOnHover,
      },
    });
  }

  render() {
    const images = Carousel.importAll(
      require.context('./images', false, /\.png/),
    );
    const itemlist = data.map(item =>
      <CarouselItem
        key={item.background}
        href={item.href}
        background={images[`${item.background}`]}
        backgroundHover={images[`${item.backgroundHover}`]}
      />,
    );

    return (
      <div className={`${s.root} hidden-sm-down`}>
        <div
          ref={c => {
            this.carousel = c;
          }}
        >
          {itemlist}
        </div>
      </div>
    );
  }
}

Carousel.propTypes = {
  items: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
  width: PropTypes.string.isRequired,
  easing: PropTypes.string.isRequired,
  timeoutDuration: PropTypes.number.isRequired,
  pauseOnHover: PropTypes.string.isRequired,
};

export default withStyles(s)(Carousel);
