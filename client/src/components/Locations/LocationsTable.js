import React from "react";
import Loader from "../Сommons/Loader";
import {Paging, setPageWithItems} from "../Сommons/Paging";
import queryString from "query-string";
import {Link} from "react-router-dom";
import {ConfirmationDelete} from "../Сommons/Confirmation/ConfirmationDelete";

class LocationTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageSize: 3,
      locationToDelete: null
    }
  }

  render() {
    if (this.props.locations.showLoading === false) {
      let queryParams = queryString.parse(window.location.search.substr(1));
      let currentPage = queryParams.page >= 1 ? parseInt(queryParams.page, 10) : 1;
      return (
        <div className="locations">
          {this.state.locationToDelete ? <ConfirmationDelete
            onNo={() => this.setState({locationToDelete: null})}
            onYes={() => {
              this.setState({locationToDelete: null});
              this.props.onDeleteLocation(this.state.locationToDelete.id, this.state.locationToDelete);
            }}
            item={`${this.state.locationToDelete.city} - ${this.state.locationToDelete.country}`}
          /> : null}
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
                    this.setState({locationToDelete: item})
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