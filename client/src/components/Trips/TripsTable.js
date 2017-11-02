import React from "react";
import {Link} from "react-router-dom";
import {Loader} from "../Сommons/Loader";

class TripsTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trips: null
    };
  };

  render() {
    if (this.props.trips.showLoading === false) {
      let trips = this.props.trips.listTrips;
      // console.log(trips);
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
            {Object.keys(trips).map(item =>
              <tr key={trips[item].id}>
                <td>{trips[item].tripName}</td>
                <td>{trips[item].routName.map(item => `${item.country} - ${item.city}`)}</td>
                <td>{trips[item].dateDeparture}</td>
                <td>{trips[item].dateArrival}</td>
                <td>
                  <button className="del" onClick={() => {
                    this.props.onDeleteTrip(trips[item].id, trips[item].tripName)
                  }}>X
                  </button>
                  <Link className="edit" to={`/trips/${trips[item].id}`}>Edit</Link>
                </td>
              </tr>
            )}
            </tbody>
          </table>
          <Link className="btnAddTrips" to="trips/add">Add trip</Link>
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