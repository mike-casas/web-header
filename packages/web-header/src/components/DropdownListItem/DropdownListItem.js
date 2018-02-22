import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './DropdownListItem.styl';

const cx = classNames.bind(styles);

class DropdownListItem extends Component {
  static propTypes = {
    item: PropTypes.object,
    highlightHandler: PropTypes.func,
    hasArrow: PropTypes.bool,
    parentClass: PropTypes.string,
    closeDropdowns: PropTypes.func,
    loading: PropTypes.bool.isRequired
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
    const { hasArrow, parentClass, highlightHandler, item, closeDropdowns, loading } = this.props;
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
          className={cx({
            'icon-css': item.iconColor && item.iconText
          })}
          href={item.href}
          onClick={closeDropdowns}
          rel={linkExternal}
        >
          {item.icon && (
            <figure
              className={cx('icon', { loading })}
              dangerouslySetInnerHTML={{ __html: item.icon }}
            />
          )}
          {item.iconColor &&
            item.iconText && (
              <figure className={cx('icon', { loading })}>
                <span
                  style={{
                    backgroundColor: item.iconColor,
                    width: 46,
                    height: 30,
                    display: 'inline-block',
                    color: '#F5F7F9',
                    borderRadius: 3,
                    textAlign: 'center',
                    fontSize: 12,
                    fontWeight: 500,
                    textTransform: 'uppercase',
                    padding: 7
                  }}
                >
                  {item.iconText}
                </span>
              </figure>
            )}
          <span className={cx('text')}>
            <span className={cx({ loading })}>{item.name}</span>

            {item.prefix ? (
              <span className={cx('itemPrefix', { loading })}>{item.prefix}</span>
            ) : null}
          </span>
          {item.description ? (
            <p className={cx('item-description', { loading })}>{item.description}</p>
          ) : null}
        </a>
      </li>
    );
  }
}

export default DropdownListItem;
