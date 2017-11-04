import React from "react";
import {Link} from "react-router-dom";
import {Loader} from "../Сommons/Loader";
import {Paging, setPageWithItems} from "../Сommons/Paging";
import queryString from "query-string";
import _ from "lodash";

class TripsTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageSize: 3
    };
  };

  render() {
    if (this.props.trips.showLoading === false) {
      let trips1 = this.props.trips.listTrips;
      let trips = _.keyBy(trips1, trip => trip.id);
      let queryParams = queryString.parse(window.location.search.substr(1));
      let currentPage = queryParams.page >= 1 ? parseInt(queryParams.page, 10) : 1;
      return (
        <div className="trips">
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
            {setPageWithItems(trips, currentPage, this.state.pageSize, Object.keys(trips).length).map((item, index) =>
              <tr key={item.id}>
                <td>{item.tripName}</td>
                <td>{item.routName.map(item => `${item.country} - ${item.city}`)}</td>
                <td>{item.dateDeparture}</td>
                <td>{item.dateArrival}</td>
                <td>
                  <button className="del" onClick={() => {
                    this.props.onDeleteTrip(item.id, item.tripName)
                  }}>X
                  </button>
                  <Link className="edit" to={`/trips/${item.id}`}>Edit</Link>
                </td>
              </tr>
            )}
            </tbody>
          </table>
          <Link className="btnAddTrips" to="trips/add">Add trip</Link>
          <Paging
            urlPrefix={"/trips"}
            totalItems={Object.keys(trips)}
            currentPage={currentPage}
            pageSize={3}
          />
        </div>
      )
    } else {
      return (
        <Loader/>
      )
    }
  }
}

export default TripsTable;