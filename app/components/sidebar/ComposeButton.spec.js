import { spy } from 'sinon';
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import { ComposeButton } from './ComposeButton';

Enzyme.configure({ adapter: new Adapter() });

function setup() {
  const actions = {
  };
  const component = shallow(<ComposeButton {...actions} />);
  return {
    component,
    actions
  };
}

describe('ComposeButton component', () => {
  it('should render without crashing', () => {
    const { component } = setup();
    expect(component).toHaveLength(1);
  });

  it('should have the right class', () => {
    const { component } = setup();
    expect(component.find("input").hasClass("compose btn")).toBe(true);
  })

  it('should have the value Compose', () => {
    const { component } = setup();
    expect(component.find("input").props().value).toMatch("Compose");
  })
});
