import { spy } from 'sinon';
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import { Pagination } from './Pagination';

Enzyme.configure({ adapter: new Adapter() });

function setup() {
  const actions = {
  };
  const component = shallow(<Pagination {...actions} />);
  return {
    component,
    actions
  };
}

describe('Pagination component', () => {
  it('should render without crashing', () => {
    const { component } = setup();
    expect(component).toHaveLength(1);
  });

  it('should render total and current number of the first and last email on the page 1 if total is more than 25', () => {
    const {component} = setup();
    component.setProps({
      totalCount: 50,
      pageNum: 1,
      label: "inbox",
      isSearch: false
    })
    expect(component.find("span").text()).toMatch(/^1-25 of 50$/)
  })

  it('should render total and current number of the lowest and highest email on the page 2 if total is more than 25', () => {
    const {component} = setup();
    component.setProps({
      totalCount: 75,
      pageNum: 2,
      label: "inbox",
      isSearch: false
    })
    expect(component.find("span").text()).toMatch(/^26-50 of 75$/)
  })

  it('should render total and current number of the lowest and highest email on the last page if total is more than 25', () => {
    const {component} = setup();
    component.setProps({
      totalCount: 75,
      pageNum: 3,
      label: "inbox",
      isSearch: false
    })
    expect(component.find("span").text()).toMatch(/^51-75 of 75$/)
  })
  
  it('should disable previous button and enable next button if on page 1', () => {
    const {component} = setup();
    component.setProps({
      totalCount: 75,
      pageNum: 1,
      label: "inbox",
      isSearch: false
    })
    expect(component.find("#prev-btn").hasClass("inactive")).toBe(true)
    expect(component.find("#next-btn").hasClass("inactive")).toBe(false)
  });

  it('should disable next page button if your on page 1 and have less than 25 total emails', () => {
    const {component} = setup();
    component.setProps({
      totalCount: 24,
      pageNum: 1,
      label: "inbox",
      isSearch: false
    })
    expect(component.find("#prev-btn").hasClass("inactive")).toBe(true)
    expect(component.find("#next-btn").hasClass("inactive")).toBe(true)
  })
  it('should disable next page button if your on the last page when total emails are greater than 25', () => {
    const {component} = setup();
    component.setProps({
      totalCount: 50,
      pageNum: 2,
      label: "inbox",
      isSearch: false
    })
    expect(component.find("#prev-btn").hasClass("inactive")).toBe(false)
    expect(component.find("#next-btn").hasClass("inactive")).toBe(true)
  })
});
