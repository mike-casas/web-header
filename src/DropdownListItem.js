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

  render() {
    return (
      <li
        className={cx('item')}
        onMouseEnter={this.itemHoverHandler}
      >
      <a href={this.props.item.href}>
      <svg
        width="17px"
        height="18px"
        viewBox="0 1 17 18"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
          <defs></defs>
          <path d="M13.330927,15.5485 L11.4463875,9.99164286 L16.3794073,6.55825 L10.2816638,6.55825 L8.39690068,1.00160714 L8.39634147,1.00010714 L14.4950915,1.00010714 L16.3801902,6.55771429 L16.3801902,6.55760714 L16.3817559,6.55675 C17.4766902,9.78089286 16.3490981,13.4479643 13.330927,15.5485 L13.330927,15.5485 L13.330927,15.5485 Z M3.46265068,15.5485 L3.46108489,15.5495714 L8.39544674,18.9838214 L13.330927,15.5486071 L8.39701253,12.11425 L3.46265068,15.5485 L3.46265068,15.5485 L3.46265068,15.5485 Z M0.412828316,6.55685714 L0.412828316,6.55685714 C-0.739592737,9.95553571 0.598150684,13.5568214 3.46164411,15.5491429 L3.46209147,15.5474286 L5.34685463,9.99089286 L0.414841474,6.55814286 L6.51113095,6.55814286 L8.39600595,1.0015 L8.39645332,1 L2.29736779,1 L0.412828316,6.55685714 L0.412828316,6.55685714 L0.412828316,6.55685714 Z"
            id="Shape"
            stroke="none"
            fill="#D9D9D9"
            fill-rule="evenodd"
          >
          </path>
      </svg>
        {this.props.item.name}
      </a>
      </li>
    );
  }
}

export default DropdownListItem;
