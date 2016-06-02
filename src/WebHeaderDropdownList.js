import React, { PropTypes } from 'react';

const WebHeaderDropdownList = ({ data, handleHover }) =>
  <ul className="navbar-dropdown-list">
    {data.map( item =>
      <li className="navbar-dropdown-item" key={item.id} onMouseEnter={handleHover}>
        <a href={item.href}>{item.name}</a>
      </li>
    )}
  </ul>
  ;

export default WebHeaderDropdownList;
