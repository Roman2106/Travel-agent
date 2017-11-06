import React from "react";
import {Link} from "react-router-dom";
import {Loader} from "../Сommons/Loader";
import queryString from "query-string";

class TripsForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tripName: this.props.trip && this.props.trip.tripName || "",
      dateDeparture: this.props.trip && this.props.trip.dateDeparture || "",
      dateArrival: this.props.trip && this.props.trip.dateArrival || "",
      tripsLocationsID: this.props.trip && this.props.trip.tripsLocationsID || [],
      disabled: false
    };
  };

  getTripsLocationsID = e => {
    let selLocationID = JSON.parse(e.target.options[e.target.selectedIndex].value).id;
    let currentLocationID = this.state.tripsLocationsID;
    currentLocationID.push(selLocationID);
    this.setState({tripsLocationsID: currentLocationID});
  };

  render() {
    let queryParams = queryString.parse(window.location.search.substr(1));
    let currentPage = queryParams.page >= 1 ? parseInt(queryParams.page, 10) : 1;
    let locations = this.props.locations.listLocations;
    // console.log(this.state.tripsLocationsID);
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
            <p>
              <label htmlFor="routName">Маршрут:</label>
              <select name="routName" id="routName"
                      onChange={(e) => {
                        this.getTripsLocationsID(e)
                      }}>
                <option disabled={this.state.disabled}>Добавить локацию</option>
                {Object.keys(locations).map(item =>
                  <option key={locations[item].id} value={JSON.stringify(locations[item])}>{`${locations[item].country} - ${locations[item].city}`}</option>
                )}
              </select>
            </p>
            <p>
              <label htmlFor="dateDeparture">Дата выезда:</label>
              <input type="date" name="dateDeparture" id="dateDeparture" title="dateDeparture"
                     value={this.state.dateDeparture}
                     onChange={e => this.setState({dateDeparture: e.target.value})}
              />
            </p>
            <p>
              <label htmlFor="dateArrival">Дата возвращения:</label>
              <input type="date" name="dateArrival" id="dateArrival" title="dateArrival"
                     value={this.state.dateArrival}
                     onChange={e => this.setState({dateArrival: e.target.value})}
              />
            </p>
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
            <Link className="cancel" to={`/trips?page=${String(currentPage)}`}>Cancel</Link>
          </div>
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