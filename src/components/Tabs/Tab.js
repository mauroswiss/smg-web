import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import PropTypes from 'prop-types';
import Link from '../Link';
import s from './Tab.css';

class Tab extends React.Component {
  render() {
    return (
      <li className={`nav-item`}>
        <Link
          className={
            this.props.active
              ? `nav-link active ${s.active}`
              : `nav-link  ${s.navItemLink} `
          }
          to={this.props.to}
        >
          {this.props.children}
        </Link>
      </li>
    );
  }
}
Tab.propTypes = {
  children: PropTypes.node.isRequired,
  to: PropTypes.string.isRequired,
  active: PropTypes.bool,
};

Tab.defaultProps = {
  active: false,
};

export default withStyles(s)(Tab);
