import React from "react";
import TripsTable from "./TripsTable";
import TripsForm from "./TripsForm";
import {Route, Switch, withRouter} from "react-router-dom";

export const TripsScreen = withRouter(
  class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {};
    };

    render() {
      let trips = this.props.trips.listTrips;
      let tripsArr = Object.keys(trips).reduce((arr, key) => ([...arr, {...trips[key]}]), []);
      return (
        <Switch>
          <Route
            exact path="/trips" render={() => <TripsTable
            trips={this.props.trips}
            onDeleteTrip={this.props.onDeleteTrip}
          />}/>
          <Route path="/trips/add" render={({match}) => <TripsForm
            page={match}
            trips={this.props.trips}
            history={this.props.history}
            locations={this.props.locations}
            onSaveTrip={this.props.onSaveTrip}
          />}/>
          <Route path="/trips/:id" render={({match}) => <TripsForm
            trips={this.props.trips}
            history={this.props.history}
            locations={this.props.locations}
            onSaveTrip={this.props.onSaveTrip}
            trip={tripsArr.find(item => item.id === match.params.id)}
          />}/>
        </Switch>
      )
    }
  });