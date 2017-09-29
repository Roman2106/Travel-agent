import React from "react";
import {getAll} from "./api/api";
import Loader from "./Loader";

class CustomerForm extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			firstName: this.props.objForEdit ? this.props.objForEdit.firstName : this.firstName = "",
			lastName: this.props.objForEdit ? this.props.objForEdit.lastName : this.lastName = "",
			customersTrips: null,
			currentTrips: null
		}
	}

componentDidMount(){
	getAll("trips").then( trips =>{
		this.setState({
			currentTrips: trips
		});
	});
};

render(){
		if(this.state.currentTrips){
			return(
				<div className = "customersForm">
					<form>
						<p>
							<label htmlFor="firstName">Введите имя:</label>
							<input type="text" name="firstName" id="firstName" title="firstName" required
							onChange = { e => this.setState({firstName: e.target.value})}
							value = {this.state.firstName}
							/>
						</p>
						<p>
							<label htmlFor="lastName">Введите фамилию:</label>
							<input type="text" name="lastName" id="lastName" title="lastName" required
							onChange = { e => this.setState({lastName: e.target.value})}
							value = {this.state.lastName}
							/>
						</p>
						{this.props.btnVal === "add" ? 
							<p>
								<label htmlFor="customersTrips">Название путешествия:</label>
								<select name = "customersTrips" id = "customersTrips" 
								onChange = { 
									e => {
										let itemTrip = e.target.value;
										const customersTrips = new Array();
										customersTrips.push(itemTrip);
										this.setState({customersTrips})
									}
								}
								value = {this.state.customersTrips || ""}>
								<option>Выберите путешествие</option>
									{this.state.currentTrips.map((item, index, key) =>
										<option key = {item.id}>{`${item.tripName} - дата отправления: ${item.dateDeparture}, дата возвращения: ${item.dateArrival}.`}</option>
									)}
								</select>
							</p>
								:
							<div>
								<label htmlFor="customersTrips">Название путешествия:</label>
								<select name = "customersTrips" id = "customersTrips" 
								onChange = { 
									e => {
										let itemTrip = e.target.value;
										const customersTrips = this.props.objForEdit.customersTrips;
										function isTrip(item){return item === itemTrip};
										let validateTrips = customersTrips.some(isTrip);
										console.log(validateTrips);
										if(validateTrips){
											this.props.onError({
												text: "Such a route already exists for this client.",
												type: "danger"
											})
										}else{
											customersTrips.push(itemTrip);
											this.setState({customersTrips})
										}
									}
								}
								value = {this.state.customersTrips || ""}>
								<option>Добавить путешествие</option>
									{this.state.currentTrips.map((item, index, key) =>
										<option key = {item.id}>{`${item.tripName} - дата отправления: ${item.dateDeparture}, дата возвращения: ${item.dateArrival}. `}</option>
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
											<tr key = {index}>
												<td>{item}</td>
													<td>
														<button className = "del"
															onClick = { e => {
																e.preventDefault();
					        									let arr = this.props.objForEdit.customersTrips;
					        									arr.splice(index, 1);
							        								this.setState({
							        									customersTrips: arr
							        							});
					        								}}
														>X</button>
													</td>
											</tr>
										)}
									</tbody>
								</table>
							</div>
						}
					</form>
					<div className = "customersButtons">
						<button className = "addEditCustomer"
							onClick = {this.props.btnVal === "add" 
							? 
							() => {if(this.state.customersTrips){this.props.onAdd({
								firstName: this.state.firstName,
								lastName: this.state.lastName,
								customersTrips: this.state.customersTrips
						})
							this.props.onSuccess({
								text: ` Customer ${this.state.firstName}, ${this.state.lastName} was successfully added.`,
								type: "success"
							})
						}else{
							this.props.onError({
								text: "Please add travel.",
								type: "danger"
							})
						}}
							: 
							() => {this.props.onUpdate(this.props.objForEdit.id, {
									firstName: this.state.firstName,
									lastName: this.state.lastName,
									customersTrips: this.props.objForEdit.customersTrips
							})
						}
					}>
						{this.props.btnVal === "add" ? "Добавить клиента" : "Редактировать клиента"}</button>
						<button className = "cancel" onClick = {this.props.onCancel}>Отменить</button>
					</div>
				</div>		
			)
		}else{
			return(
				<Loader />
			)
		}
	}
}

export default CustomerForm;