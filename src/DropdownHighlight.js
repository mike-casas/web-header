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
    { data.componentTitle ? <h4 className={cx('section-title')}>{data.componentTitle}</h4> : null }
    <div className={cx('content')}>
      <img src={data.imageUrl} alt="" />
      <h5 className={cx('title')}>{data.title}</h5>
      {data.description ?
        <p className={cx('text')}>{data.description}</p>
        : null }
      {data.time ?
        <span className={cx('time')}>{data.time}</span>
        : null }
      { (data.linkText && data.linkUrl) ?
        <a href={data.linkUrl} className={cx('link')}>{data.linkText}</a>
        : null }
    </div>
  </div>
  ;

DropdownHighlight.propTypes = {
  data: PropTypes.object,
  parentClass: PropTypes.string
};

export default DropdownHighlight;
