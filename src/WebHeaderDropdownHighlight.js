import React, { PropTypes } from 'react';

const WebHeaderDropdownHighlight = ({ data }) =>
  <div className="navbar-dropdown-highlight">
    <h4 className="highlight-section-title">Latest on blog</h4>
    <div className="highlight-content">
      <img src={data.imageUrl} alt=""/>
      <h5 className="highlight-title">{data.title}</h5>
      <p className="highlight-text">{data.description}</p>
      <div className="highlight-footer">
        <div className="highlight-avatar">
          <img src={data.userAvatar} alt={data.userName + " avatar"}/>
          <span>{data.userName}</span>
        </div>
        <div className="highlight-date">{data.date}</div>
      </div>
    </div>
  </div>
  ;

WebHeaderDropdownHighlight.propTypes = {

};

export default WebHeaderDropdownHighlight;
