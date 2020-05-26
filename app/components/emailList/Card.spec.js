import { spy } from 'sinon';
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import {Card} from "./Card";

Enzyme.configure({ adapter: new Adapter() });

function setup() {
  const actions = {
    sendEmail: spy(),
    setComposer: spy()
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
    
})