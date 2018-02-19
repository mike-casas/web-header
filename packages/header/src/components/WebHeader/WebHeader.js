import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import cxN from 'classnames';
import axios from 'axios';
import Head from '../Head';
import FeaturedHead from '../FeaturedHead';
import Item from '../Item';
import FooterMobile from '../FooterMobile';
import defaultMenuItems from '../../data/menu-items.json';
import defaultMenuItemsMobile from '../../data/mobile-items.json';
import styles from './WebHeader.styl';
import generateNewMenuItemsJson from '../../modules/update';

const cx = styles::classNames;
const blogLastApi = 'https://auth0-marketing.run.webtask.io/last-blog-post';

class WebHeader extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    theme: PropTypes.oneOf(['light', 'gray', 'dark']),
    featuredEnable: PropTypes.bool,
    featuredIconColor: PropTypes.string,
    featuredLink: PropTypes.string,
    featuredTitle: PropTypes.string,
    featuredDescription: PropTypes.string,
    featuredCTA: PropTypes.string,
    loginButtonEnable: PropTypes.bool,
    loginButtonLink: PropTypes.string,
    loginButtonOnClick: PropTypes.func,
    loginButtonText: PropTypes.string,
    signupButtonEnable: PropTypes.bool,
    signupButtonLink: PropTypes.string,
    signupButtonOnClick: PropTypes.func,
    signupButtonText: PropTypes.string,
    talkToSalesButtonEnable: PropTypes.bool,
    talkToSalesButtonLink: PropTypes.string,
    talkToSalesButtonOnClick: PropTypes.func,
    talkToSalesButtonText: PropTypes.string,
    userProfile: PropTypes.node,
    breakpoint: PropTypes.number
  };

  static defaultProps = {
    className: '',
    children: null,
    theme: 'light',
    featuredEnable: true,
    featuredIconColor: null,
    featuredLink: null,
    featuredTitle: null,
    featuredDescription: null,
    featuredCTA: null,
    loginButtonEnable: true,
    loginButtonLink: '',
    loginButtonOnClick: () => {},
    loginButtonText: 'Log In',
    signupButtonEnable: true,
    signupButtonLink: '',
    signupButtonOnClick: () => {},
    signupButtonText: 'Sign up',
    talkToSalesButtonEnable: true,
    talkToSalesButtonLink: '?contact=true',
    talkToSalesButtonOnClick: () => {},
    talkToSalesButtonText: 'Talk to Sales',
    userProfile: null,
    breakpoint: 992
  };

  static renderButton(link, onClick, text, className) {
    return link
      ? <a href={link} className={className} onClick={onClick}>
          {text}
        </a>
      : <button className={className} onClick={onClick}>
          {text}
        </button>;
  }

  state = {
    navbarDropdownIsOpen: false,
    notificationIsOpen: true,
    mobileState: true,
    menuItems: defaultMenuItems,
    menuItemsMobile: defaultMenuItemsMobile
  };

  componentDidMount() {
    /* eslint-env browser */
    this.handleResize();
    window.addEventListener('resize', this.handleResize);
    this.updateBlogPost();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  setHeightDropdown = () => {
    const height = this.state.mobileState ? `${window.innerHeight - 70}px` : '';
    this.dropdownContent.style.height = height;
  };

  updateBlogPost = () => {
    axios
      .get(blogLastApi)
      .then(blogResponse => [this.state.menuItems, blogResponse.data])
      .then(generateNewMenuItemsJson)
      .then(newMenuItems => {
        this.setState({ menuItems: newMenuItems });
      })
      .catch(err => console.info('Auth0WebHeader', err));
  };

  handleResize = () => {
    const mobileState = window.innerWidth < this.props.breakpoint;
    this.setState({ mobileState }, () => {
      this.addOverflowBody();
      this.setHeightDropdown();
    });
  };

  navbarDropdownHandler = () => {
    this.setState({ navbarDropdownIsOpen: !this.state.navbarDropdownIsOpen }, this.addOverflowBody);
  };

  closeDropdownOnButtonClick = callback => event => {
    const isMobile = this.state.mobileState;
    const isDropdownOpen = this.state.navbarDropdownIsOpen;

    if (callback) callback(event);
    if (isMobile && isDropdownOpen) this.navbarDropdownHandler();
  };

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
  };

  notificationHandler = () => {
    this.setState({ notificationIsOpen: !this.state.notificationIsOpen });
  };

  render() {
    const {
      className,
      children,
      theme,
      featuredEnable,
      featuredIconColor,
      featuredLink,
      featuredTitle,
      featuredDescription,
      featuredCTA,
      signupButtonEnable,
      signupButtonLink,
      signupButtonOnClick,
      signupButtonText,
      talkToSalesButtonEnable,
      talkToSalesButtonLink,
      talkToSalesButtonOnClick,
      talkToSalesButtonText,
      loginButtonEnable,
      loginButtonLink,
      loginButtonOnClick,
      loginButtonText,
      userProfile
    } = this.props;
    const {
      navbarDropdownIsOpen,
      mobileState,
      focusable,
      menuItems,
      menuItemsMobile,
      notificationIsOpen
    } = this.state;

    const signupButton = WebHeader.renderButton(
      signupButtonLink,
      this.closeDropdownOnButtonClick(signupButtonOnClick),
      signupButtonText,
      `btn btn-success btn-sm ${cx('signup-button')}`
    );
    const talkToSalesButton = WebHeader.renderButton(
      talkToSalesButtonLink,
      this.closeDropdownOnButtonClick(talkToSalesButtonOnClick),
      talkToSalesButtonText,
      'btn btn-transparent btn-sm talk-button'
    );
    const loginButton = WebHeader.renderButton(
      loginButtonLink,
      this.closeDropdownOnButtonClick(loginButtonOnClick),
      loginButtonText,
      cx('login-button', { 'login-button--dark': theme === 'dark' })
    );

    const renderedMenuMobile = menuItemsMobile.map((mobileLinks, i) =>
      <FooterMobile
        onClick={this.navbarDropdownHandler}
        key={mobileLinks.id}
        mobileLinks={mobileLinks}
      />
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
    /* eslint-disable jsx-a11y/no-static-element-interactions */
    return (
      <header className={cx('header-main', { 'is-notification-open': notificationIsOpen })}>
        {featuredEnable &&
          <FeaturedHead
            iconColor={featuredIconColor}
            link={featuredLink}
            title={featuredTitle}
            description={featuredDescription}
            cta={featuredCTA}
            dropdownOpen={navbarDropdownIsOpen}
            notificationOpen={notificationIsOpen}
            theme={theme}
            closeNotificationHandler={this.notificationHandler}
          />}

        <div
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
                dropdownOpen={navbarDropdownIsOpen}
                theme={theme}
                closeHeaderDropdown={this.closeDropdownOnButtonClick()}
              />

              <div
                className={cx('collapse', {
                  'is-dropdown-open': navbarDropdownIsOpen
                })}
                ref={_ref => {
                  this.dropdownContent = _ref;
                }}
              >
                <nav className={cx('main-navigation')} role="navigation" aria-label="Main menu">
                  <ul className={cx('navigation')} role="menubar">
                    {children || renderedMenuItems}
                    <li
                      className={cxN({
                        'theme-dark': theme === 'dark'
                      })}
                    >
                      {talkToSalesButtonEnable && talkToSalesButton}
                    </li>
                  </ul>

                  <div className={cx('menu-mobile')}>
                    {talkToSalesButtonEnable && talkToSalesButton}

                    <ul>
                      {renderedMenuMobile}
                    </ul>
                  </div>
                </nav>

                <div
                  className={cxN(cx('buttons-group'), {
                    'theme-dark': theme === 'dark'
                  })}
                >
                  {loginButtonEnable && loginButton}
                  {signupButtonEnable && signupButton}
                  {userProfile}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default WebHeader;
