import { spy } from 'sinon';
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import {Operation} from "./Operations";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


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


describe("Operation component", () => {
    it("should render without crashing", () => {
      const {component} = setup();
      expect(component).not.toBeNull()
    })

    it("should render input when messageType is replyall", () => {
        const {component} = setup();
        component.setProps({
            messageType: "replyall"
        })
        expect(component.find('[name="to"]').text()).toMatch(/^$/)

      })
      it("should render input when messageType is reply", () => {
        const {component} = setup();
        component.setProps({
            messageType: "reply"
        })
        expect(component.find('[name="to"]').text()).toMatch(/^$/)

      })
      it("should render input when messageType is forward", () => {
        const {component} = setup();
        component.setProps({
            messageType: "forward"
        })
        expect(component.find('[name="to"]').text()).toMatch(/^$/)

      })

})
