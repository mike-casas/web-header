import React, { Component, PropTypes } from 'react';
import Head from '../Head';
import Item from '../Item';
import defaultMenuItems from '../data/menu-items.json';
import styles from './WebHeader.styl';
import classNames from 'classnames/bind';
import cxN from 'classnames';
import axios from 'axios';
import generateNewMenuItemsJson from '../modules/update';

const cx = styles::classNames;
const blogLastApi = 'https://auth0.com/blog/last.json';

class WebHeader extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    theme: PropTypes.oneOf(['light', 'gray', 'dark']),
    featuredEnable: PropTypes.bool,
    featuredLink: PropTypes.string,
    featuredText: PropTypes.string,
    primaryButtonEnable: PropTypes.bool,
    primaryButtonLink: PropTypes.string,
    primaryButtonOnClick: PropTypes.func,
    primaryButtonText: PropTypes.string,
    secondaryButtonEnable: PropTypes.bool,
    secondaryButtonLink: PropTypes.string,
    secondaryButtonOnClick: PropTypes.func,
    secondaryButtonText: PropTypes.string,
    breakpoint: PropTypes.number
  };

  static defaultProps = {
    className: '',
    children: null,
    theme: 'light',
    featuredEnable: true,
    featuredLink: 'https://auth0.com/e-books/jwt-handbook',
    featuredText: 'free jwt ebook!',
    primaryButtonEnable: true,
    primaryButtonLink: '',
    primaryButtonOnClick: () => {},
    primaryButtonText: 'Log in',
    secondaryButtonEnable: true,
    secondaryButtonLink: '?contact=true',
    secondaryButtonOnClick: () => {},
    secondaryButtonText: 'Talk to sales',
    breakpoint: 992
  };

  state = {
    navbarDropdownIsOpen: false,
    mobileState: true,
    menuItems: defaultMenuItems
  };

  componentDidMount() {
    this.handleResize();
    window.addEventListener('resize', this.handleResize);
    this.updateBlogPost();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  setHeightDropdown = () => {
    const height = this.state.mobileState ? `${window.innerHeight - 75}px` : '';
    this.refs.dropdownContent.style.height = height;
  }

  updateBlogPost = () => {
    axios.get(blogLastApi)
      .then(blogResponse => [this.state.menuItems, blogResponse.data])
      .then(generateNewMenuItemsJson)
      .then(newMenuItems => {
        this.setState({ menuItems: newMenuItems });
      })
      .catch(err => console.info('Auth0WebHeader', err));
  }

  handleResize = () => {
    const mobileState = window.innerWidth < this.props.breakpoint;
    this.setState({ mobileState }, () => {
      this.addOverflowBody();
      this.setHeightDropdown();
    });
  }

  navbarDropdownHandler = () => {
    this.setState({ navbarDropdownIsOpen: !this.state.navbarDropdownIsOpen }, this.addOverflowBody);
  }

  closeDropdownOnButtonClick = callback => event => {
    const isMobile = this.state.mobileState;
    const isDropdownOpen = this.state.navbarDropdownIsOpen;

    if (callback) callback(event);
    if (isMobile && isDropdownOpen) this.navbarDropdownHandler();
  }

  addOverflowBody() {
    const { navbarDropdownIsOpen, mobileState } = this.state;

    if (navbarDropdownIsOpen && mobileState) {
      document.body.classList.add(cx('overflow'));
    } else {
      document.body.classList.remove(cx('overflow'));
    }
  }

  handleKeyDown = e => {
    // Only enable focusable elements on key tab pressed
    if (e.keyCode !== 9 || this.state.focusable) return;
    this.setState({ focusable: true });
  }

  renderButton(link, onClick, text, className) {
    return !!link
      ? <a href={link} className={className} onClick={onClick}>{text}</a>
      : <button className={className} onClick={onClick}>{text}</button>;
  }

  render() {
    const {
      className,
      children,
      theme,
      featuredEnable,
      featuredLink,
      featuredText,
      primaryButtonEnable,
      primaryButtonLink,
      primaryButtonOnClick,
      primaryButtonText,
      secondaryButtonEnable,
      secondaryButtonLink,
      secondaryButtonOnClick,
      secondaryButtonText
    } = this.props;
    const { navbarDropdownIsOpen, mobileState, focusable, menuItems } = this.state;

    const primaryButton = this.renderButton(
      primaryButtonLink,
      this.closeDropdownOnButtonClick(primaryButtonOnClick),
      primaryButtonText,
      'btn btn-success btn-sm'
    );
    const secondaryButton = this.renderButton(
      secondaryButtonLink,
      this.closeDropdownOnButtonClick(secondaryButtonOnClick),
      secondaryButtonText,
      'btn btn-transparent btn-sm'
    );

    const renderedMenuItems = menuItems.map((item, i) =>
      <Item
        key={i + item.id}
        item={item}
        theme={theme}
        simpleList={item.simpleList}
        closeHeaderDropdown={this.closeDropdownOnButtonClick()}
        mobile={mobileState}
      />
    );

    return (
      <header
        className={cx('header', [`theme-${theme}`], className, {
          'is-dropdown-open': navbarDropdownIsOpen,
          focusable
        })}
        onKeyDown={this.handleKeyDown}
      >
        <div className={cx('menu', { 'is-dropdown-open': navbarDropdownIsOpen })}>
          <div className="container">
            <Head
              toggleDropdownHandler={this.navbarDropdownHandler}
              featured={featuredEnable}
              featuredLink={featuredLink}
              featuredText={featuredText}
              dropdownOpen={navbarDropdownIsOpen}
              theme={theme}
              closeHeaderDropdown={this.closeDropdownOnButtonClick()}
            />
            <nav
              className={cx('collapse', {
                'is-dropdown-open': navbarDropdownIsOpen
              })}
              ref="dropdownContent"
            >
              <ul className={cx('navigation')}>{!!children ? children : renderedMenuItems}</ul>
            </nav>
            <div
              className={cxN(cx('buttons-group', {
                'is-dropdown-open': navbarDropdownIsOpen
              }), {
                'theme-dark': theme === 'dark'
              })}
            >
              {secondaryButtonEnable ? secondaryButton : null}
              {primaryButtonEnable ? primaryButton : null}
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default WebHeader;
