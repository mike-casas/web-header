import React, { PropTypes } from 'react';
import DropdownListItem from './DropdownListItem';
import styles from './DropdownList.styl';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

const DropdownList = ({ data, itemHoverHandler, dropdownReference }) =>
  <ul className={cx('dropdownList')}>
    {data.map(item =>
      <DropdownListItem
        key={item.id}
        item={item}
        dropdownReference={dropdownReference}
        itemHoverHandler={itemHoverHandler}
      />
    )}
  </ul>
  ;

DropdownList.propTypes = {
  data: PropTypes.array,
  itemHoverHandler: PropTypes.func,
  dropdownReference: PropTypes.object
};

export default DropdownList;
