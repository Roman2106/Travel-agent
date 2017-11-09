import React from "react";
import {Link} from "react-router-dom";
import {Loader} from "../Сommons/Loader";
import queryString from "query-string";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-styled-select';
import moment from 'moment';

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


  getTripsLocationsID = e => {
    let selLocationID = JSON.parse(e).id;
    let currentLocationID = this.state.tripsLocationsID;
    let bool = true;
    for (let i = 0; i < currentLocationID.length; i++) {
      if (currentLocationID[i] === selLocationID) {
        this.setState({disabled: true});
        this.props.showMessage("Such a location already exists in the trip", "danger");
        bool = false;
      }
    }
    if (bool) {
      currentLocationID.push(selLocationID);
      this.setState({
        tripsLocationsID: currentLocationID,
        disabled: true
      });
    }
  };

  tripsLocationsTable = (tripsLocationsID, locations, locationsArr) => {
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
            for (let i = 0; i < locationsArr.length; i++) {
              if (id !== locationsArr[i].id) continue;
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

  select = (locationsArr) => {
    return locationsArr.map(item => {
      return {label: `${item.country} - ${item.city}`, value:JSON.stringify(item)};
    })
  };

  render() {
    let queryParams = queryString.parse(window.location.search.substr(1));
    let currentPage = queryParams.page >= 1 ? parseInt(queryParams.page, 10) : 1;
    let locations = this.props.locations.listLocations;
    let locationsArr = Object.keys(locations).reduce((arr, key) => ([...arr, {...locations[key]}]), []);
    let tableLocations = this.tripsLocationsTable(this.state.tripsLocationsID, locations, locationsArr);
    let options = this.select(locationsArr);
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
                className={"dark-theme"}
                options={options}
                disabled={this.state.disabled}
                onChange={ e => {
                  this.getTripsLocationsID(e)
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
            <button className="addEditTrips" onClick={() => {
              this.props.history.push(`/trips?page=${String(currentPage)}`);
              this.props.onSaveTrip({
                id: this.props.trip && this.props.trip.id || null,
                tripName: this.state.tripName,
                tripsLocationsID: this.state.tripsLocationsID,
                dateDeparture: this.state.dateDeparture,
                dateArrival: this.state.dateArrival
              })
            }}>Save
            </button>
            <Link className="cancel" to={`/trips?page=${String(currentPage)}`}
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