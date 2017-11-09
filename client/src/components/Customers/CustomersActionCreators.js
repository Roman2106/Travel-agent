import {getAll, update, remove, add} from "../../api/api";
import {setError, setMessage} from "../Сommons/UserMessages/MessageReducer";
import {batchActions} from 'redux-batched-actions';
import {ActionType} from "./CustomersConst";

export const showCustomers = customers => ({type: ActionType.LOADED_CUSTOMERS, payload: {customers}});
export const addCustomer = customer => ({type: ActionType.ADD_CUSTOMER, payload: {customer}});
export const editCustomer = customer => ({type: ActionType.EDIT_CUSTOMER, payload: {customer}});
export const deleteCustomer = (id, customer) => ({type: ActionType.DELETE_CUSTOMER, payload: id});

export const CustomersActionCreators = {
  getCustomers: () => {
    return dispatch => {
      getAll("customers").then(customers => {
          dispatch(showCustomers(customers))
      }).catch(error => dispatch(setError(error.message, "danger")));
    }
  },

  onSaveCustomer: customer => {
    return dispatch => {
      const promise = customer.id
        ? update("customers", customer.id, customer).then(customer => {
          dispatch(batchActions([editCustomer(customer), setMessage(`${customer.firstName} - ${customer.lastName} was successfully edited.`, "success")]))
        })
        : add("customers", customer).then(customer => {
          dispatch(batchActions([addCustomer(customer), setMessage(`${customer.firstName} - ${customer.lastName} was successfully add.`, "success")]))
        });
      promise.catch(error=>
        dispatch(setError(error.message, "danger"))
      )
    }
  },

  onDeleteCustomer: (id, customer) =>{
    return dispatch => {
      remove("customers", id).then(id=>
        dispatch(batchActions([deleteCustomer(id), setMessage(`${customer.firstName} - ${customer.lastName} was successfully deleted.`, "success")]))
      ).catch(error=>dispatch(setError(error.message, "danger")));
    }
  },
};
