import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Head.styl';

const cx = styles::classNames;

const Head = ({ toggleDropdownHandler, dropdownOpen, theme, closeHeaderDropdown }) =>
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
      <a href="/" rel="home" className={cx('logo')} onClick={closeHeaderDropdown}>
        <span>Auth0</span>
      </a>
    </h1>
  </div>;

Head.propTypes = {
  toggleDropdownHandler: PropTypes.func,
  dropdownOpen: PropTypes.bool,
  theme: PropTypes.string,
  closeHeaderDropdown: PropTypes.func
};

export default Head;
