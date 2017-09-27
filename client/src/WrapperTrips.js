import React from "react";
import Trips from "./Trips";
import TripsForm from "./form_for_trips";
import {getAll, add, remove, update, getById} from "./api/api";

class WrapperTrips extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			viewType: "Trips",
        	btnVal: "",
			objForEdit: ""
		}
	}

render(){
		return(
			<div>
                {this.state.viewType === "Trips" 

                ?  
                    <Trips
                        onAdd = {() => this.setState({viewType: "TripsForm", btnVal: "add"})}
                        getTrips = {() => getAll("trips")}
                        delSingle = {id => remove("trips", id)}
                        getById = {id => getById("trips", id).then(trips =>{
                        	this.setState({
			        			objForEdit: trips,
			        			viewType: "TripsForm"
			        		});
                        })}
                    /> 
                :
                    <TripsForm
                        onCancel = {() => this.setState({viewType: "Trips", btnVal: ""})}
                        btnVal = {this.state.btnVal}
                        onAdd = {trips => {
                          add("trips", trips).then(() =>{
                          	this.setState({viewType: "Trips", btnVal: ""});
                          });
                        }}
                        objForEdit = {this.state.objForEdit}
                        onUpdate = {(id, trips) => update("trips", id, trips).then(() => {
                        	this.setState({
                        		viewType: "Trips", btnVal: "", objForEdit: ""
                        	})
                        })}
                    />
               }
            </div>
		)
	}
}

export default WrapperTrips;