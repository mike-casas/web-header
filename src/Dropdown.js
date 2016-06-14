import React, { Component, PropTypes } from 'react';
import DropdownList from './DropdownList';
import DropdownHighlight from './DropdownHighlight';
import styles from './Dropdown.styl';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

class Dropdown extends Component {

  static propTypes = {
    hasHighlight: PropTypes.bool,
    data: PropTypes.array
  };

  static defaultProps = {
    hasHighlight: false,
    data: []
  };

  state = {
    // Return first highlight of list of items
    highlight: (() => {
      for (let i = 0; i < this.props.data.length; i++) {
        if (this.props.data[i].highlight) {
          return this.props.data[i].highlight;
        }
      }
    })()
  };

  itemHoverHandler(highlight) {
    // if (!highlight) return;
    //
    // this.setState({ highlight });
    console.log("test");
  }

  render() {
    return (
      <div className={cx('dropdown', 'headerItemDropdown', {
        withHighlight: this.props.hasHighlight
      })}
      >
        <DropdownList
          data={this.props.data}
          dropdownReference={this}
          itemHoverHandler={this.itemHoverHandler}
        />
        { this.props.hasHighlight ?
          <DropdownHighlight data={this.state.highlight} />
          :
          null }
      </div>
    );
  }
}

export default Dropdown;
