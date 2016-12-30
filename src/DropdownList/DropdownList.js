import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';
import DropdownListItem from '../DropdownListItem';
import styles from './DropdownList.styl';

const cx = styles::classNames;

const DropdownList = ({ data, highlightHandler, parentClass, closeDropdowns }) =>
  <div
    className={cx('dropdownList', {
      moreDropdownList: parentClass === 'moreDropdown',
      stackedList: data.stackedList,
      twoColList: data.twoColLayout
    })}
  >
    {data.title
      ? <h4 className={cx('section-title')}>{data.title}</h4>
      : null
    }
    <ul role="menubar" aria-hidden="false">
      {data.items.map(item =>
        <DropdownListItem
          key={item.id}
          item={item}
          highlightHandler={highlightHandler}
          hasArrow={data.hasArrows}
          parentClass={parentClass}
          closeDropdowns={closeDropdowns}
        />
      )}
    </ul>
  </div>;

DropdownList.propTypes = {
  data: PropTypes.object,
  highlightHandler: PropTypes.func,
  parentClass: PropTypes.string,
  closeDropdowns: PropTypes.func
};

export default DropdownList;
