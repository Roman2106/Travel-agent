import React from "react";

class Trips extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			trips: null
		};
	};

componentDidMount(){
	this.props.getTrips().then( trips =>{
		this.setState({
			trips
		});
	});
}

render(){
	if(this.state.trips){
		return(
		<div className = "trips">
			<table>
				<thead>
    				<tr>
        				<th>Название тура</th>
        				<th>Маршрут</th>
        				<th>Дата выезда</th>
        				<th>Дата возвращения</th>
        				<th>Удалить / изменить</th>
    				</tr>
    			</thead>
		    	<tbody>
		    		{this.state.trips.map((item, index, key) =>
						<tr key = {item.id}>
			        		<td>{item.tripName}</td>
			        		<td>{item.routName}</td>
			        		<td>{item.dateDeparture}</td>
			        		<td>{item.dateArrival}</td>
			        		<td><button className = "del" onClick = {() => {
			        			this.props.delSingle(item.id, index).then(() =>{
			        				let arr = this.state.trips;
			        					arr.splice(index, 1);
					        				this.setState({
					        					trips: arr
					        				});
			        			});
			        		}}>X</button>
			        		<button className = "edit" onClick = {() =>{
			        				this.props.getById(item.id);
			        		}}>Изменить</button>
			        		</td>
			    		</tr>
			    	)}
		    	</tbody>	
			</table>
			<button className = "btnAddTrips" onClick = {() => {
				this.props.onAdd();
			}}>Добавить маршрут</button>
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