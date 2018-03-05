/* eslint-env browser */
import React from 'react';
import WebHeader from '../../../../src';
import { Iframe, Section } from '../../components';

const App = () => {
  if (
    window &&
    window.location &&
    window.location.search &&
    window.location.search.indexOf('mobile') > -1
  ) {
    return <Iframe url="/?iframe" />;
  }

  if (
    window &&
    window.location &&
    window.location.search &&
    window.location.search.indexOf('iframe') > -1
  ) {
    return <WebHeader theme="dark" />;
  }

  window.abVariantHeader = 'replaceItems';

  const ab = () => window.abVariantHeader;

  return (
    <div>
      <h1 className="container text-center">Auth0 Web Header Playground</h1>
      <Section title="Theme Dark" dark>
        <WebHeader theme="dark" getAbVariantHeader={ab} />
      </Section>
      <Section title="Theme Gray">
        <WebHeader theme="gray" />
      </Section>
      <Section title="Theme Light">
        <WebHeader theme="light" />
      </Section>
    </div>
  );
};

export default App;
