import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import cx from 'classnames';
import WebHeaderItem from './WebHeaderItem';
import menuItems from './menu-items.json';

// Lists of links by their position on the header
const itemsLeft = menuItems.filter(item => item.position === 'navbar-left' && item.active);
const itemsRight = menuItems.filter(item => item.position === 'navbar-right' && item.active);
const itemsLeftDropdownTop = menuItems
.filter(item => item.position === 'navbar-left-dropdown-top' && item.active);
const itemsLeftDropdownBottom = menuItems
  .filter(item => item.position === 'navbar-left-dropdown-bottom' && item.active);

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
                <a href="/" rel="home">
                  <span>Auth0</span>
                </a>
              </h1>
              {
                this.props.promoteLink
                  ?
                    <a
                      href={this.props.promoteLinkURL}
                      className="no-basic hiring animated bounce hidden-sm hidden-xs hidden-md"
                    >{this.props.promoteLinkText}</a>
                  : null
              }
            </div>
            <div
              className={cx('navbar-collapse', {
                collapse: !this.state.navbarDropdownIsOpen,
                in: this.state.navbarDropdownIsOpen
              })}
            >
              <ul className="no-basic nav navbar-nav navbar-left">
                {itemsLeft.map(item =>
                  <WebHeaderItem
                    className={`li-${item.id}`}
                    key={item.position + item.id}
                    href={item.url}
                    text={item.name}
                  />
                )}
                <li
                  className={cx('dropdown', { open: this.state.moreDropdownIsOpen })}
                  ref="menuItemsDropdown"
                >
                  <button
                    className="btn-dro"
                    onClick={this.moreDropdownHandler}
                  >
                    More<i className="icon-budicon-460" />
                  </button>
                  <ul className="dropdown-menu">
                    {itemsLeftDropdownTop.map(item =>
                      <WebHeaderItem
                        className={`li-${item.id}`}
                        key={item.position + item.id}
                        href={item.url}
                        text={item.name}
                      />
                    )}
                    <li role="separator" className="divider" />
                    {itemsLeftDropdownBottom.map(item =>
                      <WebHeaderItem
                        className={`li-${item.id}`}
                        key={item.position + item.id}
                        href={item.url}
                        text={item.name}
                      />
                    )}
                  </ul>
                </li>
              </ul>
              <ul className="nav navbar-nav navbar-right">
                {itemsRight.map(item =>
                  <WebHeaderItem
                    className={`li-${item.id} no-basic`}
                    key={item.position + item.id}
                    href={item.url}
                    text={item.name}
                  />
                )}
                <li>
                  <a
                    className="signin-button login"
                    href={this.isDefaultLoginText() ? '#' : 'https://manage.auth0.com'}
                    onClick={this.props.loginButtonOnClick}
                  >
                    {this.props.loginButtonText}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    );
  }
}

export default WebHeader;
