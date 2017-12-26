import React from 'react';
import PropTypes from 'prop-types';

class ExternalLink extends React.Component {
  static propTypes = {
    to: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    target: PropTypes.string.isRequired,
  };

  render() {
    const { to, children, target, ...props } = this.props;
    return (
      <a href={to} {...props} target={target}>
        {children}
      </a>
    );
  }
}

export default ExternalLink;
