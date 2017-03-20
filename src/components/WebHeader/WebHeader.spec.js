/* eslint-env mocha */
import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import WebHeader from './WebHeader';

describe('<WebHeader />', () => {
  it('renders promote link flag without promoteLink prop', () => {
    const wrapper = shallow(<WebHeader />);
    expect(wrapper.find('.hiring')).to.have.length(1);
  });
});
