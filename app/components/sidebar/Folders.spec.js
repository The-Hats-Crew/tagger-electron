import { spy } from 'sinon';
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import { Folders } from './Folders';

Enzyme.configure({ adapter: new Adapter() });

function setup() {
  const actions = {
  };
  const component = shallow(<Folders {...actions} />);
  return {
    component,
    actions
  };
}

describe('Folders component', () => {
  it('should render without crashing', () => {
    const { component } = setup();
    expect(component).toHaveLength(1);
  });

  it("should have a folder named Inbox", () => {
    const {component} = setup();
    const lists = component.find("li").map(node => node)
    expect(lists[0].text()).toMatch(/Inbox/)
  })
  it("should have a folder named Sent", () => {
    const {component} = setup();
    const lists = component.find("li").map(node => node)
    expect(lists[1].text()).toMatch(/Sent/)
  })
  it("should have a folder named Draft", () => {
    const {component} = setup();
    const lists = component.find("li").map(node => node)
    expect(lists[2].text()).toMatch(/Draft/)
  })
});
