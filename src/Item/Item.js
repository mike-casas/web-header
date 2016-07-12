import React, { PropTypes } from 'react';
import Dropdown from '../Dropdown';
import styles from './Item.styl';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const Item = ({ item, theme, simpleList, closeHeaderDropdown, mobile }) => {
  const linkClass = cx({
    link: !item.childrens,
    dropdownLink: item.childrens
  });
  const linkContent = <ItemContent name={item.name} childrens={item.childrens} theme={theme} />;
  const linkHref = (mobile ? item.mobileHref : null) || item.href;

  return (
    <li
      className={cx('item', [`item-${item.id}`], [`theme-${theme}`], {
        positionRelative: simpleList
      })}
    >
      {linkHref
        ? <a href={linkHref} onClick={closeHeaderDropdown} className={linkClass}>{linkContent}</a>
        : <span tabIndex="0" className={linkClass}>{linkContent}</span>
      }
      {item.childrens
        ? <Dropdown data={item} closeHeaderDropdown={closeHeaderDropdown} />
        : null
      }
    </li>
  );
};

Item.propTypes = {
  className: PropTypes.string,
  item: PropTypes.object,
  theme: PropTypes.string,
  simpleList: PropTypes.bool,
  closeHeaderDropdown: PropTypes.func,
  mobile: PropTypes.bool
};

export default Item;

const ItemContent = ({ name, childrens, theme }) =>
  <span>
    <span className={cx('text')}>{name}</span>
    <span className={cx('dropdownCaret')}></span>
    {childrens ?
      <svg
        width="10"
        height="6"
        viewBox="62 7 10 6"
        className={cx('caret')}
      >
        <path
          // eslint-disable-next-line max-len
          d="M71.884 7.698l-4.56 5.116c-.013.022-.008.05-.026.07-.083.084-.192.12-.3.116-.106.004-.214-.033-.295-.117-.02-.02-.014-.047-.028-.068L62.115 7.7c-.154-.16-.154-.42 0-.58.156-.16.408-.16.563 0L67 11.97l4.322-4.85c.155-.16.406-.16.56 0 .157.16.157.418.002.578z"
          fill={theme === 'dark' ? '#fff' : '#000'}
        />
      </svg>
      : null
    }
  </span>;

ItemContent.propTypes = {
  name: PropTypes.string,
  childrens: PropTypes.array,
  theme: PropTypes.string
};
