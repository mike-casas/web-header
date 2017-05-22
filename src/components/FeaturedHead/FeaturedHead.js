import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './FeaturedHead.styl';

import getRibbonVariant from '../../modules/ribbon';

const cx = styles::classNames;

const FeaturedHead = ({
  featured,
  featuredLink,
  featuredText,
  theme,
  dropdownOpen,
  notificationOpen,
  closeNotificationHandler
}) => {
  const ribbonVariant = getRibbonVariant();
  return (
    <div className={cx('featured', [`theme-${theme}`], { dropdownOpen }, { notificationOpen })}>
      {featured
        ? <div className={cx('featured-content')}>
            <a
              href={featuredLink || ribbonVariant.link}
              rel="external"
            >
              <span className={cx('featured-title')}>{ribbonVariant.linkTextTitle}</span>
              <span className={cx('featured-description')}>{ribbonVariant.linkTextDescription}</span>
              <span className={cx('featured-more')}>{ribbonVariant.linkTextMore}</span>
            </a>
            <button type="button" className={cx('close-notification')} onClick={closeNotificationHandler}/>
          </div>
        : null
      }
    </div>
  );
};

FeaturedHead.propTypes = {
  featured: PropTypes.bool,
  featuredLink: PropTypes.string,
  featuredText: PropTypes.string,
  theme: PropTypes.string,
  dropdownOpen: PropTypes.bool,
  notificationOpen: PropTypes.bool,
  closeNotificationHandler: PropTypes.func
};

export default FeaturedHead;
