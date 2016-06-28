import React, { Component, PropTypes } from 'react';
import Head from './Head';
import Item from './Item';
import menuItems from './menu-items.json';
import styles from './WebHeader.styl';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

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
    this.handleResize = ::this.handleResize;
  }

  state = {
    navbarDropdownIsOpen: false,
    mobileState: true
  };

  componentDidMount() {
    this.handleResize();
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
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
      <header
        className={cx('siteHeader', [`theme-${this.props.theme}`], {
          dropdownOpen: this.state.navbarDropdownIsOpen
        })}
      >
        <nav>
          <div className="container">
            <Head
              toggleDropdownHandler={this.navbarDropdownHandler}
              promoteLink={this.props.promoteLink}
              dropdownOpen={this.state.navbarDropdownIsOpen}
              theme={this.props.theme}
            />
            <div
              className={cx('collapse', {
                dropdownOpen: this.state.navbarDropdownIsOpen,
                in: this.state.navbarDropdownIsOpen
              })}
            >
              <ul className={cx('navigationLeft')}>
                {menuItems.map(item =>
                  <Item
                    key={item.position + item.id}
                    item={item}
                    theme={this.props.theme}
                    simpleList={item.simpleList}
                  />
                )}
              </ul>
              <ul
                className={cx('navigationRight', {
                  'theme-dark': this.props.theme === 'dark' && !this.state.mobileState
                })}
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
