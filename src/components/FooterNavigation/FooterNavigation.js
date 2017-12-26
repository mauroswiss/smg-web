/**
 * @author Componente del footer
 */

import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import ExternalLink from '../ExternalLink';
import Link from '../Link';
import s from './FooterNavigation.css';
import logoGroupUrl from './images/logo_group_pie.png';
import data from './links';
import FooterContactButton from '../FooterContactButton/FooterContactButton';

class FooterNavigation extends React.Component {
  render() {
    const ItemLinks = Object.keys(data).map((column, index) =>
      <div
        key={column}
        className={
          index === 0
            ? `col-sm-3 col-xs-12 ${s.col}`
            : `col-sm-3 col-xs-12 hidden-sm-down ${s.col}`
        }
      >
        {index === 0 &&
          <Link to="/">
            <img
              className={s.logo}
              src={logoGroupUrl}
              alt="Swiss Medical Group"
            />
          </Link>}
        <h3>
          {column}
        </h3>
        <ul className="list-unstyled">
          {data[column].map(link =>
            <li key={link.name}>
              <ExternalLink
                className={s.link}
                to={link.to}
                target={link.target}
              >
                {link.name}
              </ExternalLink>
            </li>,
          )}
          {index === 3 &&
            <li>
              <FooterContactButton />
            </li>}
        </ul>
      </div>,
    );
    return (
      <div className={`${s.root} row`}>
        {ItemLinks}
      </div>
    );
  }
}

export default withStyles(s)(FooterNavigation);
