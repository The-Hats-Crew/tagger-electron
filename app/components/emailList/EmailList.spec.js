import { spy } from 'sinon';
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import {EmailList} from "./EmailList";

Enzyme.configure({ adapter: new Adapter() });

function setup() {
  const actions = {
  };
  const component = shallow(<EmailList {...actions} />);
  return {
    component,
    actions
  };
}


describe("EmailList component", () => {
    it("should render without crashing", () => {
      const {component} = setup();
      expect(component).not.toBeNull()
    })

    it("should render without crashing when emails is empty array", () => {
      const {component} = setup();
      component.setProps({
        emails: []
      })
      expect(component).not.toBeNull()
    })

    it("should render without crashing emails array is passed as a prop", () => {
      const {component} = setup();
      component.setProps({
        emails:[
          {
            id: 1,
            name: "Anthony",
            date: "March 23rd 2015"
          },
          {
            id: 2,
            name: "Anthony",
            date: "March 23rd 2015"
          }
        ]
      })
      expect(component.find("div.btn").hasClass("compose-circle-btn")).toBe(true);
    })

})
