import React, { PropTypes } from 'react';
import DropdownListItem from './DropdownListItem';
import styles from './DropdownList.styl';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

const DropdownList = ({ data, itemHoverHandler, dropdownReference }) =>
  <div className={cx('dropdownList')}>
    { data.title ? <h4 className={cx('section-title')}>{data.title}</h4> : null }
    <ul>
      {data.items.map(item =>
        <DropdownListItem
          key={item.id}
          item={item}
          dropdownReference={dropdownReference}
          itemHoverHandler={itemHoverHandler}
        />
      )}
    </ul>
  </div>;

DropdownList.propTypes = {
  data: PropTypes.object,
  itemHoverHandler: PropTypes.func,
  dropdownReference: PropTypes.object
};

export default DropdownList;
