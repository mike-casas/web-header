import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import WebHeaderDropdownList from './WebHeaderDropdownList';
import WebHeaderDropdownHighlight from './WebHeaderDropdownHighlight';

class WebHeaderDropdown extends Component {

  static propTypes = {
    hasHighlight: PropTypes.bool,
    data: PropTypes.array
  };

  static defaultProps = {
    hasHighlight: false,
    data: []
  };

  constructor(props){
    super(props);

  };

  state = {
    highlight: {} // Should be the first element highlight or general highlight
  };

  itemHoverHandler(highlight){
    if(!highlight) return;

    this.setState({
      highlight: highlight
    });
  };

  render(){
    return (
      <div className={cx('navbar-dropdown', {
          'with-highlight': this.props.hasHighlight
        })}>
        <WebHeaderDropdownList data={this.props.data} parentReference={this} itemHoverHandler={this.itemHoverHandler}/>
        { this.props.hasHighlight ? <WebHeaderDropdownHighlight data={this.state.highlight}/> : null }
      </div>
    );
  }

};

export default WebHeaderDropdown;
