import React from "react";
import Trips from "./Trips";
import TripsForm from "./FormForTrips";
import {Route, Switch, withRouter} from "react-router-dom";
import {getAll, add, remove, update} from "../../api/api";

export const ScreenTrips = withRouter(
  class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        trips: [],
        locations: []
      };
    };

    componentDidMount() {
      getAll("trips").then(trips => {
        getAll("locations").then(locations => {
          this.setState({trips, locations})
        });
      });
    };

    addEdit = (trip) => {
      const promise = trip.id ? update("trips", trip.id, trip) : add("trips", trip);
      promise.then(trip => {
        return getAll("trips").then(trips => {
          this.setState({trips});
          this.props.history.push("/trips");
          this.props.onSuccess({
            text: `Trip ${trip.tripName} was successfully saved.`,
            type: "success"
          });
        });
      }).catch(error => this.props.onError({
        text: error.message || "Unexpected error",
        type: "danger"
      }));
    };

    delSingle = (id, index) => {
      remove("trips", id).then(trip => {
        const arr = this.state.trips;
        arr.splice(index, 1);
        this.setState({
          trips: arr
        });
        this.props.onSuccess({
          text: `Trip ${trip.tripName} was successfully deleted.`,
          type: "success"
        });
      }).catch(error => this.props.onError({
        text: error.message || "Unexpected error",
        type: "danger"
      }));
    };

    render() {
      // console.log(this.state.trips.find(match));
      return (
        <div>
          <Switch>
            <Route
              exact path="/trips" render={() => <Trips
              trips={this.state.trips}
              delSingle={this.delSingle}
            />}/>
            <Route path="/trips/add" render={() => <TripsForm
              locations={this.state.locations}
              addEdit={this.addEdit}
            />}/>
            <Route path="/trips/:id" render={({match}) => <TripsForm
              trip={this.state.trips.find(trip => trip.id === match.params.id)}
              addEdit={this.addEdit}
              locations={this.state.locations}
            />}/>
          </Switch>
        </div>
      )
    }
  });