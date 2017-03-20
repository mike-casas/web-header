import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import styles from './FooterMobile.styl';

const cx = styles::classNames;

class FooterMobile extends Component {
  static propTypes = {
    mobileLinks: PropTypes.object
  }

  render() {
    const { mobileLinks } = this.props;

    const linkExternal = mobileLinks.external ? 'external' : null;
    return (

        <li>
          <a className={cx('mobile-link')} href={mobileLinks.href} rel={linkExternal}>
            {mobileLinks.name}
          </a>
        </li>
    );
  }
}

export default FooterMobile;
