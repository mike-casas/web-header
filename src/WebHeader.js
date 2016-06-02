import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import cx from 'classnames';
import WebHeaderItem from './WebHeaderItem';
import menuItems from './menu-items.json';

// Lists of links by their position on the header
const itemsLeft = menuItems.filter(item => (item.position === undefined || item.position === 'left') && (item.active === undefined || item.active === true));
const itemsRight = menuItems.filter(item => item.position === 'right' && (item.active === undefined || item.active === true));


class WebHeader extends Component {
  static propTypes = {
    loginButtonText: PropTypes.string,
    loginButtonOnClick: PropTypes.func,
    promoteLink: PropTypes.bool,
    promoteLinkURL: PropTypes.string,
    promoteLinkText: PropTypes.string
  };

  static defaultProps = {
    loginButtonText: 'Login',
    loginButtonOnClick: () => {},
    promoteLink: true,
    promoteLinkURL: 'https://auth0.com/jobs',
    promoteLinkText: 'We\'re hiring!'
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
      <header className="site-header">
        <nav className="navbar navbar-default">
          <div className="container">
            <div className="navbar-header" ref="menuDropdown">
              <button
                type="button"
                className="navbar-toggle collapsed"
                onClick={this.navbarDropdownHandler}
              >
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar" />
                <span className="icon-bar" />
                <span className="icon-bar" />
              </button>
              <h1 className="navbar-brand">
                <a href="/" rel="home" className="logo">
                  <span>Auth0</span>
                </a>
                {
                  this.props.promoteLink
                  ?
                  <a
                    href={this.props.promoteLinkURL}
                    className="hiring animated bounce"
                    >{this.props.promoteLinkText}</a>
                  : null
                }
              </h1>
            </div>
            <div
              className={cx('navbar-collapse', {
                // collapse: !this.state.navbarDropdownIsOpen,
                in: this.state.navbarDropdownIsOpen
              })}
            >
              <ul className="no-basic nav navbar-nav navbar-left">
                {itemsLeft.map(item =>
                  <WebHeaderItem
                    className={`li-${item.id} navbar-item`}
                    key={item.position + item.id}
                    item={item}
                  />
                )}
              </ul>
              <ul className="nav navbar-nav navbar-right">
                {itemsRight.map(item =>
                  <WebHeaderItem
                    className={`li-${item.id} navbar-item`}
                    key={item.position + item.id}
                    item={item}
                  />
                )}
              </ul>
            </div>
          </div>
        </nav>
      </header>
    );
  }
}

export default WebHeader;
