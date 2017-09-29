import React from "react";
import {getAll} from "./api/api";
import Loader from "./Loader";

class TripsForm extends React.Component{
constructor(props){
	super(props);
	this.state = {
		tripName: this.props.objForEdit ? this.props.objForEdit.tripName : this.tripName = "",
		routName: this.props.objForEdit ? this.props.objForEdit.routName : this.routName = "",
		dateDeparture: this.props.objForEdit ? this.props.objForEdit.dateDeparture : this.dateDeparture = "",
		dateArrival: this.props.objForEdit ? this.props.objForEdit.dateArrival : this.dateArrival = "",
		currentLocations: null
		};
	};

componentDidMount(){
	getAll("locations").then( locations =>{
		this.setState({
			currentLocations: locations
		});
	});
}

render(){
	if(this.state.currentLocations){
		return(
			<div className = "tripsForm">
				<form>
					<p>
						<label htmlFor="tripName">Название тура:</label>
						<input type="text" name="tripName" id="tripName" title="tripName" required
						onChange = { e => this.setState({tripName: e.target.value})}
						value = {this.state.tripName}
						/>
					</p>
					<p>
						<label htmlFor="routName">Маршрут:</label>
						<select name = "routName" id = "routName" 
						onChange = { e => this.setState({routName: e.target.value})}
						value = {this.state.routName}>
						<option>Выберите маршрут</option>
							{this.state.currentLocations.map((item, index, key) =>
								<option key = {item.id}>{`${item.country} - ${item.city}`}</option>
							)}
						</select>
					</p>
					<p>
						<label htmlFor="dateDeparture">Дата выезда:</label>
						<input type="date" name="dateDeparture" id="dateDeparture" title="dateDeparture"
						onChange = { e => this.setState({dateDeparture: e.target.value})}
						value = {this.state.dateDeparture}
						/>
					</p>
					<p>
						<label htmlFor="dateArrival">Дата возвращения:</label>
						<input type="date" name="dateArrival" id="dateArrival" title="dateArrival"
						onChange = { e => this.setState({dateArrival: e.target.value})}
						value = {this.state.dateArrival}
						/>
					</p>
				</form>
				<div className = "tripsButtons">
					<button className = "addEditTrips"
						onClick = {this.props.btnVal === "add" ? () => {this.props.onAdd({
							tripName: this.state.tripName,
							routName: this.state.routName,
							dateDeparture: this.state.dateDeparture,
							dateArrival: this.state.dateArrival
						});
							this.props.onSuccess({
								text: ` Trip ${this.state.tripName}, ${this.state.routName} was successfully added.`,
								type: "success"
							});
						}: 
						() => this.props.onUpdate(this.props.objForEdit.id, {
							tripName: this.state.tripName,
							routName: this.state.routName,
							dateDeparture: this.state.dateDeparture,
							dateArrival: this.state.dateArrival
						})
					}>
						{this.props.btnVal === "add" ? "Добавить маршрут" : "Редактировать маршрут"}
					</button>
					<button className = "cancel" onClick = {this.props.onCancel}>Отменить</button>
				</div>
			</div>
		)
		}else{
			return(
				<Loader />
			)
		}
	};
};

export default TripsForm;