import React from "react";
import Customers from "./Customers";
import CustomerForm from "./form_for_customers";
import {getAll, add, remove, update, getById} from "./api/api";

class WrapperCustomers extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			viewType: "customers",
			btnVal: "",
			objForEdit: ""
		}
	}

render(){
		return(
			<div>
				{this.state.viewType === "customers" 

				?
					<Customers 
						getCustomers = {() => getAll("customers")}
						onAdd = {() => this.setState({viewType: "сustomerForm", btnVal: "add"})}
						delSingle = {id => remove("customers", id)}
						getById = {id => getById("customers", id).then(customers =>{
                        	this.setState({
			        			objForEdit: customers,
			        			viewType: "customersForm"
			        		});
                        })}
					/>
				:
					<CustomerForm 
						onCancel = {() => this.setState({viewType: "customers", btnVal: ""})}
						onAdd = { customers => {
                          add("customers", customers).then(() =>{
                          	this.setState({viewType: "customers", btnVal: ""});
                          });
                        }}
                        objForEdit = {this.state.objForEdit}
						delSingle = {id => remove("customers", id)}
						btnVal = {this.state.btnVal}
						onUpdate = {(id, customers) => update("customers", id, customers).then(() => {
                        	this.setState({
                        		viewType: "customers", btnVal: "", objForEdit: ""
                        	})
                        })}
					/>
				}
			</div>
		)
	}
}

export default WrapperCustomers;