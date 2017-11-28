import React from "react";
import Loader from "../Commons/Loader/Loader";
import {Paging, setPageWithItems} from "../Commons/Paging/Paging";
import {Link} from "react-router-dom";
import {ConfirmationDelete} from "../Commons/Confirmation/ConfirmationDelete";

class LocationTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageSize: 3,
      countryClassName: "thCountry",
      cityClassName: "thCity",
      locationToDelete: null
    }
  }

  render() {
    if (this.props.locations.showLoading === false) {
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
              <th className={this.state.countryClassName} onClick={() => {
                this.props.onChangeSortOrderLocations("country");
                this.setState({
                  countryClassName: `thCountry ${this.props.locations.sortOrder}`,
                  cityClassName: "thCity",
                })
              }}>Country
              </th>
              <th className={this.state.cityClassName} onClick={() => {
                this.props.onChangeSortOrderLocations("city");
                this.setState({
                  countryClassName: "thCountry",
                  cityClassName: `thCity ${this.props.locations.sortOrder}`,
                })
              }}>City
              </th>
              <th>Edit / Del</th>
            </tr>
            </thead>
            <tbody>
            {setPageWithItems(this.props.locations.listLocations,
              this.props.currentPage,
              this.state.pageSize,
              Object.keys(this.props.locations.listLocations).length
            ).map((item, index, key) =>
              <tr key={item.id} className={item.className}
                  onAnimationEnd={() => this.props.onRemoveClassLocation(item.id)}>
                <td>{item.country}</td>
                <td>{item.city}</td>
                <td className="tdForButton">
                  <Link className="edit" to={`/locations/${item.id}?page=${this.props.currentPage}`}>Edit</Link>
                  <a className="del" onClick={() => {
                    this.setState({locationToDelete: item})
                  }}>X
                  </a>
                </td>
              </tr>
            )}
            </tbody>
          </table>
          <Link className="btnAdd" to={`/locations/add?page=${this.props.currentPage}`}>Add location</Link>
          <Paging
            urlPrefix={"/locations"}
            totalItems={Object.keys(this.props.locations.listLocations)}
            currentPage={this.props.currentPage}
            pageSize={3}
          />
        </div>
      )
    }
    return <Loader/>
  }
}

export default LocationTable;