import React from "react";
import {Link} from "react-router-dom";
import Select from 'react-select';
import moment from 'moment';
import 'react-select/dist/react-select.css';
import _ from "lodash";

class CustomerForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: this.props.customer && this.props.customer.firstName || "",
      lastName: this.props.customer && this.props.customer.lastName || "",
      customersTripsID: this.props.customer && this.props.customer.customersTripsID || [],
      disabled: false,
      selId: ""
    }
  }

  getCustomersTripsID = (item) => {
    let selTripId = item.value;
    console.log(item.value);
    this.setState(({customersTripsID}) =>
      ({customersTripsID: [...customersTripsID, selTripId], disabled: true})
    );
  };

  customerTripsTable = (customersTripsID, trips) => {
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
          for (let i = 0; i < Object.values(trips).length; i++) {
            if (id !== Object.values(trips)[i].id) continue;
            return <tr key={index}>
              <td>{`${trips[id].tripName} - ${moment(trips[id].dateDeparture).format("DD-MM-YYYY")}`}</td>
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

  select = (trips) => {
    let arr = _.without(Object.keys(trips), ...this.state.customersTripsID);
    return arr.map(id => {
      return {
        label: `${trips[id].tripName} - ${moment(trips[id].dateDeparture).format("DD-MM-YYYY")}`,
        value: trips[id].id
      }
    });
  };

  render() {
    let trips = this.props.trips.listTrips;
    let tableTrips = this.customerTripsTable(this.state.customersTripsID, trips);
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
          <label htmlFor="customersTrips">Выберите путешествие:</label>
          <Select
            options={this.select(trips)}
            placeholder={"Search"}
            onChange={item => {
              this.getCustomersTripsID(item);
            }}
          />
        </form>
        <div className="customersButtons">
          <Link className="addEditCustomer"
                to={`/customers?page=${String(this.props.currentPage)}`}
                onClick={() => {
                  this.props.onSaveCustomer({
                    id: this.props.customer && this.props.customer.id || null,
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    customersTripsID: this.state.customersTripsID
                  })
                }}>Save
          </Link>
          <Link className="cancel" to={`/customers?page=${String(this.props.currentPage)}`}
                onClick={() => {
                  this.props.getCustomers();
                }}
          >Cancel</Link>
        </div>
        {tableTrips}
      </div>
    )
  }
}

export default CustomerForm;