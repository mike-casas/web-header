/* eslint-env browser */
import React from 'react';
import ReactDOM from 'react-dom';
import Playground from 'component-playground';
import WebHeader from '../src';

export default function Index() {
  return <Playground codeText="<WebHeader />" scope={{ React, WebHeader }} />;
}

ReactDOM.render(<Index />, document.getElementById('content'));
