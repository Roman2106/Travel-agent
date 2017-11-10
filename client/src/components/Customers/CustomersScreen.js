import React from "react";
import CustomersTable from "./CustomersTable";
import CustomerForm from "./CustomersForm";
import {Route, Switch, withRouter} from "react-router-dom";
import queryString from "query-string";

export const CustomersScreen = withRouter(
  class extends React.Component {

    render() {
      let queryParams = queryString.parse(this.props.history.location.search.substr(1));
      let currentPage = queryParams.page >= 1 ? parseInt(queryParams.page, 10) : 1;
      return (
        <div>
          <Switch>
            <Route exact path="/customers" render={() => <CustomersTable
              trips={this.props.trips.listTrips}
              currentPage={currentPage}
              customers={this.props.customers}
              getTrips = {this.props.getTrips}
              onDeleteCustomer={this.props.onDeleteCustomer}
            />}/>
            <Route path="/customers/add" render={() => <CustomerForm
              trips={this.props.trips}
              currentPage={currentPage}
              customers={this.props.customers}
              showMessage={this.props.showMessage}
              getCustomers={this.props.getCustomers}
              onSaveCustomer={this.props.onSaveCustomer}
            />}/>
            <Route path="/customers/:id" render={({match}) => <CustomerForm
              trips={this.props.trips}
              currentPage={currentPage}
              customers={this.props.customers}
              showMessage={this.props.showMessage}
              getCustomers={this.props.getCustomers}
              onSaveCustomer={this.props.onSaveCustomer}
              customer={Object.values(this.props.customers.listCustomers).find(customer => customer.id === match.params.id)}
            />}/>
          </Switch>
        </div>
      )
    }
  });