import React from "react";
import {Link} from "react-router-dom";

class CustomerForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: this.props.customer && this.props.customer.firstName || "",
      lastName: this.props.customer && this.props.customer.lastName || "",
      customersTrips: this.props.customer && this.props.customer.customersTrips || [],
      disabled: false
    }
  }

  addTrips = (e) => {
    let selectedTripObject = JSON.parse(e.target.options[e.target.selectedIndex].value);
    let arrayWithTrips = this.state.customersTrips;
    let arrayWithTripsID = arrayWithTrips.map(item => {
      return (item.id);
    });
    let bool = true;
    for (let i = 0; i < arrayWithTripsID.length; i++) {
      if (arrayWithTripsID[i] === selectedTripObject.id) {
        this.setState({disabled: true});
        this.props.showMessage("Такое путешествие уже существует у клиента", "danger");
        bool = false;
      }
    }
    if (bool) {
      arrayWithTrips.push(selectedTripObject);
      this.setState({customersTrips: arrayWithTrips, disabled: true});
    }
  };

  customerTrips = (customersTrips) => {
    return (
      <table>
        <thead>
        <tr>
          <th>Все путешествия клиента</th>
          <th>Удалить</th>
        </tr>
        </thead>
        <tbody>
        {customersTrips.map((item, index, key) =>
          <tr key={index}>
            <td>{`${item.tripName}. Дата отправления: ${item.dateDeparture}`}</td>
            <td>
              <button className="del" onClick={e => {
                e.preventDefault();
                let arr = customersTrips;
                arr.splice(index, 1);
                this.setState({
                  customersTrips: arr
                });
              }}
              >X
              </button>
            </td>
          </tr>
        )}
        </tbody>
      </table>
    )
  };

  componentWillMount() {
    let oldId = this.props.customer.customersTrips.map(item => {
      return item.id
    });
    let newCustomerTrips = this.props.trips.listTrips;
    let updateCustomersTrips = oldId.map(item => {
      return newCustomerTrips.find(trip => trip.id === item)
    });
    this.setState({
      customersTrips: updateCustomersTrips
    });
  };

  render() {
    let customerTrips = this.state.customersTrips;
    let tableTrips = this.state.customersTrips ? this.customerTrips(customerTrips) : null;
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
              this.addTrips(e)
            }}>
              <option disabled={this.state.disabled}>Добавить путешествие</option>
              {this.props.trips.listTrips.map((item, index, key) =>
                <option key={item.id} value={JSON.stringify(item)}>
                  {`${item.tripName} - дата отправления: ${item.dateDeparture}, дата возвращения: ${item.dateArrival}.`}
                </option>
              )}
            </select>
          </p>
        </form>
        <div className="customersButtons">
          <button className="addEditCustomer" onClick={() => {
            this.props.history.push("/customers");
            this.props.onSaveCustomer({
              id: this.props.customer && this.props.customer.id || null,
              firstName: this.state.firstName,
              lastName: this.state.lastName,
              customersTrips: this.state.customersTrips
            })
          }}>Save
          </button>
          <Link className="cancel" to="/customers">Cancel</Link>
        </div>
        {tableTrips}
      </div>
    )
  }
}

export default CustomerForm;