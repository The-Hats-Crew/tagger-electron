import { spy } from 'sinon';
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import {EmailSection} from "./EmailSection";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


Enzyme.configure({ adapter: new Adapter() });

function setup() {
  const actions = {
   
  };
  const component = shallow(<EmailSection {...actions} />);
  return {
    component,
    actions
  };
}


describe("EmailSection component", () => {
    it("should render without crashing", () => {
      const {component} = setup();
      expect(component).not.toBeNull()
    })


it('should display name of email', () => {
    const { component } = setup();
    component.setProps({
        viewemail: {
            from: "adriannasaruk@gmail.com",
            name: "Adrian",
            subject: "Labs"
        }
    })
    expect(component.find('h3').text()).toMatch(/^Adrian$/);
    expect(component.find('h2').text()).toMatch(/^Labs$/);
    expect(component.find(FontAwesomeIcon).hasClass("thread-avatar")).toBe(true);
  });


})