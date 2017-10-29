import React from "react";
import LocationTable from "./LocationsTable"
import LocationForm from "./LocationForm";
import {Route, Switch, withRouter} from "react-router-dom";

export const LocationsScreen = withRouter(
  class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {}
    }

    componentDidMount() {
      this.props.getLocations();
    }

    render() {
console.log(this.props.locations.listLocations);
      return (
        <Switch>
          <Route exact path="/locations" render={() => <LocationTable
            locations={this.props.locations}
            onDeleteLocation={this.props.onDeleteLocation}
          />}/>
          <Route path="/locations/add" render={() => <LocationForm
            onSaveLocation={this.props.onSaveLocation}
            history={this.props.history}
          />}/>
          <Route path="/locations/:id" render={({match}) => <LocationForm
            location={this.props.locations.listLocations.find(location => location.id === match.params.id)}
            onSaveLocation={this.props.onSaveLocation}
            history={this.props.history}
          />}/>
        </Switch>
      )
    }
  });


// componentDidMount() {
//   getAll("locations").then(locations => {
//     this.setState({
//       locations
//     });
//   });
// }
//
// delSingle = (id, index) => {
//   remove("locations", id).then(location => {
//     const arr = this.state.locations;
//     arr.splice(index, 1);
//     this.setState({
//       locations: arr
//     });
//     this.props.onSuccess({
//       text: `location ${location.country} ${location.city} was successfully deleted.`,
//       type: "success"
//     });
//   }).catch(error => this.props.onError({
//     text: error.message || "Unexpected error",
//     type: "danger"
//   }));
// };
//
// onAdd = (location) =>{
//   add("locations", location).then(location=>{
//     getAll("locations").then(locations => {
//       this.setState({locations});
//       this.props.onSuccess({
//         text: `Location ${location.country} ${location.city} was successfully saved.`,
//         type: "success"
//       });
//     })
//   }).catch(error => this.props.onError({
//     text: error.message || "Unexpected error",
//     type: "danger"
//   }));
// };