/* eslint react/jsx-props-no-spreading: off */
import { spy } from 'sinon';
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import {Analytics} from "./Analytics";

Enzyme.configure({ adapter: new Adapter() });

function setup() {
  const actions = {
    name: "Anthony",
    address: "anthonyk2020@gmail.com",
    totalEmails: 13,
    sentEmails: 12,
    receivedEmails: 20
  };
  const component = shallow(<Analytics {...actions} />);
  return {
    component,
    actions,
    buttons: component.find('button'),
    total: component.find('#total_emails span.num'),
    sent: component.find('#sent_emails span.num'),
    received: component.find("#received_emails span.num")
  };
}

describe('Analytics component', () => {
  it("should render without crashing", () => {
    const {component} = setup();
    expect(component).not.toBeNull()
  })

  it('should display total emails', () => {
    const { total } = setup();
    expect(total.text()).toMatch(/^13$/);
  });

  it('should display sent emails', () => {
    const { sent } = setup();
    expect(sent.text()).toMatch(/^12$/);
  });

  it('should display sent emails', () => {
    const { received } = setup();
    expect(received.text()).toMatch(/^20$/);
  });

  it("should display correct email address", () => {
    const { component } = setup();
    expect(component.find('h3').text()).toMatch(/^anthonyk2020@gmail.com$/);
  })

  it("should display correct name", () => {
    const { component } = setup();
    expect(component.find('h2').text()).toMatch(/^Anthony$/);
  })


//   it('should first button should call increment', () => {
//     const { buttons, actions } = setup();
//     buttons.at(0).simulate('click');
//     expect(actions.increment.called).toBe(true);
//   });

//   it('should match exact snapshot', () => {
//     const { actions } = setup();
//     const counter = (
//       <div>
//         <Router>
//           <Counter counter={1} {...actions} />
//         </Router>
//       </div>
//     );
//     const tree = renderer.create(counter).toJSON();

//     expect(tree).toMatchSnapshot();
//   });

//   it('should second button should call decrement', () => {
//     const { buttons, actions } = setup();
//     buttons.at(1).simulate('click');
//     expect(actions.decrement.called).toBe(true);
//   });

//   it('should third button should call incrementIfOdd', () => {
//     const { buttons, actions } = setup();
//     buttons.at(2).simulate('click');
//     expect(actions.incrementIfOdd.called).toBe(true);
//   });

//   it('should fourth button should call incrementAsync', () => {
//     const { buttons, actions } = setup();
//     buttons.at(3).simulate('click');
//     expect(actions.incrementAsync.called).toBe(true);
//   });
});
