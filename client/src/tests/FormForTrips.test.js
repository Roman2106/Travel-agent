import React from "react";
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {mount} from "enzyme";
import TripsForm from "../formForTrips";

Enzyme.configure({ adapter: new Adapter() });

it("Should call onAdd, by pressing the button 'Add Trip'", () => {
  const onAdd = jest.fn();
  const wrapper = mount(<TripsForm onAdd = {onAdd}/>);
  const button = wrapper.find(".addEditTrips");
  button.simulate("click");
  expect(onAdd.mock.calls.length).toBe(1);
});
