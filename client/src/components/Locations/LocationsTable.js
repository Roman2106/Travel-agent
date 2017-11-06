import React from "react";
import Loader from "../Сommons/Loader";
import {Paging, setPageWithItems} from "../Сommons/Paging";
import queryString from "query-string";
import {Link} from "react-router-dom";

class LocationTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageSize: 3
    }
  }

  render() {
    if (this.props.locations.showLoading === false) {
      let queryParams = queryString.parse(window.location.search.substr(1));
      let currentPage = queryParams.page >= 1 ? parseInt(queryParams.page, 10) : 1;
      // console.log(this.props.locations.listLocations);
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
            {setPageWithItems(this.props.locations.listLocations,
              currentPage,
              this.state.pageSize,
              Object.keys(this.props.locations.listLocations).length
            ).map((item, index, key) =>
              <tr key={item.id}>
                <td>{item.country}</td>
                <td>{item.city}</td>
                <td>
                  <button className="del" onClick={() => {
                    this.props.onDeleteLocation(item.id, item)
                  }}>X
                  </button>
                  <Link className="edit" to={`/locations/${item.id}?page=${String(currentPage)}`}>Edit</Link>
                </td>
              </tr>
            )}
            </tbody>
          </table>
          <Link className="btnAddTrips" to="/locations/add">Add location</Link>
          <Paging
          urlPrefix={"/locations"}
          totalItems={Object.keys(this.props.locations.listLocations)}
          currentPage={currentPage}
          pageSize={3}
          />
        </div>
      )
    }
    return <Loader/>
  }
}

export default LocationTable;