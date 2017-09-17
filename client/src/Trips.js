import React from "react";
import {getAll, add, remove, update} from "./api/api";

class Trips extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			allTrips: null,
			tripName: "",
			routName: "",
			dateDeparture: "",
			dateArrival: "",
			idForUpdate: ""
		};
	};

componentWillMount(){
	getAll("trips").then( response =>{
		let arr = response;
		this.setState({
			allTrips: arr
		});
	});
}

generateKey(){
    this.uId = this.uId || 0;
    return this.uId++;
}

createObj(){
	let obj = {
		tripName: this.state.tripName,
		routName: this.state.routName,
		dateDeparture: this.state.dateDeparture,
		dateArrival: this.state.dateArrival
	}
	add("trips", obj);
}

apdateTrip(){
	let obj = {
		tripName: this.state.tripName,
		routName: this.state.routName,
		dateDeparture: this.state.dateDeparture,
		dateArrival: this.state.dateArrival
	}
	let id = this.state.idForUpdate;
	update("trips", id, obj);
	getAll("trips").then( response =>{
		let arr = response;
		this.setState({
			allTrips: arr,
			tripName: "",
			routName: "",
			dateDeparture: "",
			dateArrival: ""
		});
	});
}

delSingle(url, id, index){
	remove(url, id);
	let allTrips = this.state.allTrips;
	allTrips.splice(index, 1);
	this.setState({
		allTrips
	})
}


render(){
	if(this.state.allTrips){
		return(
		<div className = "trips">
			<table>
				<thead>
    				<tr>
        				<th>Название тура</th>
        				<th>Маршрут</th>
        				<th>Дата выезда</th>
        				<th>Дата возвращения</th>
        				<th>Удалить/изменить</th>
    				</tr>
    			</thead>
		    	<tbody>
		    		{this.state.allTrips.map((item, index, key) =>
						<tr key = {this.generateKey()}>
			        		<td>{item.tripName}</td>
			        		<td>{item.routName}</td>
			        		<td>{item.dateDeparture}</td>
			        		<td>{item.dateArrival}</td>
			        		<td><button className = "del" onClick = {e => {
			        			this.delSingle("trips", item.id.toString(), index)
			        		}}>X</button>
			        		<button className = "up" onClick = {e =>{
			        			this.setState({
			        				tripName: item.tripName,
			        				routName: item.routName,
			        				dateDeparture: item.dateDeparture,
			        				dateArrival: item.dateArrival,
			        				idForUpdate: item.id.toString()
			        			})
			        		}}>Изменить</button>
			        		</td>
			    		</tr>
			    	)}
		    	</tbody>	
			</table>
			<h4>Добавить маршрут</h4>
			<form onSubmit = {this.createObj.bind(this)}>
				<p>
					<label htmlFor="tripName">Название Тура:</label>
					<input type="text" name="tripName" id="tripName" title="tripName" required
					value = {this.state.tripName}
					onChange = {e => this.setState({tripName: e.target.value})}
					/>
				</p>
				<p>
					<label htmlFor="routName">Маршрут:</label>
					<input type="text" name="routName" id="routName" title="routName" required
					value = {this.state.routName}
					onChange = {e => this.setState({routName: e.target.value})}
					/>
				</p>
				<p>
					<label htmlFor="dateDeparture">Дата выезда:</label>
					<input type="date" name="dateDeparture" id="dateDeparture" title="dateDeparture"
					value = {this.state.dateDeparture}
					onChange = {e => this.setState({dateDeparture: e.target.value})}
					/>
				</p>
				<p>
					<label htmlFor="dateArrival">Дата возвращения:</label>
					<input type="date" name="dateArrival" id="dateArrival" title="dateArrival"
					value = {this.state.dateArrival}
					onChange = {e => this.setState({dateArrival: e.target.value})}
					/>
				</p>
				<button type ="submit" >Добавить маршрут</button>
				
			</form>
			<div className = "forUpdate">
				<button className = "update" onClick = {this.apdateTrip.bind(this)}>Применить изменения</button>
			</div>
		</div>
		)
		}else{
		return(
			<div>Loading data...</div>
			)
		}

	
	}
};

export default Trips;