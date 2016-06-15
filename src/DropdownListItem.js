import React, { PropTypes } from 'react';
import styles from './DropdownListItem.styl';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

class DropdownListItem extends React.Component {
  static propTypes = {
    item: PropTypes.object,
    itemHoverHandler: PropTypes.func,
    dropdownReference: PropTypes.object,
    hasArrows: PropTypes.bool
  };

  render() {
    const logos = {
      auth0: 'https://cdn.auth0.com/styleguide/latest/lib/circle-logo/img/ruby.svg',
      webtask: 'https://cdn.auth0.com/styleguide/latest/lib/circle-logo/img/angular.svg'
    };

    return (
      <li
        className={cx({
          item: !this.props.hasArrows,
          arrowItem: this.props.hasArrows
        })}
        onMouseEnter={this.itemHoverHandler}
      >
      <a href={this.props.item.href}>
        {this.props.item.icon ?
          <img src={logos[this.props.item.icon]} className={cx('icon')} role="presentation" />
          : null }
        {this.props.item.name}
      </a>
      </li>
    );
  }
}

export default DropdownListItem;
