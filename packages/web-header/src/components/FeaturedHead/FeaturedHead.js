import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './FeaturedHead.styl';
import getFeaturedVariant from '../../modules/featured';

const cx = classNames.bind(styles);

let featuredVariant = getFeaturedVariant();

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

  componentWillMount() {
    featuredVariant = getFeaturedVariant();
  }

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
          <a href={link || featuredVariant.link} rel="external">
            <span
              className={cx('featured-icon')}
              style={{
                backgroundColor: iconColor || featuredVariant.iconColor
              }}
            />
            <span
              className={cx('featured-title', { loading })}
              style={{
                color: iconColor || featuredVariant.iconColor
              }}
            >
              {title || featuredVariant.title}
            </span>
            <span className={cx('featured-description', { loading })}>
              {description || featuredVariant.description}
            </span>
            <span className={cx('featured-more', { loading })}>{cta || featuredVariant.cta}</span>
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
