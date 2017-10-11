import React from "react";
import Customers from "./Customers";
import CustomerForm from "./FormForCustomers";
import {getAll, add, remove, update, getById} from "../../api/api";
import {Route, Switch, withRouter} from "react-router-dom";

export const ScreenCustomers = withRouter(
  class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        customers: [],
        trips: []
      }
    }

    componentDidMount() {
      getAll("customers").then(customers => {
        getAll("trips").then(trips => {
          this.setState({customers, trips})
        });
      });
    };

    addEdit = (customer) => {
      const promise = customer.id ? update("customers", customer.id, customer) : add("customers", customer);
      // console.log(customer.id);
      promise.then(customer => {
        return getAll("customers").then(customers => {
          this.setState({customers});
          this.props.history.push("/customers");
          this.props.onSuccess({
            text: `Customer ${customer.firstName} ${customer.lastName} was successfully saved.`,
            type: "success"
          });
        });
      }).catch(error => this.props.onError({
        text: error.message || "Unexpected error",
        type: "danger"
      }));
    };

    delSingle = (id, index) => {
      remove("customers", id).then(customer => {
        const arr = this.state.customers;
        arr.splice(index, 1);
        this.setState({
          customers: arr
        });
        this.props.onSuccess({
          text: `Customer ${customer.firstName} ${customer.lastName} was successfully deleted.`,
          type: "success"
        });
      }).catch(error => this.props.onError({
        text: error.message || "Unexpected error",
        type: "danger"
      }));
    };

    render() {
      // console.log(this.state.customers.id);
      return (
        <div>
          <Switch>
            <Route exact path="/customers" render={() => <Customers
              customers={this.state.customers}
              delSingle={this.delSingle}
            />}/>
            <Route path="/customers/add" render={() => <CustomerForm
              addEdit={this.addEdit}
              trips={this.state.trips}
            />}/>
            <Route path="/customers/:id" render={({match})=><CustomerForm
              customer={this.state.customers.find(customer => customer.id === match.params.id)}
              addEdit={this.addEdit}
              trips={this.state.trips}
              />}/>
          </Switch>
        </div>
      )
    }
  });