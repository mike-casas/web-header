import React, { PropTypes } from 'react';
import styles from './DropdownListItem.styl';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

class DropdownListItem extends React.Component {
  static propTypes = {
    item: PropTypes.object,
    itemHoverHandler: PropTypes.func,
    dropdownReference: PropTypes.object,
    hasArrow: PropTypes.bool,
    parentClass: PropTypes.string
  };

  render() {
    const logos = {
      auth0: 'http://styleguide.auth0.com/lib/logos/img/badge.png',
      webtask: 'https://webtask.io/images/symbol.svg'
    };

    return (
      <li
        className={cx({
          item: !this.props.hasArrow,
          arrowItem: this.props.hasArrow,
          moreItem: this.props.parentClass === 'moreDropdown'
        })}
        onMouseEnter={this.props.itemHoverHandler}
      >
      <a href={this.props.item.href}>
        {this.props.item.icon ?
          <img src={logos[this.props.item.icon]} className={cx('icon')} role="presentation" />
          : null }
          <span className={cx('text')}>{this.props.item.name}</span>
      </a>
      </li>
    );
  }
}

export default DropdownListItem;
