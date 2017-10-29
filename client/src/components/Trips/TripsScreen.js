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

    componentDidMount() {
      this.props.getTrips();
    }

    render() {
      // console.log(this.props.delMessage);
      return (
        <Switch>
          <Route
            exact path="/trips" render={() => <TripsTable
            trips={this.props.trips}
            onDeleteTrip={this.props.onDeleteTrip}
          />}/>
          <Route path="/trips/add" render={() => <TripsForm
            onSaveTrip={this.props.onSaveTrip}
            history={this.props.history}
          />}/>
          <Route path="/trips/:id" render={({match}) => <TripsForm
            trip={this.props.trips.listTrips.find(trip => trip.id === match.params.id)}
            onSaveTrip={this.props.onSaveTrip}
            history={this.props.history}
          />}/>
        </Switch>
      )
    }
  });

// console.log(trips);
// if (trips.viewType === ViewType.TRIPS) {
//   return (
//     <TripsTable
//       trips={trips}
//       onAdd={showForm}
//       onEdit={showForm}
//       // onDelete={deleteTrip}
//     />
//   );
// } else {
//   return (
//     <TripsForm
//       // trip={tripId ? trips.find(trip => trip.id === tripId) : null}
//       // onAdd = {trip => trip.id ? editTrip(trip) : addTrip(trip)}
//       // locations={locations}
//       onCancel={showTrips}
//     />
//   );
// }

// export const ScreenTrips = withRouter(
//   class extends React.Component {
//     constructor(props) {
//       super(props);
//       this.state = {
//         trips: [],
//         locations: []
//       };
//     };
//
//     componentDidMount() {
//       getAll("trips").then(trips => {
//         getAll("locations").then(locations => {
//           this.setState({trips, locations})
//         });
//       });
//     };
//
//     addEdit = (trip) => {
//       const promise = trip.id ? update("trips", trip.id, trip) : add("trips", trip);
//       promise.then(trip => {
//         return getAll("trips").then(trips => {
//           this.setState({trips});
//           this.props.history.push("/trips");
//           this.props.onSuccess({
//             text: `Trip ${trip.tripName} was successfully saved.`,
//             type: "success"
//           });
//         });
//       }).catch(error => this.props.onError({
//         text: error.message || "Unexpected error",
//         type: "danger"
//       }));
//     };
//
//     delSingle = (id, index) => {
//       remove("trips", id).then(trip => {
//         const arr = this.state.trips;
//         arr.splice(index, 1);
//         this.setState({
//           trips: arr
//         });
//         this.props.onSuccess({
//           text: `Trip ${trip.tripName} was successfully deleted.`,
//           type: "success"
//         });
//       }).catch(error => this.props.onError({
//         text: error.message || "Unexpected error",
//         type: "danger"
//       }));
//     };
//
//     render() {
//       return (
//         <div>
//           <Switch>
//             <Route
//               exact path="/trips" render={() => <Trips
//               trips={this.state.trips}
//               delSingle={this.delSingle}
//             />}/>
//             <Route path="/trips/add" render={() => <TripsForm
//               history={this.props.history}
//               locations={this.state.locations}
//               addEdit={this.addEdit}
//             />}/>
//             <Route path="/trips/:id" render={({match}) => <TripsForm
//               trip={this.state.trips.find(trip => trip.id === match.params.id)}
//               addEdit={this.addEdit}
//               locations={this.state.locations}
//             />}/>
//           </Switch>
//         </div>
//       )
//     }
//   });