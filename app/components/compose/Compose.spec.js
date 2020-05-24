/* eslint react/jsx-props-no-spreading: off */
import { spy } from 'sinon';
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import {Compose} from "./Compose";

Enzyme.configure({ adapter: new Adapter() });

function setup() {
  const actions = {
    sendEmail: spy(),
    setComposer: spy()
  };
  const component = shallow(<Compose {...actions} />);
  return {
    component,
    actions
  };
}

describe("Compose component", () => {
  it("should render without crashing", () => {
    const {component} = setup();
    expect(component).not.toBeNull()
  })

  it("should have empty input values on initial render", () => {
    const {component} = setup();
    const to = component.find("#receiver");
    const subject = component.find("#subject");
    const text = component.find("#body");
    const cc = component.find("#cc");
    const bcc = component.find("#bcc");
    expect(to.props().value).toMatch(/^$/);
    expect(subject.props().value).toMatch(/^$/);
    expect(text.props().value).toMatch(/^$/);
    expect(cc.props().value).toMatch(/^$/);
    expect(bcc.props().value).toMatch(/^$/);
  })

  it.todo("this is a todo")
})
