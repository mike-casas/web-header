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
    loginButtonText: 'Login',
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
    this.moreDropdownHandler = ::this.moreDropdownHandler;
    this.handleDocumentClick = ::this.handleDocumentClick;
  }

  state = {
    navbarDropdownIsOpen: false,
    moreDropdownIsOpen: false
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
    if (!findDOMNode(this.refs.menuItemsDropdown).contains(event.target)) {
      this.setState({ moreDropdownIsOpen: false });
    }
  }

  navbarDropdownHandler() {
    this.setState({ navbarDropdownIsOpen: !this.state.navbarDropdownIsOpen });
  }

  moreDropdownHandler() {
    this.setState({ moreDropdownIsOpen: !this.state.moreDropdownIsOpen });
  }

  isDefaultLoginText() {
    return this.props.loginButtonText === WebHeader.defaultProps.loginButtonText;
  }

  render() {
    return (
      <header className={cx('site-header')}>
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
              <ul className={cx('navigation-left')}>
                {items.map(item =>
                  <Item
                    key={item.position + item.id}
                    item={item}
                  />
                )}
              </ul>
              <ul className={cx('navigation-right')}>
                <a href="#" className="btn" >Talk to sales</a>
                <button>Log in</button>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    );
  }
}

export default WebHeader;
