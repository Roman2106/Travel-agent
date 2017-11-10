import React from "react";
import Loader from "../Сommons/Loader";
import {Link} from "react-router-dom";
import moment from 'moment';
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
              this.props.currentPage,
              this.state.pageSize,
              Object.keys(this.props.customers.listCustomers).length
            ).map((customer, index, key) =>
              <tr key={customer.id}>
                <td>{customer.firstName}</td>
                <td>{customer.lastName}</td>
                <td className="withTrips">{customer.customersTripsID.map((id, index) => {
                  for (let i = 0; i < Object.values(this.props.trips).length; i++) {
                    if (id !== Object.values(this.props.trips)[i].id) continue;
                    return <p key={index}>
                      {`${this.props.trips[id].tripName} - ${moment(this.props.trips[id].dateDeparture).format("DD-MM-YYYY")}`}
                    </p>
                  }
                })}</td>
                <td>
                  <button className="del" onClick={() => {
                    this.setState({customerToDelete: customer})
                  }}>X
                  </button>
                  <Link className="edit"
                        to={`/customers/${customer.id}?page=${String(this.props.currentPage)}`}>Edit</Link>
                </td>
              </tr>
            )}
            </tbody>
          </table>
          <Link className="btnAddCustomer" to={`customers/add?page=${String(this.props.currentPage)}`}>Add
            Customer</Link>
          <Paging
            urlPrefix={"customers"}
            totalItems={Object.keys(this.props.customers.listCustomers)}
            currentPage={this.props.currentPage}
            pageSize={this.state.pageSize}
          />
        </div>
      )
    }
    return <Loader/>
  }
}

export default Customers;