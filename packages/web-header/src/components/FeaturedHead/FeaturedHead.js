import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './FeaturedHead.styl';

const cx = classNames.bind(styles);

class FeaturedHead extends Component {
  static propTypes = {
    iconColor: PropTypes.string,
    link: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    cta: PropTypes.string,
    theme: PropTypes.string,
    dropdownOpen: PropTypes.bool,
    notificationOpen: PropTypes.bool,
    closeNotificationHandler: PropTypes.func,
    loading: PropTypes.bool.isRequired
  };

  static defaultProps = {
    iconColor: null,
    link: null,
    title: null,
    description: null,
    cta: null
  };

  render() {
    const {
      iconColor,
      link,
      title,
      description,
      cta,
      theme,
      dropdownOpen,
      notificationOpen,
      closeNotificationHandler,
      loading
    } = this.props;

    return (
      <div className={cx('featured', [`theme-${theme}`], { dropdownOpen }, { notificationOpen })}>
        <div className={cx('featured-content')}>
          <a href={link} rel="external">
            <span
              className={cx('featured-icon')}
              style={{
                backgroundColor: iconColor
              }}
            />
            <span
              className={cx('featured-title', { loading })}
              style={{
                color: iconColor
              }}
            >
              {title}
            </span>
            <span className={cx('featured-description', { loading })}>{description}</span>
            <span className={cx('featured-more', { loading })}>{cta}</span>
          </a>
          <button
            type="button"
            className={cx('close-notification')}
            onClick={closeNotificationHandler}
          >
            <span className="sr-only">Close featured banner</span>
          </button>
        </div>
      </div>
    );
  }
}

export default FeaturedHead;
