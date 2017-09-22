import React from "react";
import {Menu} from "./Menu";
import WrapperTrips from "./WrapperTrips";
import WrapperLocations from "./WrapperLocations"

class App extends React.Component {
  constructor(props){
    super(props);
      this.state = {
        activeMenu: "Trips"
      };
  };


pages(){
    if(this.state.activeMenu === "Trips"){
        return(
           <WrapperTrips />
          )
    }else if(this.state.activeMenu === "Locations"){
        return(
            <WrapperLocations />
          )
    }
}

render() {
  return (
    <div className = "app">
      <div className = "wrapper">
          <nav className = "menu">
            <Menu items = {[
                {id: "Trips", title: "Trips", key: "trips", isActive: this.state.activeMenu === "Trips"},
                {id: "Customers", title: "Customers", key: "customers", isActive: this.state.activeMenu === "Customers"},
                {id: "Locations", title: "Locations", key: "locations", isActive: this.state.activeMenu === "Locations"}
                ]}
                onClick = {id => this.setState({activeMenu: id})}
            />
          </nav>
            {this.pages()}
        </div>
      </div>
    );
  }
}

export default App;
