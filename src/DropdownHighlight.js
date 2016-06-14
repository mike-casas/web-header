import React, { PropTypes } from 'react';
import styles from './DropdownHighlight.styl';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

const DropdownHighlight = ({ data }) =>
  <div className={cx('highlight')}>
    <h4 className="highlight-section-title">Latest on blog</h4>
    <div className="highlight-content">
      <img src={data.imageUrl} alt="" />
      <h5 className="highlight-title">{data.title}</h5>
      <p className="highlight-text">{data.description}</p>
      <div className="highlight-footer">
        <div className="highlight-avatar">
          <img src={data.userAvatar} alt={data.userName} />
          <span>{data.userName}</span>
        </div>
        <div className="highlight-date">{data.date}</div>
      </div>
    </div>
  </div>
  ;

DropdownHighlight.propTypes = {
  data: PropTypes.object
};

export default DropdownHighlight;
