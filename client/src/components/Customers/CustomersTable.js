import React from "react";
import Loader from "../Сommons/Loader";
import {Link} from "react-router-dom";

class Customers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customers: null
    }
  }

  render() {
    if (this.props.customers) {
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
            {this.props.customers.map((customer, index, key) =>
              <tr key={customer.id}>
                <td>{customer.firstName}</td>
                <td>{customer.lastName}</td>
                <td className = "withTrips">{customer.customersTrips.map((item, index) =>
                  <p key={index}>{`${item.tripName}. Дата отправления: ${item.dateDeparture}`}</p>
                )}</td>
                <td>
                  <button className="del" onClick={() => {
                    this.props.delSingle(customer.id, index)
                  }}>X</button>
                  <Link className="edit" to={`/customers/${customer.id}`}>Изменить</Link>
                </td>
              </tr>
            )}
            </tbody>
          </table>
          <Link className="btnAddCustomer" to="customers/add">Добавить клиента</Link>
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