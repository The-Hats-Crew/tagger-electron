import { spy } from 'sinon';
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import {Card} from "./Card";

Enzyme.configure({ adapter: new Adapter() });

function setup() {
  const actions = {
    email: {
      name: "Anthony",
      date: new Date("03/23/2015"),
      subject: "This is a subject",
      email_body_text: "This is email body text"
    }
  };
  const component = shallow(<Card {...actions} />);
  return {
    component,
    actions
  };
}

describe("Card component", () => {
    it("should render without crashing", () => {
      const {component} = setup();
      expect(component).not.toBeNull()
    })

    it("should display name of email", () => {
      const {component} = setup();
      expect(component.find("h3").text()).toMatch(/^Anthony$/);
    })

    it("should display date of email", () => {
      const {component} = setup();
      expect(component.find("time").text()).toMatch(/^Mar 23rd 2015$/);
    })

    it("should display subject of email", () => {
      const {component} = setup();
      expect(component.find("p.snippet-subject").text()).toMatch(/^This is a subject$/);
    })

    it("should display subject of email", () => {
      const {component} = setup();
      expect(component.find("p.snippet-message").text()).toMatch(/^This is email body text$/);
    })

})
