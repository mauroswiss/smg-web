/**
 * @author Juan Carlos Cancela <cancela.juancarlos@gmail.com>
 */

import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// external-global styles must be imported in your JS.
import normalizeCss from 'normalize.css';
import { connect } from 'react-redux';
import s from './Layout.css';
import Header from '../Header';
import LeftNavigation from '../LeftNavigation';
import Footer from '../Footer';
import Loading from '../Loading/Loading';

class Layout extends React.Component {
  static defaultProps = {
    wait: false,
  };

  static propTypes = {
    children: PropTypes.node.isRequired,
    wait: PropTypes.bool.isRequired,
  };

  render() {
    return (
      <div>
        {this.props.wait === true ? <Loading /> : null}
        <Header />
        <LeftNavigation />
        {this.props.children}
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  wait: state.loading.wait,
});

export default connect(mapStateToProps, null)(
  withStyles(normalizeCss, s)(Layout),
);
