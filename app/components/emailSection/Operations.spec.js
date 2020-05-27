import { spy } from 'sinon';
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import { Operation } from './Operations';

Enzyme.configure({ adapter: new Adapter() });

function setup() {
  const actions = {
  };
  const component = shallow(<Operation {...actions} />);
  return {
    component,
    actions
  };
}

describe('SimilarButton component', () => {
  it('should render without crashing', () => {
    const { component } = setup();
    expect(component).toHaveLength(1);
  });

  it('should display the send and discard buttons', () => {
    const {component} = setup();
    expect(component.find('[type="button"]')).toHaveLength(2);
    component.find('[type="button"]').forEach(node => {
      expect(node.hasClass("btn")).toEqual(true);
    })
  })
});
