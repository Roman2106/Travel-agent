import React from "react";
import Locations from "./Locations"
import {getAll, add, remove} from "../../api/api";

class WrapperLocations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: []
    }
  }

  componentDidMount() {
    getAll("locations").then(locations => {
      this.setState({
        locations
      });
    });
  }

  delSingle = (id, index) => {
    remove("locations", id).then(location => {
      const arr = this.state.locations;
      arr.splice(index, 1);
      this.setState({
        locations: arr
      });
      this.props.onSuccess({
        text: `location ${location.country} ${location.city} was successfully deleted.`,
        type: "success"
      });
    }).catch(error => this.props.onError({
      text: error.message || "Unexpected error",
      type: "danger"
    }));
  };

  onAdd = (location) =>{
    add("locations", location).then(location=>{
      getAll("locations").then(locations => {
        this.setState({locations});
        this.props.onSuccess({
          text: `Location ${location.country} ${location.city} was successfully saved.`,
          type: "success"
        });
      })
    }).catch(error => this.props.onError({
      text: error.message || "Unexpected error",
      type: "danger"
    }));
  };

  render() {
    return (
      <Locations
        locations = {this.state.locations}
        delSingle={this.delSingle}
        onAdd={this.onAdd}
      />
    )
  }
}
export default WrapperLocations;