import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import Head from './Head';
import Item from './Item';
import menuItems from './menu-items.json';
import styles from './WebHeader.styl';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);
const items = menuItems.filter(item => item.active === undefined || item.active === true);


class WebHeader extends Component {
  static propTypes = {
    loginButtonText: PropTypes.string,
    loginButtonOnClick: PropTypes.func,
    promoteLink: PropTypes.object
  };

  static defaultProps = {
    loginButtonText: 'Log in',
    loginButtonOnClick: () => {},
    promoteLink: {
      active: true,
      url: 'https://auth0.com/jobs',
      text: 'We\'re hiring!'
    }
  };

  constructor(props) {
    super(props);

    this.navbarDropdownHandler = ::this.navbarDropdownHandler;
    this.handleDocumentClick = ::this.handleDocumentClick;
  }

  state = {
    navbarDropdownIsOpen: false
  };

  componentDidMount() {
    document.addEventListener('click', this.handleDocumentClick);
    document.addEventListener('touchend', this.handleDocumentClick);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleDocumentClick);
    document.removeEventListener('touchend', this.handleDocumentClick);
  }

  handleDocumentClick(event) {
    if (!findDOMNode(this.refs.menuDropdown).contains(event.target)) {
      this.setState({ navbarDropdownIsOpen: false });
    }
  }

  navbarDropdownHandler() {
    this.setState({ navbarDropdownIsOpen: !this.state.navbarDropdownIsOpen });
  }

  isDefaultLoginText() {
    return this.props.loginButtonText === WebHeader.defaultProps.loginButtonText;
  }

  render() {
    return (
      <header className={cx('siteHeader')}>
        <nav className={cx('navbar')}>
          <div className={cx('container')}>
            <Head
              toggleDropdownHandler = {this.navbarDropdownHandler}
              promoteLink = {this.props.promoteLink}
            />
            <div
              className={cx('collapse', {
                // collapse: !this.state.navbarDropdownIsOpen,
                in: this.state.navbarDropdownIsOpen
              })}
            >
              <ul className={cx('navigationLeft')}>
                {items.map(item =>
                  <Item
                    key={item.position + item.id}
                    item={item}
                  />
                )}
              </ul>
              <ul className={cx('navigationRight')}>
                <a href="#" className={cx('btnTransparent')}>Talk to sales</a>
                <button className={cx('btnSuccess')}>Log in</button>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    );
  }
}

export default WebHeader;
