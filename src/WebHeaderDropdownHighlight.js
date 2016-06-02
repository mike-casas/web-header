import React, { PropTypes } from 'react';

const WebHeaderDropdownHighlight = ({ }) =>
  <div className="navbar-dropdown-highlight">
    <h4 className="highlight-section-title">Latest on blog</h4>
    <div className="highlight-content">
      <img src="http://lorempixel.com/400/400/" alt=""/>
      <h5 className="highlight-title">Powering User Analytics With Identity</h5>
      <p className="highlight-text">
        Learn how Auth0 helps with your decision-making process, and makes it
        easy to gather data about your.
      </p>
      <div className="highlight-footer">
        <div className="highlight-avatar">Sebastián Peyrott</div>
        <div className="highlight-date">February 08, 2016</div>
      </div>
    </div>
  </div>
  ;

WebHeaderDropdownHighlight.propTypes = {

};

export default WebHeaderDropdownHighlight;
