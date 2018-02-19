import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Iframe.styl';

const cx = classNames.bind(styles);

class Iframe extends Component {
  componentDidMount() {
    /* eslint-env browser */
    document.body.classList.add('iframe-mode');
    document.documentElement.classList.add('iframe-mode');
  }

  componentWillUnmount() {
    /* eslint-env browser */
    document.body.classList.remove('iframe-mode');
    document.documentElement.classList.remove('iframe-mode');
  }

  render() {
    const { url } = this.props;
    return (
      <div className={cx('iframe-center')}>
        <iframe title="mobile" src={url} className={cx('iframe-mobile')} />
      </div>
    );
  }
}

Iframe.propTypes = {
  url: PropTypes.string.isRequired
};

export default Iframe;
