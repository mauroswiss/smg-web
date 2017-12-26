/* eslint-env jquery */
import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './LeftNavigation.css';
import LeftNavigationButton from '../LeftNavigationButton/LeftNavigationButton';
import buttons from './buttons';

class LeftNavigation extends React.Component {
  static importAll(path) {
    const images = [];
    path.keys().map(item => {
      images[item.replace('./', '')] = path(item);
      return images;
    });
    return images;
  }

  componentDidMount() {
    $('#navigationIz a').tooltip();
  }

  render() {
    const images = LeftNavigation.importAll(
      require.context('./images', false, /\.png/),
    );
    const items = buttons.map(item => (
      <LeftNavigationButton
        key={item.image}
        href={item.to}
        title={item.title}
        background={images[`${item.image}`]}
      />
    ));

    return (
      <ul className={s.navigationIz} id="navigationIz">
        {items}
      </ul>
    );
  }
}

export default withStyles(s)(LeftNavigation);
