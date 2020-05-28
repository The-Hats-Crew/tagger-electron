import { spy } from 'sinon';
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
<<<<<<< HEAD
import { Operation } from './Operations';
=======
import {Operation} from "./Operations";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

>>>>>>> a8f4f117a9dcb82011b6240fe0a9f4d0ac5280f5

Enzyme.configure({ adapter: new Adapter() });

function setup() {
  const actions = {
<<<<<<< HEAD
=======
   
>>>>>>> a8f4f117a9dcb82011b6240fe0a9f4d0ac5280f5
  };
  const component = shallow(<Operation {...actions} />);
  return {
    component,
    actions
  };
}

<<<<<<< HEAD
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
=======

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
>>>>>>> a8f4f117a9dcb82011b6240fe0a9f4d0ac5280f5
