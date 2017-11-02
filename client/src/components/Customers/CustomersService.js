import {getAll, update, remove, add} from "../../api/api";
import {showCustomers, addCustomer, editCustomer, deleteCustomer} from "./CustomersReducer";
import {setError, setMessage} from "../Сommons/UserMessages/MessageReducer";

export const CustomersService = {
  getCustomers: () => {
    return dispatch => {
      getAll("customers").then(customers => {
        setTimeout(() => [
          dispatch(showCustomers(customers))
        ], 1200)
      }).catch(error => dispatch(setError(error.message, "danger")));
    }
  },

  onSaveCustomer: customer => {
    return dispatch => {
      const promise = customer.id
        ? update("customers", customer.id, customer).then(customer => [
          dispatch(editCustomer(customer)), dispatch(setMessage(`${customer.firstName} - ${customer.lastName} was successfully edited.`, "success"))
        ])
        : add("customers", customer).then(customer => [
          dispatch(addCustomer(customer)), dispatch(setMessage(`${customer.firstName} - ${customer.lastName} was successfully add.`, "success"))
        ]);
      promise.catch(error=>
        dispatch(setError(error.message, "danger"))
      )
    }
  },

  onDeleteCustomer: (id, customer) =>{
    return dispatch => {
      remove("customers", id).then(id=>[
        dispatch(deleteCustomer(id)), dispatch(setMessage(`${customer.firstName} - ${customer.lastName} was successfully deleted.`, "success"))
      ]).catch(error=>dispatch(setError(error.message, "danger")));
    }
  },
};
