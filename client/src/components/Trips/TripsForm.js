import React from "react";
import {Link} from "react-router-dom";
import {Loader} from "../Сommons/Loader";
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import moment from 'moment';
import _ from "lodash";
import 'react-select/dist/react-select.css';
import "react-datepicker/dist/react-datepicker.css";

class TripsForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tripName: this.props.trip && this.props.trip.tripName || "",
      dateDeparture: this.props.trip && moment(this.props.trip.dateDeparture) || moment(),
      dateArrival: this.props.trip && moment(this.props.trip.dateArrival) || moment(),
      tripsLocationsID: this.props.trip && this.props.trip.tripsLocationsID || [],
      disabled: false
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
    console.log(item.value);
    this.setState(({tripsLocationsID}) =>
      ({tripsLocationsID: [...tripsLocationsID, selLocationId], disabled: true})
    );
  };

  tripsLocationsTable = (tripsLocationsID, locations) => {
    return (
      <table>
        <thead>
        <tr>
          <th>Все локации путешествия</th>
          <th>Удалить</th>
        </tr>
        </thead>
        <tbody>
        {tripsLocationsID.map((id, index) => {
            for (let i = 0; i < Object.values(locations).length; i++) {
              if (id !== Object.values(locations)[i].id) continue;
              return <tr key={index}>
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
    let arr = _.without(Object.keys(locations), ...this.state.tripsLocationsID);
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
            <p>
              <label htmlFor="tripName">Название тура:</label>
              <input type="text" name="tripName" id="tripName" title="tripName"
                     value={this.state.tripName}
                     onChange={e => this.setState({tripName: e.target.value})}
              />
            </p>
            <label htmlFor="routName">Маршрут:</label>
            <Select
              placeholder={"Search"}
              options={this.select(this.props.locations.listLocations)}
              onChange={item => {
                this.getTripsLocationsID(item)
              }}
            />
            <label htmlFor="dateDeparture">Дата выезда:</label>
            <DatePicker
              selected={this.state.dateDeparture}
              selectsStart
              startDate={this.state.dateDeparture}
              endDate={this.state.dateArrival}
              onChange={this.handleChangeStart}
              dateFormat="DD-MM-YYYY"
            />
            <label htmlFor="dateArrival">Дата возвращения:</label>
            <DatePicker
              selected={this.state.dateArrival}
              selectsEnd
              startDate={this.state.dateDeparture}
              endDate={this.state.dateArrival}
              onChange={this.handleChangeEnd}
              dateFormat="DD-MM-YYYY"
            />
          </form>
          <div className="tripsButtons">
            <Link className="addEditTrips" to={`/trips?page=${String(this.props.currentPage)}`}
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
            <Link className="cancel" to={`/trips?page=${String(this.props.currentPage)}`}
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