import React, { PropTypes } from 'react';
import WebHeaderDropdown from './WebHeaderDropdown';

const WebHeaderItem = ({ className, item }) =>
  <li className={className}>
    <a href={item.href} className="navbar-item-link">
      {item.name}
      {item.childrens ? <i className="toggle-icon icon-budicon-460"></i> : null}
    </a>
    { item.childrens ? <WebHeaderDropdown hasHighlight={item.hasHighlight} data={item.childrens} /> : null}
  </li>;

WebHeaderItem.propTypes = {
  className: PropTypes.string,
  item: PropTypes.object
};

export default WebHeaderItem;
