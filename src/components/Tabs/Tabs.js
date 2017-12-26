import React from 'react';
import PropTypes from 'prop-types';

class Tabs extends React.Component {
  render() {
    return <div className="mt-5">{this.props.children}</div>;
  }
}
Tabs.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Tabs;
