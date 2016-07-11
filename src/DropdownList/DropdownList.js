import React, { PropTypes } from 'react';
import DropdownListItem from '../DropdownListItem';
import styles from './DropdownList.styl';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const DropdownList = ({ data, itemHoverHandler, parentClass, closeHeaderDropdown }) =>
  <div className={cx('dropdownList', { moreDropdownList: parentClass === 'moreDropdown' })}>
    {data.title
      ? <h4 className={cx('section-title')}>{data.title}</h4>
      : null
    }
    <ul>
      {data.items.map(item =>
        <DropdownListItem
          key={item.id}
          item={item}
          itemHoverHandler={itemHoverHandler}
          hasArrow={data.hasArrows}
          parentClass={parentClass}
          closeHeaderDropdown={closeHeaderDropdown}
        />
      )}
    </ul>
  </div>;

DropdownList.propTypes = {
  data: PropTypes.object,
  itemHoverHandler: PropTypes.func,
  dropdownReference: PropTypes.object,
  parentClass: PropTypes.string,
  closeHeaderDropdown: PropTypes.func
};

export default DropdownList;
