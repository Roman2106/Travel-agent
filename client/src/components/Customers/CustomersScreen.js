import React from "react";
import CustomersTable from "./CustomersTable";
import CustomerForm from "./CustomersForm";
import {Route, Switch, withRouter} from "react-router-dom";

export const CustomersScreen = withRouter(
  class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        customers: null
      }
    }

    render() {
      return (
        <div>
          <Switch>
            <Route exact path="/customers" render={(match) => <CustomersTable
              match={match}
              trips={this.props.trips}
              customers={this.props.customers}
              onDeleteCustomer={this.props.onDeleteCustomer}
            />}/>
            <Route path="/customers/add" render={() => <CustomerForm
              trips={this.props.trips}
              history={this.props.history}
              customers={this.props.customers}
              showMessage={this.props.showMessage}
              onSaveCustomer={this.props.onSaveCustomer}
            />}/>
            <Route path="/customers/:id" render={({match}) => <CustomerForm
              trips={this.props.trips}
              history={this.props.history}
              customers={this.props.customers}
              showMessage={this.props.showMessage}
              onSaveCustomer={this.props.onSaveCustomer}
              customer={this.props.customers.listCustomers.find(customer => customer.id === match.params.id)}
            />}/>
          </Switch>
        </div>
      )
    }
  });

// componentDidMount() {
//   getAll("customers").then(customers => {
//     getAll("trips").then(trips => {
//       this.setState({customers, trips})
//     });
//   });
// };
//
// addEdit = (customer) => {
//   const promise = customer.id ? update("customers", customer.id, customer) : add("customers", customer);
//   promise.then(customer => {
//     return getAll("customers").then(customers => {
//       this.setState({customers});
//       this.props.history.push("/customers");
//       this.props.onSuccess({
//         text: `Customer ${customer.firstName} ${customer.lastName} was successfully saved.`,
//         type: "success"
//       });
//     });
//   }).catch(error => this.props.onError({
//     text: error.message || "Unexpected error",
//     type: "danger"
//   }));
// };
//
// delSingle = (id, index) => {
//   remove("customers", id).then(customer => {
//     const arr = this.state.customers;
//     arr.splice(index, 1);
//     this.setState({
//       customers: arr
//     });
//     this.props.onSuccess({
//       text: `Customer ${customer.firstName} ${customer.lastName} was successfully deleted.`,
//       type: "success"
//     });
//   }).catch(error => this.props.onError({
//     text: error.message || "Unexpected error",
//     type: "danger"
//   }));
// };