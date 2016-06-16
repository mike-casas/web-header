import React, { Component, PropTypes } from 'react';
import DropdownList from './DropdownList';
import DropdownHighlight from './DropdownHighlight';
import styles from './Dropdown.styl';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

class Dropdown extends Component {

  static propTypes = {
    data: PropTypes.object
  };

  static defaultProps = {
    data: {}
  };

  constructor(props) {
    super(props);

    this.itemHoverHandler = this.itemHoverHandler.bind(this);
  }

  // state = {
    // Return first highlight of list of items
    // highlight: (() => {
    //   for (let i = 0; i < this.props.data.childrens.length; i++) {
    //     if (this.props.data.childrens[i].highlight) {
    //       return this.props.data.childrens[i].highlight;
    //     }
    //   }
    // })()
  // };

  itemHoverHandler() {
    console.log(this);
    // if (!highlight) return;
    //
    // this.setState({ highlight });
  }

  render() {
    return (
      <div className={cx('dropdown', 'headerItemDropdown', this.props.data.dropdownClass)}>
        {
          this.props.data.childrens.map((component) => {
            switch (component.componentType) {
              case 'list':
                return (
                  <DropdownList
                    key={component.key}
                    data={component}
                    parentClass={this.props.data.dropdownClass}
                    itemHoverHandler={this.itemHoverHandler.bind(this)}
                  />
                );
              case 'highlight':
                return (
                  <DropdownHighlight
                    key={component.key}
                    data={component}
                    parentClass={this.props.data.dropdownClass}
                  />
                );
              default:
                return null;
            }
          })
        }
      </div>
    );
  }
}

export default Dropdown;
