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
    promoteLink: PropTypes.object,
    theme: PropTypes.string,
    breakpoint: PropTypes.number
  };

  static defaultProps = {
    loginButtonText: 'Log in',
    loginButtonOnClick: () => {},
    promoteLink: {
      active: true,
      url: 'https://auth0.com/jobs',
      text: 'We\'re hiring!'
    },
    theme: 'light',
    breakpoint: 992
  };

  constructor(props) {
    super(props);

    this.navbarDropdownHandler = ::this.navbarDropdownHandler;
    this.handleDocumentClick = ::this.handleDocumentClick;
    this.handleResize = ::this.handleResize;
  }

  state = {
    navbarDropdownIsOpen: false,
    mobileState: true
  };

  componentDidMount() {
    this.handleResize();
    document.addEventListener('click', this.handleDocumentClick);
    document.addEventListener('touchend', this.handleDocumentClick);
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleDocumentClick);
    document.removeEventListener('touchend', this.handleDocumentClick);
    window.removeEventListener('resize', this.handleResize);
  }

  handleDocumentClick(event) {
    if (!findDOMNode(this.refs.menuDropdown).contains(event.target)) {
      this.setState({ navbarDropdownIsOpen: false });
    }
  }

  handleResize() {
    if (window.innerWidth < this.props.breakpoint) return this.setState({ mobileState: true });
    return this.setState({ mobileState: false });
  }

  navbarDropdownHandler() {
    this.setState({ navbarDropdownIsOpen: !this.state.navbarDropdownIsOpen });
  }

  isDefaultLoginText() {
    return this.props.loginButtonText === WebHeader.defaultProps.loginButtonText;
  }

  render() {
    return (
      <header className={cx('siteHeader', {
        dropdownOpen: this.state.navbarDropdownIsOpen,
        [`theme-${this.props.theme}`]: true
      })}
      >
        <nav>
          <div className="container">
            <Head
              toggleDropdownHandler = {this.navbarDropdownHandler}
              promoteLink = {this.props.promoteLink}
              dropdownOpen = {this.state.navbarDropdownIsOpen}
              theme = {this.props.theme}
            />
            <div
              className={cx('collapse', {
                dropdownOpen: this.state.navbarDropdownIsOpen,
                in: this.state.navbarDropdownIsOpen
              })}
            >
              <ul className={cx('navigationLeft')}>
                {items.map(item =>
                  <Item
                    key={item.position + item.id}
                    item={item}
                    theme={this.props.theme}
                    simpleList={item.simpleList}
                  />
                )}
              </ul>
              <ul className={ `
                  ${cx('navigationRight')}
                  ${this.props.theme === 'dark' && !this.state.mobileState ? 'theme-dark' : ''}
                `}
              >
                <a href="#" className="btn btn-transparent btn-sm"> Talk to sales </a>
                <button className="btn btn-success btn-sm">Log in</button>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    );
  }
}

export default WebHeader;
