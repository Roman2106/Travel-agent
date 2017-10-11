import React from "react";
import {Menu} from "./Menu";
import ScreenTrips from "../Trips/ScreenTrips";
import ScreenLocations from "../Locations/ScreenLocations";
import ScreenCustomers from "../Customers/ScreenCustomers";
import Alert from "./Alert";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import "../../index.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null
    };
  };

  render() {
    return (
      <Router>
        <div className="app">
          <div className="wrapper">
            <nav className="menu">
              <Menu items={[
                {id: "trips", title: "Trips", key: "trips"},
                {id: "customers", title: "Customers", key: "customers"},
                {id: "locations", title: "Locations", key: "locations"}
              ]}
              /></nav>
            {this.state.message ? <Alert
              text={this.state.message.text}
              type={this.state.message.type}
              hideOnClick={true}
              hideAfter={4}
              onHide={() => this.setState({message: null})}/> : null}
            <Switch>
              <Route path="/trips" render={() => <ScreenTrips
                onError={message => this.setState({message})}
                onSuccess={message => this.setState({message})}
              />}/>
              <Route path="/customers" render={() => <ScreenCustomers
                onError={message => this.setState({message})}
                onSuccess={message => this.setState({message})}
              />}/>
              <Route path="/locations" render={() => <ScreenLocations
                onError={message => this.setState({message})}
                onSuccess={message => this.setState({message})}
              />}/>
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}
export default App;
