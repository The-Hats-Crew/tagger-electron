import { spy } from 'sinon';
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import { EmailButtons } from './EmailButtons';

Enzyme.configure({ adapter: new Adapter() });

function setup() {
  const actions = {};
  const component = shallow(<EmailButtons {...actions} />);
  return {
    component,
    actions
  };
}

describe('EmailButton component', () => {
  it('should render without crashing', () => {
    const { component } = setup();
    expect(component).toHaveLength(1);
  });

  it('should display 3 buttons', () => {
    const {component} = setup();
    expect(component.find("input.btn")).toHaveLength(3);
  })

  it('should display reply button', () => {
    const {component} = setup();
    expect(component.find('[name="reply"]')).toHaveLength(1);
  });

  it('should display reply all button', () => {
    const {component} = setup();
    expect(component.find('[name="replyall"]')).toHaveLength(1);
  });

  it('should display forward button', () => {
    const {component} = setup();
    expect(component.find('[name="forward"]')).toHaveLength(1);
  });
});
