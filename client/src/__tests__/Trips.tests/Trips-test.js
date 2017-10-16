import React from "react";
import {configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import TripsForm from "../../components/Trips/FormForTrips";
import {mount} from "enzyme";
import {MemoryRouter} from "react-router-dom";
import * as api from "../../api/api";

configure({adapter: new Adapter()});

const originalGetAll = api.getAll;
let locationsPromise;

beforeEach(() => {
  locationsPromise = Promise.resolve([]);
  // noinspection JSAnnotator
  api.getAll = () => locationsPromise;
});

afterEach(() => {
  // noinspection JSAnnotator
  api.getAll = originalGetAll;
});

it("Should call addEdit, by pressing the button.", () => {
  locationsPromise.then(locations => {
    const addEdit = jest.fn();
    const wrapper = mount(<MemoryRouter><TripsForm locations={locations} addEdit={addEdit}/></MemoryRouter>);
    const button = wrapper.find(".addEditTrips");
    button.simulate("click");
    expect(addEdit.mock.calls.length).toBe(1);
  });
});

