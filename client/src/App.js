import React from "react";
import {Menu} from "./Menu";
import WrapperTrips from "./WrapperTrips";
import WrapperLocations from "./WrapperLocations";
import WrapperCustomers from "./WrapperCustomers";
import Alert from "./Alert"

class App extends React.Component {
  constructor(props){
    super(props);
      this.state = {
        activeMenu: "Trips",
        message: null
      };
  };


pages(){
    if(this.state.activeMenu === "Trips"){
        return(
           <WrapperTrips 
            onError = {message => this.setState({message})}
            onSuccess = {message => this.setState({message})}
           />
          )
    }else if(this.state.activeMenu === "Locations"){
        return(
            <WrapperLocations 
            onError = {message => this.setState({message})}
            onSuccess = {message => this.setState({message})}
            />
          )
    }else if(this.state.activeMenu === "Customers"){
        return(
            <WrapperCustomers 
            onError = {message => this.setState({message})}
            onSuccess = {message => this.setState({message})}
            />
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
            {this.state.message ? <Alert 
              text = {this.state.message.text} 
              type = {this.state.message.type}
              hideOnClick = {true}
              hideAfter = {5}
              onHide = {()=> this.setState({message: null})}
              /> : null}
            {this.pages()}
        </div>
      </div>
    );
  }
}

export default App;
