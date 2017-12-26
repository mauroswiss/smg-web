import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import PropTypes from 'prop-types';
import s from './LeftNavigationButton.css';
import Link from '../Link';

class LeftNavigationButton extends React.Component {
  static propTypes = {
    background: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  };

  style() {
    const background = this.props.background;
    return { backgroundImage: `url(${background})` };
  }

  render() {
    return (
      <li className={s.datosIco}>
        <Link
          to={this.props.href}
          data-toggle="tooltip"
          data-placement="right"
          title={this.props.title}
          style={this.style()}
        >
          &nbsp;
        </Link>
      </li>
    );
  }
}

export default withStyles(s)(LeftNavigationButton);
