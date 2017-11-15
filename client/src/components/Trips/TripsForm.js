import React from "react";
import {Link} from "react-router-dom";
import {Loader} from "../Commons/Loader/Loader";
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import moment from 'moment';
import _ from "lodash";

class TripsForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tripName: this.props.trip && this.props.trip.tripName || "",
      dateDeparture: this.props.trip && moment(this.props.trip.dateDeparture) || moment(),
      dateArrival: this.props.trip && moment(this.props.trip.dateArrival) || moment(),
      tripsLocationsID: this.props.trip && this.props.trip.tripsLocationsID || []
    };
  };

  handleChangeStart = (date) => {
    this.setState({
      dateDeparture: moment(date)
    });
  };

  handleChangeEnd = (date) => {
    this.setState({
      dateArrival: moment(date)
    });
  };

  getTripsLocationsID = item => {
    let selLocationId = item.value;
    this.setState(({tripsLocationsID}) =>
      ({tripsLocationsID: [...tripsLocationsID, selLocationId]})
    );
  };

  tripsLocationsTable = (tripsLocationsID, locations) => {
    let arrLocations = Object.values(locations);
    return (
      <table className="tripsLocationsTable">
        <thead>
        <tr>
          <th>All locations in travel</th>
          <th>Delete</th>
        </tr>
        </thead>
        <tbody>
        {tripsLocationsID.map((id, index) => {
            for (let i = 0; i < arrLocations.length; i++) {
              if (id !== arrLocations[i].id) continue;
              return <tr key={id}>
                <td>{`${locations[id].country} - ${locations[id].city}`}</td>
                <td>
                  <button className="del" onClick={e => {
                    e.preventDefault();
                    let arr = tripsLocationsID;
                    arr.splice(index, 1);
                    this.setState({
                      tripsLocationsID: arr
                    })
                  }}>X
                  </button>
                </td>
              </tr>
            }
          }
        )}</tbody>
      </table>
    )
  };

  select = (locations) => {
    const arr = _.without(Object.keys(locations), ...this.state.tripsLocationsID);
    return arr.map(id => {
      return {
        label: `${locations[id].country} - ${locations[id].city}`,
        value: locations[id].id
      }
    });
  };

  render() {
    let locations = this.props.locations.listLocations;
    let tableLocations = this.tripsLocationsTable(this.state.tripsLocationsID, locations);
    if (this.props.trips.showLoading === false) {
      return (
        <div className="tripsForm">
          <form>
            <p className="tripName">
              <label htmlFor="tripName">Trip name:</label>
              <input type="text" name="tripName" id="tripName" title="tripName"
                     value={this.state.tripName}
                     onChange={e => this.setState({tripName: e.target.value})}
              />
            </p>
            <label htmlFor="routName">Route:</label>
            <Select
              placeholder={"Search"}
              options={this.select(this.props.locations.listLocations)}
              onChange={item => {
                this.getTripsLocationsID(item)
              }}
            />
            <div className="datePicker">
              <label htmlFor="dateDeparture">Date of departure:</label>
              <DatePicker
                selected={this.state.dateDeparture}
                selectsStart
                startDate={this.state.dateDeparture}
                endDate={this.state.dateArrival}
                onChange={this.handleChangeStart}
                dateFormat="DD-MM-YYYY"
              />
            </div>
            <div className="datePicker">
              <label htmlFor="dateArrival">Arrival date:</label>
              <DatePicker
                selected={this.state.dateArrival}
                selectsEnd
                startDate={this.state.dateDeparture}
                endDate={this.state.dateArrival}
                onChange={this.handleChangeEnd}
                dateFormat="DD-MM-YYYY"
              />
            </div>
          </form>
          <div className="tripsButtons">
            <Link className="save" to={this.props.returnUrl}
                  onClick={() => {
                    this.props.onSaveTrip({
                      id: this.props.trip && this.props.trip.id || null,
                      tripName: this.state.tripName,
                      tripsLocationsID: this.state.tripsLocationsID,
                      dateDeparture: this.state.dateDeparture,
                      dateArrival: this.state.dateArrival
                    })
                  }}>Save
            </Link>
            <Link className="cancel" to={this.props.returnUrl}
                  onClick={() => {
                    this.props.getTrips();
                  }}
            >Cancel</Link>
          </div>
          {tableLocations}
        </div>
      )
    } else {
      return (
        <Loader/>
      )
    }
  }
}

export default TripsForm;