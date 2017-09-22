import React from "react";

class TripsForm extends React.Component{
constructor(props){
	super(props);
	this.state = {
		tripName: this.props.objForEdit ? this.props.objForEdit.tripName : this.tripName = "",
		routName: this.props.objForEdit ? this.props.objForEdit.routName : this.routName = "",
		dateDeparture: this.props.objForEdit ? this.props.objForEdit.dateDeparture : this.dateDeparture = "",
		dateArrival: this.props.objForEdit ? this.props.objForEdit.dateArrival : this.dateArrival = ""
		};
	};

render(){
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
						<input type="text" name="routName" id="routName" title="routName" required
						onChange = { e => this.setState({routName: e.target.value})}
						value = {this.state.routName}
						/>
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
						onClick = {this.props.btnVal === "add" ? () => this.props.onAdd({
							tripName: this.state.tripName,
							routName: this.state.routName,
							dateDeparture: this.state.dateDeparture,
							dateArrival: this.state.dateArrival
						}): 
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
	};
};

export default TripsForm;