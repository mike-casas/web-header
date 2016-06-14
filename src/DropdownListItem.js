import React, { PropTypes } from 'react';
import styles from './DropdownListItem.styl';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);


class DropdownListItem extends React.Component {
  static propTypes = {
    item: PropTypes.object,
    itemHoverHandler: PropTypes.func,
    dropdownReference: PropTypes.object
  };

  // constructor() {
  //   super();
  //   debugger;
  //   this.itemHoverHandler = this.itemHoverHandler.bind(
  //     this.props.dropdownReference,
  //     this.props.item.highlight);
  // }

  render() {
    return (
      <li
        className={cx('item')}
        onMouseEnter={this.itemHoverHandler}
      >
      <a href={this.props.item.href}>{this.props.item.name}</a>
      </li>
    );
  }
}

export default DropdownListItem;
