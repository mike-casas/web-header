import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './FooterList.styl';

import PricingSVG from '../../svg/PricingSVG';
import ProductsSVG from '../../svg/ProductsSVG';
import BlogSVG from '../../svg/BlogSVG';
import ExtendSVG from '../../svg/ExtendSVG';

const cx = styles::classNames;

class FooterList extends Component {
  static propTypes = {
    footer: PropTypes.object,
    closeDropdowns: PropTypes.func
  };

  render() {
    const { footer, closeDropdowns } = this.props;
    const logos = {
      pricing: <PricingSVG />,
      products: <ProductsSVG />,
      blog: <BlogSVG />,
      extend: <ExtendSVG />
    };

    const linkExternal = footer.external ? 'external' : null;
    return (
      <a
        className={cx('footer-link')}
        href={footer.href}
        onClick={closeDropdowns}
        rel={linkExternal}
      >
        {footer.icon ? <span className={cx('icon')}>{logos[footer.icon]}</span> : null}
        <span className={cx('text')} dangerouslySetInnerHTML={{ __html: footer.name }} />
      </a>
    );
  }
}

export default FooterList;
