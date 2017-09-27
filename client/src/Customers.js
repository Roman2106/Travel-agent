import React from "react";
import {getAll} from "./api/api";

class Customers extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			customers: null
		}
	}

componentDidMount(){
	this.props.getCustomers().then( customers =>{
		this.setState({
			customers
		});
	});
}

render(){
	console.log(this.state.customers);
		if(this.state.customers){
			return(
				<div className = "customers">
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
							{this.state.customers.map((item, index, key)=>
								<tr key = {item.id}>
									<td>{item.firstName}</td>
									<td>{item.lastName}</td>
										<td>{item.customersTrips.map((item, index) =>
											<tr key = {index}>{item}</tr>
										)}</td>
									
									<td><button className = "del" onClick = {() => {
					        			this.props.delSingle(item.id, index).then(() =>{
					        				let arr = this.state.customers;
					        					arr.splice(index, 1);
							        				this.setState({
							        					customers: arr
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
					<button className = "btnAddCustomer" onClick = {() => {
						this.props.onAdd();
					}}>Добавить клиента</button>
				</div>
			)
		}else{
			return(
				<div>Loading data...</div>
			)
		}
	}
}

export default Customers;