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
			objForEdit: null
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
						onError = {this.props.onError}
						onSuccess = {this.props.onSuccess}
						getById = {id => getById("customers", id).then(customers =>{
                        	this.setState({
			        			objForEdit: customers,
			        			viewType: "customersForm"
			        		});
                        })}
					/>
				:
					<CustomerForm 
						onCancel = {() => this.setState({viewType: "customers", btnVal: "", objForEdit: null})}
						onAdd = { customers => {
                          add("customers", customers).then(() =>{
                          	this.setState({viewType: "customers", btnVal: ""});
                          }).catch(error => this.props.onError({
							text: error.message || "Unexpected error.",
							type: "danger"
						}));
                        }}
                        onError = {this.props.onError}
                        onSuccess = {this.props.onSuccess}
                        objForEdit = {this.state.objForEdit}
						btnVal = {this.state.btnVal}
						onUpdate = {(id, customers) => update("customers", id, customers).then(() => {
                        	this.setState({
                        		viewType: "customers", btnVal: "", objForEdit: null
                        	})
                        	this.props.onSuccess({
								text: "Customer was successfully edited.",
								type: "success"
							})
                        }).catch(error => this.props.onError({
							text: error.message || "Unexpected error.",
							type: "danger"
						}))
					}
					/>
				}
			</div>
		)
	}
}

export default WrapperCustomers;