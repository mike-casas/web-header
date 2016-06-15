import React, { PropTypes } from 'react';
import Dropdown from './Dropdown';
import styles from './Item.styl';
import classNames from 'classnames/bind';
// import arrowIcon from './img/arrow-down.svg';
const cx = classNames.bind(styles);

const Item = ({ item }) =>
  <li className={cx('item')}>
    <a href={item.href} className={cx({
      link: !item.childrens,
      dropdownLink: item.childrens })}
    >
      {item.name}
      {item.childrens ?
        <svg
          width="10px"
          height="6px"
          viewBox="62 7 10 6"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          className={cx('caret')}
        >
            <defs></defs>
            <path
              d="M71.8838809,7.69780397 L67.3254253,12.8143177 C67.3112491,12.8357787 67.316044,12.8638926 67.2976984,12.8829929 C67.2153519,12.9679784 67.1063209,13.0046767 66.9985407,12.999526 C66.8918028,13.0038182 66.7842311,12.9666907 66.70251,12.8827783 C66.6843729,12.8638926 66.6893762,12.8362079 66.6754086,12.8153908 L62.1163276,7.69866241 C61.9612241,7.53877806 61.9612241,7.28017318 62.1163276,7.12028883 C62.271431,6.9608337 62.5226401,6.9608337 62.677952,7.12028883 L66.999583,11.9711156 L71.3218395,7.12007422 C71.4769429,6.95997526 71.7283605,6.95997526 71.8834639,7.12007422 C72.0387758,7.27931474 72.0387758,7.53813423 71.8838809,7.69780397 L71.8838809,7.69780397 Z"
              id="Shape"
              stroke="none"
              fill="#000000"
              fillRule="evenodd"
            >
            </path>
        </svg>
        : null}
    </a>
    { item.childrens ?
      <Dropdown
        data={item.childrens}
        hasHighlight={item.hasHighlight}
        hasArrows={item.hasArrows}
      />
      : null }
  </li>;

Item.propTypes = {
  className: PropTypes.string,
  item: PropTypes.object
};

export default Item;
