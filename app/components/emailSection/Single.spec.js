import { spy } from 'sinon';
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import { Single } from './Single';

Enzyme.configure({ adapter: new Adapter() });

function setup() {
  const actions = {
    email_body: "This is the body text"
  };
  const component = shallow(<Single {...actions} />);
  return {
    component,
    actions
  };
}

describe('EmailOperations component', () => {
  it('should render without crashing', () => {
    const { component } = setup();
    expect(component).toHaveLength(1);
  });

  it('should display the Email wrapper', () => {
    const {component} = setup();
    expect(component.find(".thread-message")).toHaveLength(1);
  })

  it('should display 4 elements as FontAwesomeIcon tags', () => {
    const {component} = setup();
    expect(component.prop("dangerouslySetInnerHTML")).toEqual({__html: "This is the body text"});
  });
});
