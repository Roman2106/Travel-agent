import React from "react";
import {Link} from "react-router-dom";
import {Loader} from "../Сommons/Loader";
import {Paging, setPageWithItems} from "../Сommons/Paging";
import queryString from "query-string";
import {ConfirmationDelete} from "../Сommons/Confirmation/ConfirmationDelete";
import moment from 'moment';

class TripsTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageSize: 3,
      tripToDelete: null
    };
  };

  render() {
    if (this.props.trips.showLoading === false && this.props.locations) {
      let queryParams = queryString.parse(window.location.search.substr(1));
      let currentPage = queryParams.page >= 1 ? parseInt(queryParams.page, 10) : 1;
      let locations = this.props.locations.listLocations;
      let locationsArr = Object.keys(locations).reduce((arr, key) => ([...arr, {...locations[key]}]), []);
      return (
        <div className="trips">
          {this.state.tripToDelete ? <ConfirmationDelete
            onNo={() => this.setState({tripToDelete: null})}
            onYes={() => {
              this.setState({tripToDelete: null});
              this.props.onDeleteTrip(this.state.tripToDelete.id, this.state.tripToDelete.tripName);
            }}
            item={`${this.state.tripToDelete.tripName} - ${this.state.tripToDelete.dateDeparture}`}
          /> : null}
          <table>
            <thead>
            <tr>
              <th>Название тура</th>
              <th>Маршрут</th>
              <th>Дата выезда</th>
              <th>Дата возвращения</th>
              <th>Удалить / изменить</th>
            </tr>
            </thead>
            <tbody>
            {setPageWithItems(this.props.trips.listTrips,
              currentPage,
              this.state.pageSize,
              Object.keys(this.props.trips.listTrips).length).map((item, index) =>
              <tr key={item.id}>
                <td>{item.tripName}</td>
                <td>{item.tripsLocationsID.map((id, index) => {
                  for (let i = 0; i < locationsArr.length; i++) {
                    if (id !== locationsArr[i].id) continue;
                    return <p key={index}>{`${locations[id].city} - ${locations[id].country}`}</p>
                  }
                })}</td>
                <td>{moment(item.dateDeparture).format("DD-MM-YYYY")}</td>
                <td>{moment(item.dateArrival).format("DD-MM-YYYY")}</td>
                <td>
                  <button className="del" onClick={() => {
                    this.setState({tripToDelete: item})
                  }}>X
                  </button>
                  <Link className="edit" to={`/trips/${item.id}?page=${String(currentPage)}`}>Edit</Link>
                </td>
              </tr>
            )}
            </tbody>
          </table>
          <Link className="btnAddTrips" to="trips/add">Add trip</Link>
          <Paging
            urlPrefix={"/trips"}
            totalItems={Object.keys(this.props.trips.listTrips)}
            currentPage={currentPage}
            pageSize={this.state.pageSize}
          />
        </div>
      )
    }
    return <Loader/>
  }
}

export default TripsTable;