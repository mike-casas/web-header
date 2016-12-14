import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';
import styles from './Section.styl';

const cx = classNames.bind(styles);

const Section = ({ children, title, dark }) => (
  <div>
    <h2 className="container text-center">{title}</h2>
    <div
      className={cx('section', { dark })}
    >
      <div>{children}</div>
    </div>
  </div>
);

Section.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  dark: PropTypes.bool
};

export default Section;
