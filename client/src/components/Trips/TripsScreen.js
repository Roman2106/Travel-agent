import React from "react";
import TripsTable from "./TripsTable";
import TripsForm from "./TripsForm";
import queryString from "query-string";
import {Route, Switch, withRouter} from "react-router-dom";

export const TripsScreen = withRouter(
  class extends React.Component {

    render() {
      let queryParams = queryString.parse(this.props.history.location.search.substr(1));
      let currentPage = queryParams.page >= 1 ? parseInt(queryParams.page, 10) : 1;
      return (
        <Switch>
          <Route
            exact path="/trips" render={() => <TripsTable
            trips={this.props.trips}
            currentPage={currentPage}
            locations={this.props.locations}
            onDeleteTrip={this.props.onDeleteTrip}
          />}/>
          <Route path="/trips/add" render={() => <TripsForm
            trips={this.props.trips}
            currentPage={currentPage}
            getTrips={this.props.getTrips}
            locations={this.props.locations}
            onSaveTrip={this.props.onSaveTrip}
            showMessage={this.props.showMessage}
          />}/>
          <Route path="/trips/:id" render={({match}) => <TripsForm
            trips={this.props.trips}
            currentPage={currentPage}
            getTrips={this.props.getTrips}
            locations={this.props.locations}
            onSaveTrip={this.props.onSaveTrip}
            showMessage={this.props.showMessage}
            trip={Object.values(this.props.trips.listTrips).find(item => item.id === match.params.id)}
          />}/>
        </Switch>
      )
    }
  });