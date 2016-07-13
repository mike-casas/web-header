import React, { Component, PropTypes } from 'react';
import styles from './DropdownListItem.styl';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

class DropdownListItem extends Component {
  static propTypes = {
    item: PropTypes.object,
    itemHoverHandler: PropTypes.func,
    dropdownReference: PropTypes.object,
    hasArrow: PropTypes.bool,
    parentClass: PropTypes.string,
    closeHeaderDropdown: PropTypes.func
  }

  componentDidMount() {
    const { item } = this.props;
    if (item.highlight && item.highlight.thumbnail) {
      const preloadImage = new Image();
      preloadImage.src = item.highlight.thumbnail;
    }
  }

  render() {
    const { hasArrow, parentClass, itemHoverHandler, item, closeHeaderDropdown } = this.props;
    const logos = {
      auth0: 'https://styleguide.auth0.com/lib/logos/img/badge.png',
      webtask: 'https://webtask.io/images/symbol.svg'
    };
    const linkExternal = item.external ? 'external' : null;
    return (
      <li
        className={cx({
          item: !hasArrow,
          arrowItem: hasArrow,
          moreItem: parentClass === 'moreDropdown'
        })}
        onMouseEnter={() => {itemHoverHandler(item.highlight);}}
      >
        <a href={item.href} onClick={closeHeaderDropdown} rel={linkExternal}>
          {item.icon
            ? <img src={logos[item.icon]} className={cx('icon')} role="presentation" alt="" />
            : null
          }
          <span className={cx('text')}>{item.name}</span>
        </a>
      </li>
    );
  }
}

export default DropdownListItem;
