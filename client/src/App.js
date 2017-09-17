import React from "react";
import {Menu} from "./Menu";
import Trips from "./Trips"

class App extends React.Component {
  constructor(props){
    super(props);
      this.state = {
        activeMenu: "Trips"
      };
  };

generateKey(){
    this.uId = this.uId || 0;
    return this.uId++;
}

pages(){
    if(this.state.activeMenu == "Trips"){
        return(
          <Trips/>
          )
    }
}

render() {
  let page = this.pages();
  return (
    <div className = "app">
      <div className = "wrapper">
          <nav className = "menu">
            <Menu items = {[
                {id: "Trips", title: "Trips", key: this.generateKey()},
                {id: "Customers", title: "Customers", key: this.generateKey()},
                {id: "Locations", title: "Locations", key: this.generateKey()}
                ]}
                onClick = {id => this.setState({activeMenu: id})}
            />
          </nav>
            {page}
        </div>
      </div>
    );
  }
}

export default App;
