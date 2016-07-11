import React, { PropTypes } from 'react';
import styles from './DropdownHighlight.styl';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const DropdownHighlight = ({ data, parentClass, closeHeaderDropdown }) =>
  <div
    className={cx({
      highlight: parentClass !== 'moreDropdown',
      moreHighlight: parentClass === 'moreDropdown'
    })}
  >
    {data.componentTitle ?
      <h4
        className={cx('section-title')}
        dangerouslySetInnerHTML={{ __html: data.componentTitle }}
      >
      </h4>
      : null
    }
    <a href={data.link} onClick={closeHeaderDropdown} className={cx('content')}>
      <img src={data.thumbnail} alt={data.title} />
      <h5 className={cx('title')}>{data.title}</h5>
      {data.excerpt
        ? <p className={cx('text')}>{data.excerpt}</p>
        : null
      }
      {data.time
        ? <span className={cx('time')}>{data.time}</span>
        : null
      }
      {(data.linkText && data.link)
        ? <div className={cx('link')}>{data.linkText}</div>
        : null
      }
    </a>
  </div>
;

DropdownHighlight.propTypes = {
  data: PropTypes.object,
  parentClass: PropTypes.string,
  closeHeaderDropdown: PropTypes.func
};

export default DropdownHighlight;
