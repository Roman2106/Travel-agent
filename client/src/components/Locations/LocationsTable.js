import React from "react";
import Loader from "../Сommons/Loader";
import {Link} from "react-router-dom";

class LocationTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      country: "",
      city: ""
    }
  }

  render() {
    if (this.props.locations.showLoading === false) {
      return (
        <div className="locations">
          <table>
            <thead>
            <tr>
              <th>Страна</th>
              <th>Город</th>
              <th>Удалить</th>
            </tr>
            </thead>
            <tbody>
            {this.props.locations.listLocations.map((item, index, key) =>
              <tr key={item.id}>
                <td>{item.country}</td>
                <td>{item.city}</td>
                <td>
                  <button className="del" onClick={() => {
                    this.props.onDeleteLocation(item.id, item)
                  }}>X
                  </button>
                  <Link className="edit" to={`/locations/${item.id}`}>Edit</Link>
                </td>
              </tr>
            )}
            </tbody>
          </table>
          <Link className="btnAddTrips" to="/locations/add">Add location</Link>
        </div>
      )
    }
      return <Loader/>
  }
}
export default LocationTable;