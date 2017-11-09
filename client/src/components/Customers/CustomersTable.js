import React from "react";
import Loader from "../Сommons/Loader";
import queryString from "query-string";
import {Link} from "react-router-dom";
import {Paging, setPageWithItems} from "../Сommons/Paging";
import {ConfirmationDelete} from "../Сommons/Confirmation/ConfirmationDelete";


class Customers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageSize: 3,
      customerToDelete: null
    }
  }

  render() {
    if (this.props.customers && this.props.trips) {
      let queryParams = queryString.parse(window.location.search.substr(1));
      let currentPage = queryParams.page >= 1 ? parseInt(queryParams.page, 10) : 1;
      let trips = this.props.trips;
      let tripsArr = Object.keys(trips).reduce((arr, key) => ([...arr, {...trips[key]}]), []);
      return (
        <div className="customers">
          {this.state.customerToDelete ? <ConfirmationDelete
            onNo={() => this.setState({customerToDelete: null})}
            onYes={() => {
              this.setState({customerToDelete: null});
              this.props.onDeleteCustomer(this.state.customerToDelete.id, this.state.customerToDelete);
            }}
            item={`${this.state.customerToDelete.firstName} - ${this.state.customerToDelete.lastName}`}
          /> : null}
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
              Object.keys(this.props.customers.listCustomers).length
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
                    console.log(customer);
                    this.setState({customerToDelete: customer})
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
            totalItems={Object.keys(this.props.customers.listCustomers)}
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