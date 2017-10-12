import React from "react";
import {configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import TripsForm from "../components/Trips/FormForTrips";
import {shallow, mount, render} from "enzyme";
import {MemoryRouter} from "react-router-dom";
import * as Api from "../api/api";

configure({adapter: new Adapter()});

const originalGetAll = Api.getAll;
let locationsPromise;

beforeEach(() => {
  locationsPromise = Promise.resolve([]);
  Api.getAll = () => locationsPromise;
});

afterEach(() => {
  Api.getAll = originalGetAll;
});

it("Should call onAdd, by pressing the button", () => {
  locationsPromise.then(locations => {
    const addEdit = jest.fn();
    const wrapper = mount(<MemoryRouter><TripsForm locations={locations} addEdit={addEdit}/></MemoryRouter>);
    const button = wrapper.find(".addEditTrips");
    button.simulate("click");
    expect(addEdit.mock.calls.length).toBe(1);
  });
});
