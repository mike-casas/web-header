import React, { PropTypes } from 'react';
import styles from './DropdownHighlight.styl';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

const DropdownHighlight = ({ data, parentClass }) =>
  <div className={cx({
    highlight: parentClass !== 'moreDropdown',
    moreHighlight: parentClass === 'moreDropdown'
  })}
  >
    { data.title ? <h4 className={cx('section-title')}>{data.title}</h4> : null }
    <div className={cx('content')}>
      <img src={data.default.imageUrl} alt="" />
      <h5 className={cx('title')}>{data.default.title}</h5>
      {data.default.description ?
        <p className={cx('text')}>{data.default.description}</p>
        : null }
      {data.default.time ?
        <span className={cx('time')}>{data.default.time}</span>
        : null }
      { (data.default.linkText && data.default.linkUrl) ?
        <a href={data.default.linkUrl} className={cx('link')}>{data.default.linkText}</a>
        : null }
    </div>
  </div>
  ;

DropdownHighlight.propTypes = {
  data: PropTypes.object,
  parentClass: PropTypes.string
};

export default DropdownHighlight;
