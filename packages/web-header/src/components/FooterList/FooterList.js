import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './FooterList.styl';

const cx = classNames.bind(styles);

const FooterList = ({ footer, closeDropdowns, loading }) => (
  <a
    className={cx('footer-link')}
    href={footer.href}
    onClick={closeDropdowns}
    rel={footer.external ? 'external' : null}
  >
    {footer.icon && (
      <span className={cx('icon', { loading })} dangerouslySetInnerHTML={{ __html: footer.icon }} />
    )}
    <span className={cx('text', { loading })} dangerouslySetInnerHTML={{ __html: footer.name }} />
  </a>
);

FooterList.propTypes = {
  footer: PropTypes.object,
  closeDropdowns: PropTypes.func,
  loading: PropTypes.bool.isRequired
};

export default FooterList;
