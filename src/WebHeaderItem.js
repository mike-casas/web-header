import React, { PropTypes } from 'react';

const WebHeaderItem = ({ className, href, text }) =>
  <li className={className}>
    <a href={href}>{text}</a>
  </li>;

WebHeaderItem.propTypes = {
  className: PropTypes.string,
  href: PropTypes.string,
  text: PropTypes.string
};

export default WebHeaderItem;
