import { spy } from 'sinon';
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import { SimilarButton } from './SimilarButton';

Enzyme.configure({ adapter: new Adapter() });

function setup() {
  const actions = {
    email_body: "This is the body text"
  };
  const component = shallow(<SimilarButton {...actions} />);
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

  it('should display the input element', () => {
    const {component} = setup();
    expect(component.find("input")).toHaveLength(1);
  })

  it('should display 4 elements as FontAwesomeIcon tags', () => {
    const {component} = setup();
    expect(component.find('[value="Similar Emails"]').prop("value")).toEqual("Similar Emails");
  });
});
