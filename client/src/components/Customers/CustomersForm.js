import React from "react";
import queryString from "query-string";
import {Link} from "react-router-dom";
import Select from 'react-styled-select'

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
    let selTripId = JSON.parse(e).id;
    let currentTripID = this.state.customersTripsID;
    let bool = true;
      for (let i = 0; i < currentTripID.length; i++) {
        if (currentTripID[i] === selTripId) {
          this.setState({disabled: true});
          this.props.showMessage("Such a trip already exists in the customer", "danger");
          bool = false;
        }
      }
    if (bool) {
      currentTripID.push(selTripId);
      this.setState({
        customersTripsID: currentTripID,
        disabled: true
      });
    }
  };

  customerTripsTable = (customersTripsID, trips, tripsArr) => {
    return (
      <table>
        <thead>
        <tr>
          <th>Все путешествия клиента</th>
          <th>Удалить</th>
        </tr>
        </thead>
        <tbody>
        {customersTripsID.map((id, index) => {
          for (let i = 0; i < tripsArr.length; i++) {
            if (id !== tripsArr[i].id) continue;
            return <tr key={index}>
              <td>{`${trips[id].tripName} - ${trips[id].dateDeparture}`}</td>
              <td>
                <button className="del" onClick={e => {
                  e.preventDefault();
                  let arr = customersTripsID;
                  arr.splice(index, 1);
                  this.setState({
                    customersTripsID: arr
                  })
                }}>X
                </button>
              </td>
            </tr>
          }
        })}
        </tbody>
      </table>
    )
  };

  select = (tripsArr) => {
    return tripsArr.map(item => {
      return {label: `${item.tripName} - ${item.dateDeparture}`, value:JSON.stringify(item)};
    })
  };

  render() {
    let queryParams = queryString.parse(window.location.search.substr(1));
    let currentPage = queryParams.page >= 1 ? parseInt(queryParams.page, 10) : 1;
    let trips = this.props.trips.listTrips;
    let tripsArr = Object.keys(trips).reduce((arr, key) => ([...arr, {...trips[key]}]), []);
    let tableTrips = this.customerTripsTable(this.state.customersTripsID, trips, tripsArr);
    let options = this.select(tripsArr);
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
              <Select
                className={"dark-theme"}
                options={options}
                disabled={this.state.disabled}
                onChange={ e => {
                  this.getCustomersTripsID(e)
                }}
              />
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
        {tableTrips}
      </div>
    )
  }
}

export default CustomerForm;