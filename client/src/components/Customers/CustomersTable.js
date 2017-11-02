import React from "react";
import Loader from "../Сommons/Loader";
import {Link} from "react-router-dom";

class Customers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    if (this.props.customers && this.props.trips) {
      let trips = this.props.trips;
      return (
        <div className="customers">
          <table>
            <thead>
            <tr>
              <th>Имя</th>
              <th>Фамилия</th>
              <th>Путешествия</th>
              <th>Удалить / изменить</th>
            </tr>
            </thead>
            <tbody>
            {this.props.customers.listCustomers.map((customer, index, key) =>
              <tr key={customer.id}>
                <td>{customer.firstName}</td>
                <td>{customer.lastName}</td>
                <td className="withTrips">{customer.customersTripsID.map((id, index) => {
                  // console.log(trips[id]);
                  return <p key={index}>{trips[id].tripName}</p>;
                })}</td>
                <td>
                  <button className="del" onClick={() => {
                    this.props.onDeleteCustomer(customer.id, customer)
                  }}>X
                  </button>
                  <Link className="edit" to={`/customers/${customer.id}`}>Edit</Link>
                </td>
              </tr>
            )}
            </tbody>
          </table>
          <Link className="btnAddCustomer" to="customers/add">Add Customer</Link>
        </div>
      )
    } else {
      return (
        <Loader/>
      )
    }
  }
}

export default Customers;