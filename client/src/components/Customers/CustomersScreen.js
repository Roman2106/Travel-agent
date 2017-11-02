import React from "react";
import CustomersTable from "./CustomersTable";
import CustomerForm from "./CustomersForm";
import {Route, Switch, withRouter} from "react-router-dom";
import _ from "lodash";

export const CustomersScreen = withRouter(
  class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {}
    }

    render() {
      let trips = this.props.trips.listTrips;
      let tripsWithKeys = _.keyBy(trips, trip => trip.id);
      return (
        <div>
          <Switch>
            <Route exact path="/customers" render={() => <CustomersTable
              trips={tripsWithKeys}
              customers={this.props.customers}
              getTrips = {this.props.getTrips}
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