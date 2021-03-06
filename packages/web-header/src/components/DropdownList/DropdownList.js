import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import DropdownListItem from '../DropdownListItem';
import FooterList from '../FooterList';
import styles from './DropdownList.styl';
import { arrayItems, contentItems, abVariantName } from '../../modules/UtilsAbTest';

const cx = classNames.bind(styles);

const DropdownList = ({
  data,
  highlightHandler,
  parentClass,
  closeDropdowns,
  loading,
  abVariant
}) => (
  <div
    className={cx('dropdownList', {
      moreDropdownList: parentClass === 'moreDropdown',
      stackedList: data.stackedList,
      twoColList: data.twoColLayout,
      twoColListBig: data.twoColLayoutBig,
      highlight: data.highlight
    })}
  >
    {data.title ? (
      <header className={cx('header-title')}>
        {data.titleHref ? (
          <a
            className={cx('section-title', { hasArrow: data.titleHref, loading })}
            href={data.titleHref}
            rel={data.external ? 'external' : ''}
          >
            {data.title}
          </a>
        ) : (
          <h4 className={cx('section-title', { loading })}>{data.title}</h4>
        )}
        {data.description ? (
          <span
            className={cx('section-description', { loading })}
            dangerouslySetInnerHTML={{ __html: data.description }}
          />
        ) : null}
      </header>
    ) : null}
    {data.subItems ? (
      <div className={cx('multi-list')}>
        {data.subItems.map(subItem => (
          <ul role="menubar" key={subItem.titleList}>
            {subItem.titleList ? (
              <span className={cx('title-list', { loading })}>{subItem.titleList}</span>
            ) : null}

            {(subItem.items || []).map(item => {
              const useABVariant = arrayItems.includes(item.id) && abVariant === abVariantName;
              const dataItem = useABVariant ? contentItems[item.id] : item;
              return (
                <DropdownListItem
                  key={dataItem.id}
                  item={dataItem}
                  highlightHandler={highlightHandler}
                  hasArrow={subItem.hasArrows}
                  parentClass={parentClass}
                  closeDropdowns={closeDropdowns}
                  loading={loading}
                />
              );
            })}
          </ul>
        ))}
      </div>
    ) : null}
    {data.items ? (
      <ul role="menubar">
        {(data.items || []).map(item => (
          <DropdownListItem
            key={item.id}
            item={item}
            highlightHandler={highlightHandler}
            hasArrow={data.hasArrows}
            parentClass={parentClass}
            closeDropdowns={closeDropdowns}
            loading={loading}
          />
        ))}
      </ul>
    ) : null}
    {data.footerLinks ? (
      <footer className={cx('footer-list')}>
        {data.footerLinks.map(footer => (
          <FooterList key={footer.id} footer={footer} closeDropdowns={closeDropdowns} />
        ))}
      </footer>
    ) : null}
  </div>
);

DropdownList.propTypes = {
  data: PropTypes.object,
  highlightHandler: PropTypes.func,
  parentClass: PropTypes.string,
  closeDropdowns: PropTypes.func,
  loading: PropTypes.bool.isRequired,
  abVariant: PropTypes.string
};

export default DropdownList;
