import React from "react";
import {configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import CustomerForm from "../../components/Customers/FormForCustomers";
import Customers from "../../components/Customers/Customers";
import {mount} from "enzyme";
import {MemoryRouter, withRouter} from "react-router-dom";
import * as api from "../../api/api";

configure({adapter: new Adapter()});

const originalGetAll = api.getAll;
let customersPromise;
let customersFormPromise;

beforeEach(() => {
  customersPromise = Promise.resolve([
    {
      firstName: "Roman",
      lastName: "Kremko",
      id: "1",
      customersTrips: [
        {
          dateDeparture: "2017-10-13",
          dateArrival: "2017-10-08",
          tripName: "Поездка в Россию",
          id: "2"
        }
      ]
    }
  ]);

  customersFormPromise = Promise.resolve([
    {
      tripName: "Поездка в Питер",
      dateDeparture: "2017-10-07",
      dateArrival: "2017-10-14",
      id: "3",
      routName: [
        {
          city: "Питер",
          country: "Россия"
        }
      ]
    }
  ]);
  // noinspection JSAnnotator
  api.getAll = () => customersFormPromise;
  // noinspection JSAnnotator
  api.getAll = () => customersPromise;
});

afterEach(() => {
  // noinspection JSAnnotator
  api.getAll = originalGetAll;
});

it("FormForCustomer have prop trips.", () => {
  customersFormPromise.then(trips => {
    const wrapper = mount(<MemoryRouter><CustomerForm trips={trips}/></MemoryRouter>);
    expect(wrapper.find(CustomerForm).prop("trips")).toEqual(trips);
  })
});

it("Customers have prop customers.", () => {
  customersPromise.then(customers => {
    const wrapper = mount(<MemoryRouter><Customers customers={customers}/></MemoryRouter>);
    expect(wrapper.find(Customers).prop("customers")).toEqual(customers);
  })
});

it("\n" + "When delete a customer, the function delSingle is called.", () => {
  customersPromise.then(customers => {
    const delSingle= jest.fn();
    const wrapper = mount(<MemoryRouter><Customers customers={customers} delSingle={delSingle}/></MemoryRouter>);
    const button = wrapper.find("button .del");
    button.simulate("click");
    expect(delSingle.mock.calls.length).toBe(1);
  })
});

it("Should call addEdit, by pressing the button.", () => {
  customersFormPromise.then(trips => {
    const addEdit = jest.fn();
    const wrapper = mount(<MemoryRouter><CustomerForm addEdit={addEdit} trips={trips}/></MemoryRouter>);
    const button = wrapper.find(".addEditCustomer");
    button.simulate("click");
    expect(addEdit.mock.calls.length).toBe(1);
  });
});


