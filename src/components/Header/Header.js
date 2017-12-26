/**
 * @author Juan Carlos Cancela <cancela.juancarlos@gmail.com>
 */
/* global $ */

import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Header.css';
import Link from '../Link';
import Navigation from '../Navigation';
import logoUrl from './images/logo-smg.png';
import Login from '../Login/Login';
import MenuTop from '../MenuTop/MenuTop';
import Contact from '../Contact/Contact';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showProductosPop: false,
    };
  }

  componentDidMount() {
    function acomodarMenuScroll() {
      if ($(window).scrollTop() > 30 || $(window).width() < 768) {
        $('#navigation_top, #logo_header').hide();
        $('#app').css('padding-top', '150px');
        $('#nav_main').css({
          top: '0',
          position: 'fixed',
        });
        $('#menu_top').css('top', '51px');
      } else {
        $('#navigation_top, #logo_header').show();
        $('#app').css('padding-top', '0');
        $('#nav_main').css({
          position: 'relative',
        });
        $('#menu_top').css('top', '121px');
      }
    }

    function acomodarMenuResize() {
      if ($(window).width() < 768) {
        acomodarMenuScroll();
      } else {
        acomodarMenuScroll();
      }
    }

    $(window).resize(() => {
      acomodarMenuResize();
    });

    $(window).on('scroll', () => {
      acomodarMenuScroll();
    });

    acomodarMenuResize();
  }

  navigationBar() {
    const showProductosPop = this.state.showProductosPop;
    return (
      <nav
        className={`${s.smgbar} navbar navbar-toggleable-md navbar-light bg-faded`}
        id="nav_main"
      >
        <div className={`${s.nav_inner}`}>
          <MenuTop />
          <div
            className={`${s.navbar_right} btn-group hidden-md-down`}
            id="navbar_right"
          >
            <button
              type="button"
              className="btn-apps"
              onClick={() => this.showProductosPop(showProductosPop)}
            >
              <i className="glyphicon glyphicon-link" />
            </button>
            <a href="index.php">
              <button type="button" className="btn-apps">
                <i className="glyphicon glyphicon-home" />
              </button>
            </a>
            {showProductosPop
              ? <ul className={`${s.dropdown_menu}`} role="menu">
                  <div className={`${s.btn_group}`}>
                    <a href="../prepaga/?origen=nav">
                      <div className={`${s.logoSMMP}`} />
                    </a>
                    <a href="../smglife/?origen=nav">
                      <div className={`${s.logoLIFE}`} />
                    </a>
                    <a href="../seguros/?origen=nav">
                      <div className={`${s.logoSEGUROS}`} />
                    </a>
                  </div>
                </ul>
              : null}
          </div>
          <Login />
        </div>
      </nav>
    );
  }

  showProductosPop(showProductosPop) {
    this.setState({ showProductosPop: !showProductosPop });
  }

  render() {
    return (
      <div>
        <Navigation />
        <div className={`${s.container} hidden-md-down`} id="logo_header">
          <Link className={s.brand} to="/">
            <img
              src={logoUrl}
              height="49"
              width="257"
              alt="Swiss Medical Group"
            />
          </Link>
        </div>
        {this.navigationBar()}
        <Contact />
      </div>
    );
  }
}

export default withStyles(s)(Header);
