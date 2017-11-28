import React from "react";
import {Router, Route, Switch} from "react-router-dom";
import {CustomersScreen} from "../Customers/CustomersScreen";
import {LocationsScreen} from "../Locations/LocationsScreen";
import {TripsScreen} from "../Trips/TripsScreen";
import Alert from "./Alerts/Alert";
import {Menu} from "./Menu/Menu";
import {StartPage} from "../StartPage/StartPage";
import {Login} from "../Login/LoginContainer";
import history from "../../history";
import {EnsureLoggedIn} from "./EnsureLoggedIn";


export class AppRouter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Router history={history}>
        <div className="wrapper">
          <Switch>
            <Route exact path="/login" render={() => <Login/>}/>
            <Route path="/" render={() => (
              <EnsureLoggedIn
                getTrips={this.props.getTrips}
                getLocations={this.props.getLocations}
                getCustomers={this.props.getCustomers}
                delMessage={this.props.delMessage}
              >
                {this.props.messages ? <Alert
                  hideAfter={3}
                  type={this.props.messages.type}
                  text={this.props.messages.message}
                  delMessage={this.props.delMessage}
                  onHide={() => this.setState({message: null})}
                /> : null}
                <Route path="/" render={() =>
                  <Menu items={[
                    {id: "trips", title: "Trips", key: "trips"},
                    {id: "customers", title: "Customers", key: "customers"},
                    {id: "locations", title: "Locations", key: "locations"}
                  ]}/>}/>
                <Route exact path="/" component={StartPage}/>
                <Route path="/trips" render={() => <TripsScreen
                  trips={this.props.trips}
                  getTrips={this.props.getTrips}
                  locations={this.props.locations}
                  onSaveTrip={this.props.onSaveTrip}
                  showMessage={this.props.showMessage}
                  onDeleteTrip={this.props.onDeleteTrip}
                  onRemoveClass={this.props.onRemoveClass}
                  onSortChangeTrips={this.props.onSortChangeTrips}
                />}/>
                <Route path="/customers" render={() => <CustomersScreen
                  trips={this.props.trips}
                  getTrips={this.props.getTrips}
                  customers={this.props.customers}
                  showMessage={this.props.showMessage}
                  getCustomers={this.props.getCustomers}
                  onSaveCustomer={this.props.onSaveCustomer}
                  onDeleteCustomer={this.props.onDeleteCustomer}
                  onRemoveClassCustomer={this.props.onRemoveClassCustomer}
                  onChangeSortOrderCustomers={this.props.onChangeSortOrderCustomers}
                />}/>
                <Route path="/locations" render={() => <LocationsScreen
                  locations={this.props.locations}
                  getLocations={this.props.getLocations}
                  onSaveLocation={this.props.onSaveLocation}
                  onDeleteLocation={this.props.onDeleteLocation}
                  onRemoveClassLocation={this.props.onRemoveClassLocation}
                  onChangeSortOrderLocations={this.props.onChangeSortOrderLocations}
                />}/>
              </EnsureLoggedIn>
            )}/>
          </Switch>
        </div>
      </Router>
    );
  }
}