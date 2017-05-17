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
import getRibbonVariant from '../../modules/ribbon';

const cx = styles::classNames;
const blogLastApi = 'https://auth0-marketing.run.webtask.io/last-blog-post';

class WebHeader extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    theme: PropTypes.oneOf(['light', 'gray', 'dark']),
    featuredEnable: PropTypes.bool,
    featuredLink: PropTypes.string,
    featuredText: PropTypes.string,
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
    breakpoint: PropTypes.number
  };

  static defaultProps = {
    className: '',
    children: null,
    theme: 'light',
    featuredEnable: true,
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
    breakpoint: 992
  };

  /**
   * Get ribbon variant
   * @public
   */
  static getRibbon() {
    return getRibbonVariant();
  }

  static renderButton(link, onClick, text, className) {
    return link
      ? <a href={link} className={className} onClick={onClick}>{text}</a>
      : <button className={className} onClick={onClick}>{text}</button>;
  }

  state = {
    navbarDropdownIsOpen: false,
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
  }

  updateBlogPost = () => {
    axios.get(blogLastApi)
      .then(blogResponse => [this.state.menuItems, blogResponse.data])
      .then(generateNewMenuItemsJson)
      .then((newMenuItems) => {
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

  closeDropdownOnButtonClick = callback => (event) => {
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

  handleKeyDown = (e) => {
    // Only enable focusable elements on key tab pressed
    if (e.keyCode !== 9 || this.state.focusable) return;
    this.setState({ focusable: true });
  }

  render() {
    const {
      className,
      children,
      theme,
      featuredEnable,
      featuredLink,
      featuredText,
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
      loginButtonText
    } = this.props;
    const { navbarDropdownIsOpen, mobileState, focusable, menuItems, menuItemsMobile } = this.state;

    const signupButton = WebHeader.renderButton(
      signupButtonLink,
      this.closeDropdownOnButtonClick(signupButtonOnClick),
      signupButtonText,
      'btn btn-success btn-sm signup-button'
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
      <header
        className={cx('header', [`theme-${theme}`], className, {
          'is-dropdown-open': navbarDropdownIsOpen,
          focusable
        })}
        onKeyDown={this.handleKeyDown}
      >
        <FeaturedHead
          featured={featuredEnable}
          featuredLink={featuredLink}
          featuredText={featuredText}
          dropdownOpen={navbarDropdownIsOpen}
          theme={theme}
          closeHeaderDropdown={this.closeDropdownOnButtonClick()}
        />
        <div className={cx('menu', { 'is-dropdown-open': navbarDropdownIsOpen })}>
          <div className="container">
            <Head
              toggleDropdownHandler={this.navbarDropdownHandler}
              dropdownOpen={navbarDropdownIsOpen}
              theme={theme}
              closeHeaderDropdown={this.closeDropdownOnButtonClick()}
            />

            <div className={cx('collapse', {
                'is-dropdown-open': navbarDropdownIsOpen
              })}
              ref={(_ref) => { this.dropdownContent = _ref; }}
            >

              <nav
                className={cx('main-navigation')}
                role="navigation" aria-label="Main menu"
              >
                <ul
                className={cx('navigation')}
                role="menubar"
                >
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
              </div>

            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default WebHeader;
