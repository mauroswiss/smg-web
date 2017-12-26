import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './HomePageUserLoggedIn.css';

class HomePageUserLoggedIn extends React.Component {
  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1> Logeado </h1>
          <h1> Logeado </h1>
          <h1> Logeado </h1>
          <h1> Logeado </h1>
          <h1> Logeado </h1>
          <h1> Logeado </h1>
          <h1> Logeado </h1>
          <h1> Logeado </h1>
          <h1> Logeado </h1>
          <h1> Logeado </h1>
          <h1> Logeado </h1>
          <h1> Logeado </h1>
          <h1> Logeado </h1>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(HomePageUserLoggedIn);
