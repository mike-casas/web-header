/* eslint-env browser */
import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './containers';

const rootEl = document.getElementById('content');

render(
  <AppContainer>
    <App />
  </AppContainer>,
  rootEl
);

if (module.hot) {
  module.hot.accept('./containers', () => {
    const NextApp = require('./containers').default; // eslint-disable-line global-require

    render(
      <AppContainer>
        <NextApp />
      </AppContainer>,
      rootEl
    );
  });
}
