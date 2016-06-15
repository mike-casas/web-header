import React, { PropTypes } from 'react';
import styles from './DropdownHighlight.styl';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

const DropdownHighlight = ({ data }) =>
  <div className={cx('highlight')}>
    <h4 className="section-title">Latest on blog</h4>
    <div className={cx('content')}>
      <img src={data.default.imageUrl} alt="" />
      <h5 className={cx('title')}>{data.default.title}</h5>
      <p className={cx('text')}>{data.default.description}</p>
      <a href="#" className={cx('link')}>See more case studies</a>
    </div>
  </div>
  ;

DropdownHighlight.propTypes = {
  data: PropTypes.object
};

export default DropdownHighlight;
