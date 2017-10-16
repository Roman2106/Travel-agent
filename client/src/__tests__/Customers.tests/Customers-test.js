import React from "react";
import {configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import CustomerForm from "../../components/Customers/FormForCustomers";
import Customers from "../../components/Customers/Customers";
import {mount} from "enzyme";
import {MemoryRouter} from "react-router-dom";
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
        },
        {
          dateDeparture: "2017-10-18",
          dateArrival: "2017-10-22",
          tripName: "Поездка в Париж",
          id: "5"
        },
      ]
    },
    {
      firstName: "Olga",
      lastName: "Kremko",
      id: "22",
      customersTrips: [
        {
          dateDeparture: "2017-10-20",
          dateArrival: "2017-10-29",
          tripName: "Поездка США",
          id: "222"
        },
        {
          dateDeparture: "2017-11-19",
          dateArrival: "2017-11-29",
          tripName: "Поездка в Париж",
          id: "555"
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
        },
      ]
    },
    {
      tripName: "Поездка в барселону",
      dateDeparture: "2017-10-10",
      dateArrival: "2017-10-18",
      id: "4",
      routName: [
        {
          city: "Барселона",
          country: "Испания"
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

it("FormForCustomer have correct prop trips.", () => {
  customersFormPromise.then(trips => {
    const wrapper = mount(<MemoryRouter><CustomerForm trips={trips}/></MemoryRouter>);
    expect(wrapper.find(CustomerForm).prop("trips")).toEqual(trips);
  })
});

it("Customers have correct prop customers.", () => {
  customersPromise.then(customers => {
    const wrapper = mount(<MemoryRouter><Customers customers={customers}/></MemoryRouter>);
    expect(wrapper.find(Customers).prop("customers")).toEqual(customers);
  })
});

it("When delete a customer, the function delSingle is called with first argument id", () => {
  customersPromise.then(customers => {
    const delSingle = jest.fn();
    const wrapper = mount(<MemoryRouter><Customers customers={customers} delSingle={delSingle}/></MemoryRouter>);
    const button = wrapper.find("button .del").first();
    button.simulate("click");
    expect(delSingle.mock.calls.length).toBe(1);
    expect(delSingle.mock.calls[0][0]).toEqual(customers[0].id);
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

it("By clicking on the edit button, match url with correct id", ()=>{
  customersPromise.then(customers =>{
    const wrapper = mount(<MemoryRouter><Customers customers={customers}/></MemoryRouter>);
    let link = wrapper.find(".edit").first();
    link.simulate("click");
    let  url = link.props().to;
    expect(url).toEqual(`/customers/${customers[0].id}`);
    console.log(url);
  });
});

it("FormForCustomer have select with the right amount options.", () => {
  customersFormPromise.then(trips => {
    const wrapper = mount(<MemoryRouter><CustomerForm trips={trips}/></MemoryRouter>);
    let options = wrapper.find(CustomerForm).find("select").find("option").length - 1;
    let tripsNum = trips.length;
    expect(options).toEqual(tripsNum);
  })
});

it("Table customers have right amount trips.", () => {
  customersPromise.then(customers => {
    const wrapper = mount(<MemoryRouter><Customers customers={customers}/></MemoryRouter>);
    let options = wrapper.find(Customers).find("table tr").find(".withTrips").first().find("p").length;
    let customerTripsNum = customers[0].customersTrips.length;
    expect(options).toEqual(customerTripsNum);
  })
});












