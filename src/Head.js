import React, { PropTypes } from 'react';
import styles from './Head.styl';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const Head = ({ toggleDropdownHandler, promoteLink, dropdownOpen, theme }) =>
  <div
    className={cx('head', [`theme-${theme}`], {
      dropdownOpen
    })}
  >
    <button
      type="button"
      className={cx('toggleButton', 'collapsed', { closeButton: dropdownOpen })}
      onClick={toggleDropdownHandler}
    >
      <span className="sr-only">Toggle navigation</span>
      <span className={cx('iconBar')} />
      <span className={cx('iconBar')} />
      <span className={cx('iconBar')} />
      <span className={cx('iconBar')} />
    </button>
    <h1 className={cx('brand')}>
      <a href="/" rel="home" className={cx('logo')}>
        <span>Auth0</span>
      </a>
      {promoteLink.active ?
        <a
          href={promoteLink.url} className={cx('hiring', 'animated', 'bounce')}
        >
        {promoteLink.text}
        </a>
        : null
      }
    </h1>
  </div>;

Head.propTypes = {
  toggleDropdownHandler: PropTypes.func,
  promoteLink: PropTypes.object,
  dropdownOpen: PropTypes.bool,
  theme: PropTypes.string
};

export default Head;
