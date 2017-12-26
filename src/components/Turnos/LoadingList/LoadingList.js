import React from 'react';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './LoadingList.css';
import loading from './4.gif';

class LoadingList extends React.Component {
  render() {
    return (
      <div className={`${s.div_loading}`}>
        <img width="50px" src={loading} alt="" />
      </div>
    );
  }
}
export default connect(null, null)(withStyles(s)(LoadingList));
