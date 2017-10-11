import React from "react";
import {Link} from "react-router-dom";
import Loader from "../Сommons/Loader";

class Trips extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trips: null
    };
  };

  render() {
    if (this.props.trips) {
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
            {this.props.trips.map((trip, index, key) =>
              <tr key={trip.id}>
                <td>{trip.tripName}</td>
                <td>{trip.routName.map(item => `${item.country} - ${item.city}`)}</td>
                <td>{trip.dateDeparture}</td>
                <td>{trip.dateArrival}</td>
                <td>
                  <button className="del" onClick={() => {
                    this.props.delSingle(trip.id, index)
                  }}>X</button>
                  <Link className="edit" to={`/trips/${trip.id}`}>Изменить</Link>
                </td>
              </tr>
            )}
            </tbody>
          </table>
          <Link className="btnAddTrips" to = "/trips/add">Добавить маршрут</Link>
        </div>
      )
    } else {
      return (
        <Loader/>
      )
    }
  }
}

export default Trips;