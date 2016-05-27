import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import cx from 'classnames';
import menuItems from './menu-items.json';

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

    this.navbarDropdownButtonID = 'web-header-navbar-button';
    this.navbarDropdownGroupID = 'web-header-navbar-group';
    this.moreDropdownButtonID = 'web-header-more-button';
    this.moreDropdownGroupID = 'web-header-more-group';

    this.navbarDropdownHandler = ::this.navbarDropdownHandler;
    this.moreDropdownHandler = ::this.moreDropdownHandler;
    this.handleResize = ::this.handleResize;
    this.handleDocumentClick = ::this.handleDocumentClick;
  }

  // Set default dropdowns states for mobile (mobile-first)
  state = {
    navbarDropdownActive: true,
    navbarDropdownIsOpen: false,
    moreDropdownActive: false,
    moreDropdownIsOpen: false
  };

  componentDidMount() {
    this.handleResize();
    window.addEventListener('resize', this.handleResize);

    document.addEventListener('click', this.handleDocumentClick);
    document.addEventListener('touchend', this.handleDocumentClick);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
    document.removeEventListener('click', this.handleDocumentClick);
    document.removeEventListener('touchend', this.handleDocumentClick);
  }

  getTabindex(dropdown) {
    if (dropdown === 'navbar') {
      return this.state.navbarDropdownIsOpen ? '0' : '-1';
    }

    return this.state.moreDropdownIsOpen ? '0' : '-1';
  }

  handleResize() {
    if (window.innerWidth > 992) {
      this.setState({ navbarDropdownActive: false, moreDropdownActive: true });
    } else {
      this.setState({ navbarDropdownActive: true, moreDropdownActive: false });
    }
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
                id={this.navbarDropdownButtonID}
                aria-hidden={!this.state.navbarDropdownActive}
                aria-haspopup={this.state.navbarDropdownActive ? true : null}
                aria-owns={this.state.navbarDropdownActive ? this.navbarDropdownGroupID : null}
                aria-controls={this.state.navbarDropdownActive ? this.navbarDropdownGroupID : null}
                aria-expanded={
                  this.state.navbarDropdownActive ? this.state.navbarDropdownIsOpen : null
                }
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
              id={this.navbarDropdownGroupID}
              // eslint-disable-next-line jsx-a11y/valid-aria-role
              role={this.state.navbarDropdownActive ? 'group' : null}
              aria-expanded={
                this.state.navbarDropdownActive
                  ? this.state.navbarDropdownIsOpen
                  : null
              }
              aria-labelledby={this.state.navbarDropdownActive ? this.navbarDropdownButtonID : null}
              className={cx('navbar-collapse', {
                collapse: !this.state.navbarDropdownIsOpen,
                in: this.state.navbarDropdownIsOpen
              })}
            >
              <ul className="no-basic nav navbar-nav navbar-left">
                {itemsLeft.map(item => (
                  <li className={`li-${item.id}`} key={item.position + item.id}>
                    <a
                      href={item.url}
                      tabIndex={this.state.navbarDropdownActive ? this.getTabindex('navbar') : null}
                    >{item.name}</a>
                  </li>
                ))}
                <li
                  className={cx('dropdown', { open: this.state.moreDropdownIsOpen })}
                  ref="menuItemsDropdown"
                >
                  <button
                    id={this.moreDropdownButtonID}
                    aria-hidden={!this.state.moreDropdownActive}
                    aria-haspopup={this.state.moreDropdownActive ? true : null}
                    aria-owns={this.state.moreDropdownActive ? this.moreDropdownGroupID : null}
                    aria-controls={this.state.moreDropdownActive ? this.moreDropdownGroupID : null}
                    aria-expanded={
                      this.state.moreDropdownActive ? this.state.moreDropdownIsOpen : null
                    }
                    className="btn-dro"
                    onClick={this.moreDropdownHandler}
                  >
                    More<i className="icon-budicon-460" />
                  </button>
                  <ul
                    id={this.moreDropdownGroupID}
                    // eslint-disable-next-line jsx-a11y/valid-aria-role
                    role={this.state.moreDropdownActive ? 'group' : null}
                    aria-expanded={
                      this.state.moreDropdownActive
                        ? this.state.moreDropdownIsOpen
                        : null
                    }
                    aria-labelledby={
                      this.state.moreDropdownActive ? this.moreDropdownButtonID : null
                    }
                    className="dropdown-menu"
                  >
                    {itemsLeftDropdownTop.map(item => (
                      <li className={`li-${item.id}`} key={item.position + item.id}>
                        <a
                          href={item.url}
                          tabIndex={this.state.moreDropdownActive ? this.getTabindex('more') : null}
                        >{item.name}</a>
                      </li>
                    ))}
                    <li role="separator" className="divider" />
                    {itemsLeftDropdownBottom.map(item => (
                      <li className={`li-${item.id}`} key={item.position + item.id}>
                        <a
                          href={item.url}
                          tabIndex={this.state.moreDropdownActive ? this.getTabindex('more') : null}
                        >{item.name}</a>
                      </li>
                    ))}
                  </ul>
                </li>
              </ul>
              <ul className="nav navbar-nav navbar-right">
                {itemsRight.map(item => (
                  <li className={`li-${item.id} no-basic`} key={item.position + item.id}>
                    <a
                      href={item.url}
                      tabIndex={this.state.navbarDropdownActive ? this.getTabindex('navbar') : null}
                    >{item.name}</a>
                  </li>
                ))}
                <li>
                  <a
                    className="signin-button login"
                    href={this.isDefaultLoginText() ? '#' : 'https://manage.auth0.com'}
                    onClick={this.props.loginButtonOnClick}
                    tabIndex={this.state.navbarDropdownActive ? this.getTabindex('navbar') : null}
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
