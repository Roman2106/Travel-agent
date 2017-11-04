import {ActionType} from "./CustomersConst";

const initialState = {
  listCustomers: [],
  showLoading: true
};

export const showCustomers = customers => ({type: ActionType.LOADED_CUSTOMERS, payload: {customers}});
export const addCustomer = customer => ({type: ActionType.ADD_CUSTOMER, payload: {customer}});
export const editCustomer = customer => ({type: ActionType.EDIT_CUSTOMER, payload: {customer}});
export const deleteCustomer = (id, customer) => ({type: ActionType.DELETE_CUSTOMER, payload: id});

export const CustomersReducer = (state = initialState, action) => {
  switch (action.type) {

    case ActionType.LOADED_CUSTOMERS:
      return {
        ...state, listCustomers: action.payload.customers, showLoading: false
      };

    case ActionType.ADD_CUSTOMER:
      let newCustomers = state.listCustomers.concat([]);
      newCustomers.push(action.payload.customer);
      return {
        ...state, listCustomers: newCustomers
      };

    case ActionType.EDIT_CUSTOMER:
      let editCustomers = state.listCustomers.concat([]);
      let index = editCustomers.findIndex(item => item.id === action.payload.customer.id);
      editCustomers.splice(index, 1, action.payload.customer);
      return {
        ...state, listCustomers: editCustomers
      };

    case ActionType.DELETE_CUSTOMER:
      let newCustomersList = state.listCustomers.concat([]);
      let index1 = newCustomersList.findIndex(item => item.id === action.payload.id);
      newCustomersList.splice(index1, 1);
      return {
        ...state, listCustomers: newCustomersList
      };

    default:
      return state;
  }
};