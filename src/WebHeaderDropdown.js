import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import WebHeaderDropdownList from './WebHeaderDropdownList';
import WebHeaderDropdownHighlight from './WebHeaderDropdownHighlight';

class WebHeaderDropdown extends Component {

  static propTypes = {
    hasHighlight: PropTypes.bool,
    data: PropTypes.array
  };

  constructor(props){
    super(props);
  }

  handleDropdownItemHover(data){
    console.log(data);
  }

  render(){
    return (
      <div className={cx('navbar-dropdown', {
          'with-highlight': this.props.hasHighlight
        })}>
        <WebHeaderDropdownList data={this.props.data} handleHover={this.props.handleDropdownItemHover} />
        { this.props.hasHighlight ? <WebHeaderDropdownHighlight /> : null }
      </div>
    );
  }

};

export default WebHeaderDropdown;
