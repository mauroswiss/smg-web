import React from 'react';
import PropTypes from 'prop-types';

class TabsList extends React.Component {
  render() {
    return <ul className="nav nav-tabs">{this.props.children}</ul>;
  }
}
TabsList.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TabsList;
