import React from "react";
import queryString from "query-string";
import {Link} from "react-router-dom";

class CustomerForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: this.props.customer && this.props.customer.firstName || "",
      lastName: this.props.customer && this.props.customer.lastName || "",
      customersTripsID: this.props.customer && this.props.customer.customersTripsID || [],
      disabled: false
    }
  }

  getCustomersTripsID = (e) => {
    let selTripId = JSON.parse(e.target.options[e.target.selectedIndex].value).id;
    let currentTripID = this.state.customersTripsID;
    currentTripID.push(selTripId);
    this.setState({customersTripsID: currentTripID});
  };

  render() {
    let queryParams = queryString.parse(window.location.search.substr(1));
    let currentPage = queryParams.page >= 1 ? parseInt(queryParams.page, 10) : 1;
    let trips = this.props.trips.listTrips;
    return (
      <div className="customersForm">
        <form>
          <p>
            <label htmlFor="firstName">Введите имя:</label>
            <input type="text" name="firstName" id="firstName" title="firstName" required
                   onChange={e => this.setState({firstName: e.target.value})}
                   value={this.state.firstName}
            />
          </p>
          <p>
            <label htmlFor="lastName">Введите фамилию:</label>
            <input type="text" name="lastName" id="lastName" title="lastName" required
                   onChange={e => this.setState({lastName: e.target.value})}
                   value={this.state.lastName}
            />
          </p>
          <p>
            <label htmlFor="customersTrips">Выберите путешествие:</label>
            <select name="customersTrips" id="customersTrips" onChange={e => {
              this.getCustomersTripsID(e);
            }}>
              <option disabled={this.state.disabled}>Добавить путешествие</option>
              {Object.keys(trips).map(item =>
                <option key={trips[item].id} value={JSON.stringify(trips[item])}>
                  {`${trips[item].tripName}. Date departure: ${trips[item].dateDeparture}.`}
                </option>
              )}
            </select>
          </p>
        </form>
        <div className="customersButtons">
          <button className="addEditCustomer" onClick={() => {
            this.props.history.push(`/customers?page=${String(currentPage)}`);
            this.props.onSaveCustomer({
              id: this.props.customer && this.props.customer.id || null,
              firstName: this.state.firstName,
              lastName: this.state.lastName,
              customersTripsID: this.state.customersTripsID
            })
          }}>Save
          </button>
          <Link className="cancel" to={`/customers?page=${String(currentPage)}`}>Cancel</Link>
        </div>
      </div>
    )
  }
}

export default CustomerForm;