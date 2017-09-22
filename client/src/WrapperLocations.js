import React from "react";
import Locations from "./Locations"
import {getAll, add, remove, update, getById} from "./api/api";

class WrapperLocations extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			viewType: "locations",
		}
	}
render(){
		return(
			<Locations
				getLocations = {() => getAll("locations")}
				onAdd = {locations => add("locations", locations)}
				delSingle = {id => remove("locations", id)}
			/>
		)
	}
}

export default WrapperLocations;