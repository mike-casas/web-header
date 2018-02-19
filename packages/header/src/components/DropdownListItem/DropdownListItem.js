import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './DropdownListItem.styl';

import ProductsSVG from '../../svg/ProductsSVG';
import JavascriptSVG from '../../svg/JavascriptSVG';
import AndroidSVG from '../../svg/AndroidSVG';
import IosSVG from '../../svg/iosSVG';
import DefaultSVG from '../../svg/DefaultSVG';
import B2eSVG from '../../svg/b2eSVG';
import B2bSVG from '../../svg/b2bSVG';
import CiamSVG from '../../svg/ciamSVG';
import GuardianSVG from '../../svg/GuardianSVG';
import WebtaskSVG from '../../svg/WebtaskSVG';
import BreachedSVG from '../../svg/BreachedSVG';
import LockSVG from '../../svg/LockSVG';
import MtmSVG from '../../svg/mtmSVG';
import MultifactorSVG from '../../svg/MultifactorSVG';
import PasswordlessSVG from '../../svg/PasswordlessSVG';
import UserManagementSVG from '../../svg/UserManagementSVG';
import SingleSignOnSVG from '../../svg/SingleSignOnSVG';

const cx = styles::classNames;

class DropdownListItem extends Component {
  static propTypes = {
    item: PropTypes.object,
    highlightHandler: PropTypes.func,
    hasArrow: PropTypes.bool,
    parentClass: PropTypes.string,
    closeDropdowns: PropTypes.func
  };

  componentDidMount() {
    /* eslint-env browser */
    const { item } = this.props;
    if (item.highlight && item.highlight.thumbnail) {
      const preloadImage = new Image();
      preloadImage.src = item.highlight.thumbnail;
    }
  }

  render() {
    const { hasArrow, parentClass, highlightHandler, item, closeDropdowns } = this.props;
    const logos = {
      webtask: <WebtaskSVG />,
      guardian: <GuardianSVG />,
      ciam: <CiamSVG />,
      b2b: <B2bSVG />,
      b2e: <B2eSVG />,
      logoDefault: <DefaultSVG />,
      javascript: <JavascriptSVG />,
      ios: <IosSVG />,
      android: <AndroidSVG />,
      quickstarts: <ProductsSVG />,
      breached: <BreachedSVG />,
      lock: <LockSVG />,
      mtm: <MtmSVG />,
      multifactor: <MultifactorSVG />,
      passwordless: <PasswordlessSVG />,
      userManagement: <UserManagementSVG />,
      singleSignOn: <SingleSignOnSVG />
    };
    const linkExternal = item.external ? 'external' : null;
    return (
      <li
        className={cx({
          item: !hasArrow,
          arrowItem: hasArrow,
          moreItem: parentClass === 'moreDropdown'
        })}
        onMouseEnter={() => {
          highlightHandler(item.highlight);
        }}
        onFocus={() => {
          highlightHandler(item.highlight);
        }}
        role="menuitem"
      >

        <a
          className={cx(item.customClass || '')}
          href={item.href}
          onClick={closeDropdowns}
          rel={linkExternal}
        >
          {item.icon ? <figure className={cx('icon')}>{logos[item.icon]}</figure> : null}
          <span className={cx('text')}>
            {item.name}

            {item.prefix ? <span className={cx('itemPrefix')}>{item.prefix}</span> : null}
          </span>
          {item.description ? <p className={cx('item-description')}>{item.description}</p> : null}
        </a>
      </li>
    );
  }
}

export default DropdownListItem;
