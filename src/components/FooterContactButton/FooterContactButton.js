/**
 * @author Componentes del Footer
 */

import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import onClick from '../../actions/footerActions';
import s from './FooterContactButton.css';

class FooterContactButton extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }
  onClick() {
    this.props.onClickButton();
  }
  render() {
    return (
      <a
        tabIndex={0}
        role="button"
        onClick={() => this.onClick()}
        className={`${s.root} btn-link`}
      >
        &nbsp;
      </a>
    );
  }
}

function mapStateToProps(state) {
  return {
    show: state.show,
  };
}

const mapDispatchToProps = dispatch => ({
  onClickButton: () => dispatch(onClick()),
});

FooterContactButton.propTypes = {
  onClickButton: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(s)(FooterContactButton),
);
