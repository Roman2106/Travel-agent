import React from "react";
import {getAll} from "../../api/api";
import Loader from "../Сommons/Loader";

class CustomerForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: this.props.objForEdit ? this.props.objForEdit.firstName : this.firstName = "",
      lastName: this.props.objForEdit ? this.props.objForEdit.lastName : this.lastName = "",
      currentTrips: null,
      customersTrips: this.props.objForEdit ? this.props.objForEdit.customersTrips : this.customersTrips = "",
      disabled: false
    }
  }

  componentDidMount() {
    getAll("trips").then(trips => {
      this.setState({
        currentTrips: trips
      });
    });
  };

  render() {
    if (this.state.currentTrips) {
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
            {this.props.btnVal === "add" ?
              <p>
                <label htmlFor="customersTrips">Выберите путешествие:</label>
                <select value={this.state.valueAdd} name="customersTrips" id="customersTrips"
                        onChange={
                          e => {
                            let selectedTripObject = JSON.parse(e.target.options[e.target.selectedIndex].value);
                            this.setState({
                              customersTrips: selectedTripObject,
                              disabled: true
                            });
                          }
                        }>
                  <option disabled={this.state.disabled}>Выберите путешествие</option>
                  {this.state.currentTrips.map((item, index, key) =>
                    <option key={item.id}
                            value={JSON.stringify(item)}>{`${item.tripName} - дата отправления: ${item.dateDeparture}, дата возвращения: ${item.dateArrival}.`}</option>
                  )}
                </select>
              </p>
              :
              <div>
                <label htmlFor="customersTrips">Добавить путешествие:</label>
                <select name="customersTrips" id="customersTrips" value={this.state.optionValueForEdit}
                        onChange={
                          e => {
                            let selectedTripObject = JSON.parse(e.target.options[e.target.selectedIndex].value);
                            let arrayWithTrips = this.state.customersTrips;
                            let arrayWithTripsID = arrayWithTrips.map(item => {
                              return (item.id)
                            });
                            let bool = true;
                            for (let i = 0; i < arrayWithTripsID.length; i++) {
                              if (arrayWithTripsID[i] === selectedTripObject.id) {
                                this.setState({disabled: true});
                                this.props.onError({
                                  text: "Такое путешествие уже существует у клиента",
                                  type: "danger"
                                });
                                bool = false;
                              }
                            }
                            if (bool) {
                              arrayWithTrips.push(selectedTripObject);
                              this.setState({customersTrips: arrayWithTrips, disabled: true});
                            }
                          }
                        }>
                  <option disabled={this.state.disabled}>Добавить путешествие</option>
                  {this.state.currentTrips.map((item, index, key) =>
                    <option key={item.id}
                            value={JSON.stringify(item)}>{`${item.tripName} - дата отправления: ${item.dateDeparture}, дата возвращения: ${item.dateArrival}. `}</option>
                  )}
                </select>
                <table>
                  <thead>
                  <tr>
                    <th>Все путешествия клиента</th>
                    <th>Удалить</th>
                  </tr>
                  </thead>
                  <tbody>
                  {this.props.objForEdit.customersTrips.map((item, index, key) =>
                    <tr key={index}>
                      <td>{`${item.tripName}. Дата отправления: ${item.dateDeparture}`}</td>
                      <td>
                        <button className="del"
                                onClick={e => {
                                  e.preventDefault();
                                  let arr = this.props.objForEdit.customersTrips;
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
              </div>
            }
          </form>
          <div className="customersButtons">
            <button className="addEditCustomer"
                    onClick={this.props.btnVal === "add"
                      ?
                      () => {
                        if (this.state.customersTrips) {
                          this.props.onAdd({
                            firstName: this.state.firstName,
                            lastName: this.state.lastName,
                            customersTrips: this.state.customersTrips
                          })
                          this.props.onSuccess({
                            text: ` Customer ${this.state.firstName}, ${this.state.lastName} was successfully added.`,
                            type: "success"
                          })
                        } else {
                          this.props.onError({
                            text: "Please add travel.",
                            type: "danger"
                          })
                        }
                      }
                      :
                      () => {
                        this.props.onUpdate(this.props.objForEdit.id, {
                          firstName: this.state.firstName,
                          lastName: this.state.lastName,
                          customersTrips: this.state.customersTrips
                        })
                      }
                    }>
              {this.props.btnVal === "add" ? "Добавить клиента" : "Редактировать клиента"}</button>
            <button className="cancel" onClick={this.props.onCancel}>Отменить</button>
          </div>
        </div>
      )
    } else {
      return (
        <Loader/>
      )
    }
  }
}

export default CustomerForm;