import React from 'react';
import PropTypes from 'prop-types';

class TabPanel extends React.Component {
  render() {
    return <div className="tab-content">{this.props.children}</div>;
  }
}
TabPanel.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TabPanel;
