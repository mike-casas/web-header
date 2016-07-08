import React, { Component, PropTypes } from 'react';
import DropdownList from '../DropdownList';
import DropdownHighlight from '../DropdownHighlight';
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

    // Set highlight object to default highlight of the dropdown
    const highlightComponent = this.props.data.childrens.find((component) => {
      if (component.default) return true;
      return false;
    });
    if (!highlightComponent) return;
    this.state = { highlight: highlightComponent.default };
  }

  itemHoverHandler(highlight) {
    if (!highlight) return;
    this.setState({ highlight });
  }

  render() {
    return (
      <div className={cx('dropdown', 'headerItemDropdown', this.props.data.dropdownClass)}>
        {this.props.data.childrens.map((component) => {
          switch (component.componentType) {
            case 'list':
              return (
                <DropdownList
                  key={component.key}
                  data={component}
                  parentClass={this.props.data.dropdownClass}
                  itemHoverHandler={this.itemHoverHandler}
                />
              );
            case 'highlight':
              return (
                <DropdownHighlight
                  key={component.key}
                  data={this.state.highlight}
                  parentClass={this.props.data.dropdownClass}
                />
              );
            default:
              return null;
          }
        })}
      </div>
    );
  }
}

export default Dropdown;
