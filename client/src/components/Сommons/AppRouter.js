import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {CustomersScreen} from "../Customers/CustomersScreen";
import LocationsScreen from "../Locations/LocationsScreen";
import {TripsScreen} from "../Trips/TripsScreen";
import Alert from "./Alert";
import {Menu} from "./Menu";

export class AppRouter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
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
              text={this.props.messages.message}
              type={this.props.messages.type}
              hideAfter={4}
              onHide={() => this.setState({message: null})}
              delMessage={this.props.delMessage}
          /> : null}
          <Switch>
            <Route path="/trips" render={() => <TripsScreen
              trips={this.props.trips}
              getTrips={this.props.getTrips}
              onSaveTrip={this.props.onSaveTrip}
              onDeleteTrip={this.props.onDeleteTrip}
            />}/>
            <Route path="/customers" render={() => <CustomersScreen/>}/>
            <Route path="/locations" render={() => <LocationsScreen/>}/>
          </Switch>
        </div>
      </Router>
    );
  }
}