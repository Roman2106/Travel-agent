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
                        onError = {this.props.onError}
                        onSuccess = {this.props.onSuccess}
                        getById = {id => getById("trips", id).then(trips =>{
                        	this.setState({
			        			objForEdit: trips,
			        			viewType: "TripsForm"
			        		});
                        })}
                    /> 
                :
                    <TripsForm
                        onError = {this.props.onError}
                        onSuccess = {this.props.onSuccess}
                        onCancel = {() => this.setState({viewType: "Trips", btnVal: "", objForEdit: null})}
                        btnVal = {this.state.btnVal}
                        onAdd = {trips => {
                          add("trips", trips).then(() =>{
                          	this.setState({viewType: "Trips", btnVal: "", objForEdit: null});
                          }).catch(error => this.props.onError({
                            text: error.message || "Unexpected error.",
                            type: "danger"
                            }));
                        }}
                        objForEdit = {this.state.objForEdit}
                        onUpdate = {(id, trips) => update("trips", id, trips).then(() => {
                        	this.setState({
                        		viewType: "Trips", btnVal: "", objForEdit: null
                        	})
                            this.props.onSuccess({
                                text: "Trip was successfully edited.",
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

export default WrapperTrips;