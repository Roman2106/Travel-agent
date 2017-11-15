import {ActionType} from "./CustomersConst";
import _ from "lodash";

const initialState = {
  listCustomers: {},
  sortBy: "firstName",
  sortOrder: "asc",
  showLoading: true
};

export const CustomersReducer = (state = initialState, action) => {

  switch (action.type) {

    case ActionType.LOADED_CUSTOMERS:
      return {
        ...state, listCustomers: _.keyBy(action.payload.customers, customer => customer.id), showLoading: false
      };

    case ActionType.ADD_CUSTOMER:
      return {
        ...state,
        listCustomers: {
          ...state.listCustomers,
          [action.payload.customer.id]: {...action.payload.customer, className: "updateItem"}
        }
      };

    case ActionType.EDIT_CUSTOMER:
      return {
        ...state,
        listCustomers: {
          ...state.listCustomers,
          [action.payload.customer.id]: {...action.payload.customer, className: "updateItem"}
        }
      };

    case ActionType.DELETE_CUSTOMER:
      return {
        ...state, listCustomers: _.omit(state.listCustomers, action.payload.id)
      };

    case ActionType.REMOVE_CLASS_CUSTOMER:
      const customer = state.listCustomers[action.payload.customerId];
      const {className, ...other} = customer;
      return {
        ...state, listCustomers: {...state.listCustomers, [action.payload.customerId]: {...other}}
      };

    case ActionType.CHANGE_SORT_ORDER_CUSTOMERS:
      const sorted = Object.values(state.listCustomers).sort((a, b) => {
        let c = a[action.payload.field].toLowerCase();
        let d = b[action.payload.field].toLowerCase();
        if (c < d) return -1;
        return 1;
      });
      const sortOrder = state.sortOrder === "asc" ? "desc" : "asc";
      const sortedNormalized = state.sortOrder === "desc" ?
        _.keyBy(sorted.reverse(), trip => trip.id) :
        _.keyBy(sorted, customer => customer.id);
      return {...state, sortBy: action.payload.field, sortOrder: sortOrder, listCustomers: sortedNormalized};

    default:
      return state;
  }

};