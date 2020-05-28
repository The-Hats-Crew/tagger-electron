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

  })

  it.todo('should render total and current number of the lowest and highest email on the page 2 if total is more than 25')
  it.todo('should render total and current number of the lowest and highest email on the page last if total is more than 25')
  it.todo('should disable previous button and enable next button if on page 1');
  it.todo('should disable next page button if your on page 1 and have less than 25 total emails')
  it.todo('should disable next page button if your on the last page when total emails are greater than 25')
});
