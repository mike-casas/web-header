import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import DropdownList from '../DropdownList';
import DropdownHighlight from '../DropdownHighlight';
import FooterList from '../FooterList';
import styles from './Dropdown.styl';

const cx = classNames.bind(styles);

class Dropdown extends Component {
  static propTypes = {
    data: PropTypes.object,
    closeDropdowns: PropTypes.func,
    open: PropTypes.bool,
    loading: PropTypes.bool.isRequired
  };

  static defaultProps = {
    data: {}
  };

  state = {
    highlight: {}
  };

  componentWillMount() {
    this.setDefaultHighlight();
  }

  componentWillReceiveProps() {
    this.setDefaultHighlight();
  }

  setDefaultHighlight = () => {
    const { data } = this.props;
    // Set highlight object to default highlight of the dropdown
    const highlightComponent = data.childrens.filter(component => !!component.default);

    if (!highlightComponent.length) return;

    this.setState({ highlight: highlightComponent[0].default });
  };

  highlightHandler = highlight => {
    if (!highlight) return;
    this.setState({ highlight });
  };

  render() {
    const { data, closeDropdowns, open, loading } = this.props;

    return (
      <div
        className={cx('dropdown', data.dropdownClass, {
          'is-open': open,
          twoBlock: data.twoBlockLayout
        })}
        aria-hidden={open ? 'false' : 'true'}
      >
        {data.childrens.map(component => {
          switch (component.componentType) {
            case 'list':
              return (
                <DropdownList
                  key={component.key}
                  data={component}
                  parentClass={data.dropdownClass}
                  highlightHandler={this.highlightHandler}
                  closeDropdowns={closeDropdowns}
                  loading={loading}
                />
              );
            case 'highlight':
              return (
                <DropdownHighlight
                  key={component.key}
                  data={this.state.highlight}
                  parentClass={data.dropdownClass}
                  closeDropdowns={closeDropdowns}
                  loading={loading}
                />
              );
            default:
              return null;
          }
        })}

        {data.footerLinks ? (
          <footer className={cx('footer-list', { 'footer-highlight': data.footerHighlight })}>
            {data.footerLinks.map(footer => (
              <FooterList
                key={footer.id}
                footer={footer}
                closeDropdowns={closeDropdowns}
                loading={loading}
              />
            ))}
          </footer>
        ) : null}
      </div>
    );
  }
}

export default Dropdown;
