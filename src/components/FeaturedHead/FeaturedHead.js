import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './FeaturedHead.styl';
import getFeaturedVariant from '../../modules/featured';
import { isNode } from '../../modules/utils';

const cx = styles::classNames;

let featuredVariant = getFeaturedVariant();

const FeaturedHead = ({
  iconColor,
  link,
  title,
  description,
  cta,
  theme,
  dropdownOpen,
  notificationOpen,
  closeNotificationHandler
}) => {
  if (isNode) {
    featuredVariant = getFeaturedVariant();
  }

  return (
    <div
      className={cx(
        'featured',
        [`theme-${theme}`],
        { dropdownOpen },
        { notificationOpen }
      )}
    >
      <div className={cx('featured-content')}>
        <a href={link || featuredVariant.link} rel="external">
          <span
            className={cx('featured-icon')}
            style={{
              backgroundColor: iconColor || featuredVariant.iconColor
            }}
          />
          <span className={cx('featured-title')}>
            {title || featuredVariant.title}
          </span>
          <span className={cx('featured-description')}>
            {description || featuredVariant.description}
          </span>
          <span className={cx('featured-more')}>
            {cta || featuredVariant.cta}
          </span>
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
};

FeaturedHead.propTypes = {
  iconColor: PropTypes.string,
  link: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  cta: PropTypes.string,
  theme: PropTypes.string,
  dropdownOpen: PropTypes.bool,
  notificationOpen: PropTypes.bool,
  closeNotificationHandler: PropTypes.func
};

FeaturedHead.defaultProps = {
  iconColor: null,
  link: null,
  title: null,
  description: null,
  cta: null
};

export default FeaturedHead;
