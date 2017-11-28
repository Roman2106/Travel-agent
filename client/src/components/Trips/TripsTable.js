import React from "react";
import {Link} from "react-router-dom";
import {Loader} from "../Commons/Loader/Loader";
import {Paging, setPageWithItems} from "../Commons/Paging/Paging";
import {ConfirmationDelete} from "../Commons/Confirmation/ConfirmationDelete";
import moment from 'moment';

class TripsTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageSize: 3,
      tripToDelete: null,
      tripNameClass: "thTripName",
      dateOfDepartureClass: "thDateOfDeparture",
      arrivalDateClass: "thArivalDate"
    };
  };

  render() {
    if (this.props.trips.showLoading === false && this.props.locations) {
      const locations = this.props.locations.listLocations;
      return (
        <div className="trips">
          {this.state.tripToDelete ? <ConfirmationDelete
            onNo={() => this.setState({tripToDelete: null})}
            onYes={() => {
              this.setState({tripToDelete: null});
              this.props.onDeleteTrip(this.state.tripToDelete.id, this.state.tripToDelete.tripName);
            }}
            item={`${this.state.tripToDelete.tripName} - ${moment(this.state.tripToDelete.dateDeparture).format("DD-MM-YYYY")}`}
          /> : null}
          <table>
            <thead>
            <tr>
              <th className={this.state.tripNameClass} onClick={() => {
                this.props.onSortChangeTrips("tripName");
                this.setState({
                  tripNameClass: `thTripName ${this.props.trips.sortOrder}`,
                  dateOfDepartureClass: "thDateOfDeparture",
                  arrivalDateClass: "thArivalDate"
                });
              }}>Trip name
              </th>
              <th>Route</th>
              <th className={this.state.dateOfDepartureClass} onClick={() => {
                this.props.onSortChangeTrips("dateDeparture");
                this.setState({
                  dateOfDepartureClass: `thDateOfDeparture ${this.props.trips.sortOrder}`,
                  tripNameClass: "thTripName",
                  arrivalDateClass: "thArivalDate"
                });
              }}>Date of departure
              </th>
              <th className={this.state.arrivalDateClass} onClick={() => {
                this.props.onSortChangeTrips("dateArrival");
                this.setState({
                  arrivalDateClass: `thArivalDate ${this.props.trips.sortOrder}`,
                  tripNameClass: "thTripName",
                  dateOfDepartureClass: "thDateOfDeparture",
                });
              }}>Arrival date
              </th>
              <th>Edit / Del</th>
            </tr>
            </thead>
            <tbody>
            {setPageWithItems(this.props.trips.listTrips,
              this.props.currentPage,
              this.state.pageSize,
              Object.keys(this.props.trips.listTrips).length).map((item, index) =>
              <tr key={item.id} className={item.className} onAnimationEnd={() => this.props.onRemoveClass(item.id)}>
                <td>{item.tripName}</td>
                <td>
                  <ul className="containerliInTr">{item.tripsLocationsID.map((id, index) => {
                    for (let i = 0; i < Object.values(locations).length; i++) {
                      if (id !== Object.values(locations)[i].id) continue;
                      return (<li className="liInTr"
                                  key={index}>{`${locations[id].city} - ${locations[id].country}`}</li>)
                    }
                  })}</ul>
                </td>
                <td>{moment(item.dateDeparture).format("DD-MM-YYYY")}</td>
                <td>{moment(item.dateArrival).format("DD-MM-YYYY")}</td>
                <td className="tdForButton">
                  <Link className="edit"
                        to={`/trips/${item.id}?page=${this.props.currentPage}`}>Edit</Link>
                  <a className="del" onClick={() => {
                    this.setState({tripToDelete: item})
                  }}>X
                  </a>
                </td>
              </tr>
            )}
            </tbody>
          </table>
          <Link className="btnAdd"
                to={`trips/add?page=${this.props.currentPage}`}>Add
            trip</Link>
          <Paging
            urlPrefix={"/trips"}
            totalItems={Object.keys(this.props.trips.listTrips)}
            currentPage={this.props.currentPage}
            pageSize={this.state.pageSize}
          />
        </div>
      )
    }
    return <Loader/>
  }
}

export default TripsTable;