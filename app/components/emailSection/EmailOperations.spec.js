import { spy } from 'sinon';
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import { EmailOperations } from './EmailOperations';

Enzyme.configure({ adapter: new Adapter() });

function setup() {
  const actions = {};
  const component = shallow(<EmailOperations {...actions} />);
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

  it('should display 4 icons', () => {
    const {component} = setup();
    expect(component.find('[icon]')).toHaveLength(4);
  })

  it('should display 4 icons', () => {
    const {component} = setup();
    expect(component.render()).toHaveLength(4);
  })

  it('should display 4 elements as FontAwesomeIcon tags', () => {
    const {component} = setup();
    const icons = component.find('[icon]').forEach((node) => {
      expect(node.text()).toEqual("<FontAwesomeIcon />");
    })
    expect(icons).toHaveLength(4);
  });
});
