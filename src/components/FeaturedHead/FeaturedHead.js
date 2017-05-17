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
  closeHeaderDropdown
}) => {
  const ribbonVariant = getRibbonVariant();
  return (
    <div className={cx('featured', [`theme-${theme}`], {
      dropdownOpen
    })}>
      {featured
        ? <div className={cx('featured-content')}>
            <p dangerouslySetInnerHTML={{ __html: ribbonVariant.text }}/>
            <a
              href={featuredLink || ribbonVariant.link}
              onClick={closeHeaderDropdown}
              rel="external"
            >
              { featuredText || ribbonVariant.linkText }
            </a>
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
  closeHeaderDropdown: PropTypes.func
};

export default FeaturedHead;
