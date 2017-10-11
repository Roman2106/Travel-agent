import React from "react";
import {Link} from "react-router-dom";

class CustomerForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: this.props.customer && this.props.customer.firstName || "",
      lastName: this.props.customer && this.props.customer.lastName || "",
      customersTrips: this.props.customer && this.props.customer.customersTrips || "",
      disabled: false
    }
  }

  render() {
    // console.log(this.props.trips);
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
            <select name="customersTrips" id="customersTrips"
                    onChange={e => {
                      let selectedTripObject = JSON.parse(e.target.options[e.target.selectedIndex].value);
                      this.setState({
                        customersTrips: selectedTripObject,
                        disabled: true
                      })}}>
              <option disabled={this.state.disabled}>Добавить путешествие</option>
              {this.props.trips.map((item, index, key) =>
                <option key={item.id} value={JSON.stringify(item)}>
                  {`${item.tripName} - дата отправления: ${item.dateDeparture}, дата возвращения: ${item.dateArrival}.`}
                </option>
              )}
            </select>
          </p>
        </form>
        <div className="customersButtons">
          <button className="addEditCustomer" onClick={() => this.props.addEdit({
            id: this.props.customer && this.props.customer.id || null,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            customersTrips: this.state.customersTrips
          })}>Сохранить
          </button>
          <Link className="cancel" to="/customers">Отменить</Link>
        </div>
      </div>
    )
  }
}

export default CustomerForm;