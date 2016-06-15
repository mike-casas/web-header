import React, { PropTypes } from 'react';
import styles from './DropdownHighlight.styl';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

const DropdownHighlight = ({ data }) =>
  <div className={cx('highlight')}>
    <h4 className="section-title">Latest on blog</h4>
    <div className={cx('content')}>
      <img src={data.imageUrl} alt="" />
      <h5 className={cx('title')}>{data.title}</h5>
      <p className={cx('text')}>{data.description}</p>
      <a href="#" className={cx('link')}>See more case studies</a>
    </div>
  </div>
  ;

DropdownHighlight.propTypes = {
  data: PropTypes.object
};

export default DropdownHighlight;
