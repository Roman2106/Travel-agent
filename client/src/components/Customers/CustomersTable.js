import React from "react";
import Loader from "../Commons/Loader/Loader";
import {Link} from "react-router-dom";
import moment from 'moment';
import {Paging, setPageWithItems} from "../Commons/Paging/Paging";
import {ConfirmationDelete} from "../Commons/Confirmation/ConfirmationDelete";


class Customers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageSize: 3,
      firstNameClass: "thFirstName",
      lastNameClass: "thLastName",
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
              <th className={this.state.firstNameClass} onClick={() => {
                this.props.onChangeSortOrderCustomers("firstName");
                this.setState({
                  firstNameClass:`thFirstName ${this.props.customers.sortOrder}`,
                  lastNameClass: "thLastName",
                });
              }}>First name
              </th>
              <th className={this.state.lastNameClass} onClick={() => {
                this.props.onChangeSortOrderCustomers("lastName");
                this.setState({
                  firstNameClass: "thFirstName",
                  lastNameClass:`thLastName ${this.props.customers.sortOrder}`
                });
              }}>Last name</th>
              <th>Travels</th>
              <th>Edit / Del</th>
            </tr>
            </thead>
            <tbody>
            {setPageWithItems(this.props.customers.listCustomers,
              this.props.currentPage,
              this.state.pageSize,
              Object.keys(this.props.customers.listCustomers).length
            ).map((customer, index, key) =>
              <tr key={customer.id} className={customer.className}
                  onAnimationEnd={() => this.props.onRemoveClassCustomer(customer.id)}>
                <td>{customer.firstName}</td>
                <td>{customer.lastName}</td>
                <td className="withTrips">
                  <ul className="containerliInTr">{customer.customersTripsID.map((id, index) => {
                    for (let i = 0; i < Object.values(this.props.trips).length; i++) {
                      if (id !== Object.values(this.props.trips)[i].id) continue;
                      return (<li className="liInTr" key={index}>
                        {`${this.props.trips[id].tripName} - ${moment(this.props.trips[id].dateDeparture).format("DD-MM-YYYY")}`}
                      </li>)
                    }
                  })}</ul>
                </td>
                <td className="tdForButton">
                  <Link className="edit"
                        to={`/customers/${customer.id}?page=${String(this.props.currentPage)}`}>Edit</Link>
                  <a className="del" onClick={() => {
                    this.setState({customerToDelete: customer})
                  }}>X
                  </a>
                </td>
              </tr>
            )}
            </tbody>
          </table>
          <Link className="btnAdd" to={`customers/add?page=${String(this.props.currentPage)}`}>Add
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