import React from "react";
import Loader from "../Сommons/Loader";
import queryString from "query-string";
import {Link} from "react-router-dom";
import _ from "lodash";
import {Paging, setPageWithItems} from "../Сommons/Paging";

class Customers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageSize: 3
    }
  }

  render() {
    if (this.props.customers && this.props.trips) {
      let queryParams = queryString.parse(window.location.search.substr(1));
      let currentPage = queryParams.page >= 1 ? parseInt(queryParams.page, 10) : 1;
      let trips = this.props.trips;
      let tripsArr = Object.keys(trips).reduce((arr, key) => ([...arr, {...trips[key]}]), []);
      let customers = this.props.customers.listCustomers;
      let customersObj = _.keyBy(customers, customer => customer.id);
      console.log();
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
            {setPageWithItems(this.props.customers.listCustomers,
              currentPage,
              this.state.pageSize,
              Object.keys(customersObj).length
            ).map((customer, index, key) =>
              <tr key={customer.id}>
                <td>{customer.firstName}</td>
                <td>{customer.lastName}</td>
                <td className="withTrips">{customer.customersTripsID.map((id, index) => {
                  for (let i = 0; i < tripsArr.length; i++) {
                    if (id !== tripsArr[i].id) continue;
                    return <p key={index}>{trips[id].tripName}</p>
                  }
                })}</td>
                <td>
                  <button className="del" onClick={() => {
                    this.props.onDeleteCustomer(customer.id, customer)
                  }}>X
                  </button>
                  <Link className="edit" to={`/customers/${customer.id}?page=${String(currentPage)}`}>Edit</Link>
                </td>
              </tr>
            )}
            </tbody>
          </table>
          <Link className="btnAddCustomer" to="customers/add">Add Customer</Link>
          <Paging
            urlPrefix={"customers"}
            totalItems={Object.keys(customersObj)}
            currentPage={currentPage}
            pageSize={this.state.pageSize}
          />
        </div>
      )
    }
    return <Loader/>
  }
}

export default Customers;