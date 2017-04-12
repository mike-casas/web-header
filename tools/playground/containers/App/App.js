/* eslint-env browser */
import React from 'react';
import WebHeader from '../../../../src';
import Section from '../../components';

const App = () => {
  if (
    window &&
    window.location &&
    window.location.search &&
    window.location.search.indexOf('mobile') > -1
  ) {
    return <WebHeader theme="dark" />;
  }

  return (
    <div>
      <h1 className="container text-center">Auth0 Web Header Playground</h1>
      <Section title="Theme Dark" dark>
        <WebHeader theme="dark" />
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
