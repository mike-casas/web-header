import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Dropdown from '../Dropdown';
import styles from './Item.styl';

const cx = styles::classNames;

class Item extends Component {
  static propTypes = {
    item: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      mobileHref: PropTypes.string,
      dropdownClass: PropTypes.string,
      simpleList: PropTypes.bool,
      children: PropTypes.arrayOf(PropTypes.object)
    }),
    theme: PropTypes.string,
    simpleList: PropTypes.bool,
    closeHeaderDropdown: PropTypes.func,
    mobile: PropTypes.bool
  }

  state = {
    openDropdown: false
  }

  handleDropdown = (e) => {
    const { openDropdown } = this.state;
    const { mobile } = this.props;
    const isMobile = mobile;
    const shouldOpenDropdown = ['mouseenter', 'focus'].indexOf(e.type) > -1;

    if (shouldOpenDropdown === openDropdown || isMobile) return;

    this.setState({ openDropdown: shouldOpenDropdown });
  }

  closeItemDropdown = () => {
    const isDesktop = !this.props.mobile;
    const isDropdownOpen = this.state.openDropdown;

    if (isDesktop && isDropdownOpen) {
      this.setState({ openDropdown: false });
    }
  }

  closeDropdowns = () => {
    this.closeItemDropdown();
    this.props.closeHeaderDropdown();
  }

  render() {
    const { item, theme, simpleList, mobile } = this.props;

    const linkContent = <ItemContent name={item.name} childrens={item.childrens} theme={theme} />;
    const linkHref = (mobile ? item.mobileHref : null) || item.href;
    const linkExternal = item.external ? 'external' : null;

    return (
      <li
        className={cx('item', [`item-${item.id}`], [`theme-${theme}`], {
          'simple-list': simpleList,
          'is-dropdown-open': this.state.openDropdown
        })}
        onMouseEnter={this.handleDropdown}
        onFocus={this.handleDropdown}
        onMouseLeave={this.handleDropdown}
        onBlur={this.handleDropdown}
        role="menuitem" aria-haspopup="true"
      >
        {linkHref
          ?
            <a
              href={linkHref}
              onClick={this.closeDropdowns}
              className={cx('link')}
              rel={linkExternal}
            >{linkContent}</a>
          :
            <span
              tabIndex="0"
              className={cx('link')}
            >{linkContent}</span>
        }
        {item.childrens
          ?
            <Dropdown
              data={item}
              closeDropdowns={this.closeDropdowns}
              open={this.state.openDropdown}
            />
          : null
        }
      </li>
    );
  }
}

export default Item;

const ItemContent = ({ name, childrens, theme }) =>
  <span>
    <span className={cx('text')}>{name}</span>
    {childrens ?
      <svg
        width="8"
        height="4"
        viewBox="62 7 10 6"
        className={cx('item-caret')}
      >
        <path
          // eslint-disable-next-line max-len
          d="M71.884 7.698l-4.56 5.116c-.013.022-.008.05-.026.07-.083.084-.192.12-.3.116-.106.004-.214-.033-.295-.117-.02-.02-.014-.047-.028-.068L62.115 7.7c-.154-.16-.154-.42 0-.58.156-.16.408-.16.563 0L67 11.97l4.322-4.85c.155-.16.406-.16.56 0 .157.16.157.418.002.578z"
          fill={theme === 'dark' ? '#fff' : '#000'}
        />
      </svg>
      : null
    }
    {childrens ? <span className={cx('dropdown-caret')} /> : null}
  </span>;

ItemContent.propTypes = {
  name: PropTypes.string,
  childrens: PropTypes.array,
  theme: PropTypes.string
};
