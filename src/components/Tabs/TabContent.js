import React from 'react';
import PropTypes from 'prop-types';

class TabPanel extends React.Component {
  render() {
    return (
      <div
        className={
          this.props.active ? `tab-pane fade show active` : `tab-pane fade show`
        }
      >
        {this.props.children}
      </div>
    );
  }
}
TabPanel.propTypes = {
  children: PropTypes.node.isRequired,
  active: PropTypes.bool,
};

TabPanel.defaultProps = {
  active: false,
};

export default TabPanel;
