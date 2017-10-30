import React from "react";
import {Link} from "react-router-dom";
import {Loader} from "../Сommons/Loader";

class TripsForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tripName: this.props.trip && this.props.trip.tripName || "",
      routName: this.props.trip && this.props.trip.routName || "",
      dateDeparture: this.props.trip && this.props.trip.dateDeparture || "",
      dateArrival: this.props.trip && this.props.trip.dateArrival || "",
      optionValue: this.props.trip && `${this.props.trip.routName[0].country} - ${this.props.trip.routName[0].city}` || "Выберите путешествие",
      disabled: false
    };
  };

  render() {
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
                        let selectedLocationObject = JSON.parse(e.target.options[e.target.selectedIndex].value);
                        // console.log(selectedLocationObject);
                        let selectedLocation = {
                          country: selectedLocationObject.country,
                          city: selectedLocationObject.city
                        };
                        this.setState({
                          routName: selectedLocation,
                          disabled: true
                        });
                      }}>
                <option disabled={this.state.disabled} value={this.state.optionValue}>{this.state.optionValue}</option>
                {this.props.locations.listLocations.map((item, index, arr, key) =>
                  <option key={item.id} value={JSON.stringify(item)}>{`${item.country} - ${item.city}`}</option>
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
              this.props.history.push("/trips");
              this.props.onSaveTrip({
                id: this.props.trip && this.props.trip.id || null,
                tripName: this.state.tripName,
                routName: this.state.routName,
                dateDeparture: this.state.dateDeparture,
                dateArrival: this.state.dateArrival
              })
            }}>Save
            </button>
            <Link className="cancel" to="/trips">Cancel</Link>
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