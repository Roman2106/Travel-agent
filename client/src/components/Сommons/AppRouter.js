import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {CustomersScreen} from "../Customers/CustomersScreen";
import {LocationsScreen} from "../Locations/LocationsScreen";
import {TripsScreen} from "../Trips/TripsScreen";
import Alert from "./Alert";
import {Menu} from "./Menu";

export class AppRouter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.getTrips();
    this.props.getLocations();
    this.props.getCustomers();
  }

  render() {
    return (
      <Router>
        <div className="wrapper">
          <Route path="/" render={() => <Menu items={[
            {id: "trips", title: "Trips", key: "trips"},
            {id: "customers", title: "Customers", key: "customers"},
            {id: "locations", title: "Locations", key: "locations"}
          ]}/>}/>
          {this.props.messages ? <Alert
            hideAfter={3}
            type={this.props.messages.type}
            text={this.props.messages.message}
            delMessage={this.props.delMessage}
            onHide={() => this.setState({message: null})}
          /> : null}
          <Switch>
            <Route path="/trips" render={() => <TripsScreen
              trips={this.props.trips}
              getTrips={this.props.getTrips}
              locations={this.props.locations}
              onSaveTrip={this.props.onSaveTrip}
              onDeleteTrip={this.props.onDeleteTrip}
            />}/>
            <Route path="/customers" render={() => <CustomersScreen
              trips={this.props.trips}
              customers={this.props.customers}
              showMessage={this.props.showMessage}
              getCustomers={this.props.getCustomers}
              onSaveCustomer={this.props.onSaveCustomer}
              onDeleteCustomer={this.props.onDeleteCustomer}
            />}/>
            <Route path="/locations" render={() => <LocationsScreen
              locations={this.props.locations}
              getLocations={this.props.getLocations}
              onSaveLocation={this.props.onSaveLocation}
              onDeleteLocation={this.props.onDeleteLocation}
            />}/>
          </Switch>
        </div>
      </Router>
    );
  }
}