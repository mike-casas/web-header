import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import styles from './DropdownListItem.styl';

const cx = styles::classNames;

class DropdownListItem extends Component {
  static propTypes = {
    item: PropTypes.object,
    highlightHandler: PropTypes.func,
    hasArrow: PropTypes.bool,
    parentClass: PropTypes.string,
    closeDropdowns: PropTypes.func
  }

  componentDidMount() {
    /* eslint-env browser */
    const { item } = this.props;
    if (item.highlight && item.highlight.thumbnail) {
      const preloadImage = new Image();
      preloadImage.src = item.highlight.thumbnail;
    }
  }

  render() {
    const { hasArrow, parentClass, highlightHandler, item, closeDropdowns } = this.props;
    const logos = {
      auth0: 'https://cdn.auth0.com/styleguide/4.8.32/lib/logos/img/badge.png',
      webtask: 'https://webtask.io/images/symbol.svg',
      guardian: 'https://cdn.auth0.com/blog/guardian-assets/guardian.svg',
      b2c: 'https://cdn.auth0.com/website/header/b2c-logo-pill.svg',
      b2b: 'https://cdn.auth0.com/website/header/b2b-logo-pill.svg'
    };
    const linkExternal = item.external ? 'external' : null;
    return (
      <li
        className={cx({
          item: !hasArrow,
          arrowItem: hasArrow,
          moreItem: parentClass === 'moreDropdown'
        })}
        onMouseEnter={() => { highlightHandler(item.highlight); }}
        onFocus={() => { highlightHandler(item.highlight); }}
        role="menuitem"
      >

        <a className={cx(item.customClass || '')} href={item.href} onClick={closeDropdowns} rel={linkExternal}>
          {item.icon
            ? <img src={logos[item.icon]} className={cx('icon')} role="presentation" alt={item.alt} />
            : null
          }
          <span className={cx('text')}>
            {item.prefix
              ? <span className={cx('itemPrefix')}>{item.prefix}</span>
              : null
            }
            {item.name}
          </span>
        </a>
      </li>
    );
  }
}

export default DropdownListItem;
