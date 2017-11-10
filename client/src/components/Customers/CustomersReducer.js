import {ActionType} from "./CustomersConst";
import _ from "lodash";

const initialState = {
  listCustomers: {},
  showLoading: true
};

export const CustomersReducer = (state = initialState, action) => {

  switch (action.type) {

    case ActionType.LOADED_CUSTOMERS:
      return {
        ...state, listCustomers: _.keyBy(action.payload.customers, customer=>customer.id), showLoading: false
      };

    case ActionType.ADD_CUSTOMER:
      return {
        ...state, listCustomers: {...state.listCustomers, [action.payload.customer.id]: action.payload.customer}
      };

    case ActionType.EDIT_CUSTOMER:
      return {
        ...state, listCustomers: {...state.listCustomers, [action.payload.customer.id]: action.payload.customer}
      };

    case ActionType.DELETE_CUSTOMER:
      return {
        ...state, listCustomers: _.omit(state.listCustomers, action.payload.id)
      };

    default:
      return state;
  }

};