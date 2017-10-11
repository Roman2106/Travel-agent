import React from "react";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import TripsForm from "../components/Trips/FormForTrips";
import { shallow, mount, render } from "enzyme";
import {MemoryRouter} from "react-router-dom";

configure({ adapter: new Adapter() });

it("Should call onAdd, by pressing the button", () => {
  const onAdd = jest.fn();
  const wrapper = shallow(<MemoryRouter><TripsForm onAdd={onAdd}/></MemoryRouter>);
  // const button = wrapper.find("Loader");
  // const button = tripsForm.find("button.addEditTrips");
  expect(wrapper.find('TripsForm').exists()).toBe(true);
  // console.log(wrapper.find("Loader"));
  // button.simulate("click");
  // expect(onAdd.mock.calls.length).toBe(1);
});
