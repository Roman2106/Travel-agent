import React from "react";
import LocationTable from "./LocationsTable"
import LocationForm from "./LocationForm";
import queryString from "query-string";
import {Route, Switch, withRouter} from "react-router-dom";

export const LocationsScreen = withRouter(
  class extends React.Component {

    render() {
      let queryParams = queryString.parse(this.props.history.location.search.substr(1));
      let currentPage = queryParams.page >= 1 ? parseInt(queryParams.page, 10) : 1;
      return (
        <Switch>
          <Route exact path="/locations" render={() => <LocationTable
            currentPage={currentPage}
            locations={this.props.locations}
            onDeleteLocation={this.props.onDeleteLocation}
          />}/>
          <Route path="/locations/add" render={() => <LocationForm
            currentPage={currentPage}
            onSaveLocation={this.props.onSaveLocation}
          />}/>
          <Route path="/locations/:id" render={({match}) => <LocationForm
            currentPage={currentPage}
            onSaveLocation={this.props.onSaveLocation}
            location={Object.values(this.props.locations.listLocations).find(location => location.id === match.params.id)}
          />}/>
        </Switch>
      )
    }
  });