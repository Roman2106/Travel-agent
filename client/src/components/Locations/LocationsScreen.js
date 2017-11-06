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

    render() {
      let locations = this.props.locations.listLocations;
      let locationsArr = Object.keys(locations).reduce((arr, key) => ([...arr, {...locations[key]}]), []);
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
            location={locationsArr.find(location => location.id === match.params.id)}
            onSaveLocation={this.props.onSaveLocation}
            history={this.props.history}
          />}/>
        </Switch>
      )
    }
  });