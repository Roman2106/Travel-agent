import React from "react";
import {connect, Provider} from "react-redux";
import {AppRouter} from "./AppRouter";
import {store} from "../../store";
import {TripsService} from "../Trips/TripsService";
import {LocationService} from "../Locations/LocationService";
import {MessagesService} from "./UserMessages/MessageService";
import {CustomersService} from "../Customers/CustomersService";
import "../../index.css";

const actionCreators = {
  ...LocationService,
  ...TripsService,
  ...CustomersService,
  ...MessagesService
};

const bindActionCreators = (dispatch, actionCreators) =>{
  const bound = {};
  Object.keys(actionCreators).forEach(key => {
    bound[key] = function(){
      dispatch(actionCreators[key].apply(null, arguments));
    }
  });
  return bound;
};

const mapStateToProps = state => state;
const ConnectedAppRouter =
  connect(mapStateToProps, dispatch => bindActionCreators(dispatch, actionCreators))
  (AppRouter);

export const App = () =>(
  <div className="app">
    <Provider store = {store}>
      <ConnectedAppRouter/>
    </Provider>
  </div>
);

// class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       message: null
//     };
//   };
//
//   render() {
//     return (
//       <Router>
//         <div className="app">
//           <div className="wrapper">
//               <Route path = "/"  render = {()=><Menu items={[
//                 {id: "trips", title: "Trips", key: "trips"},
//                 {id: "customers", title: "Customers", key: "customers"},
//                 {id: "locations", title: "Locations", key: "locations"}
//               ]}/>}/>
//             {this.state.message ? <Alert
//               text={this.state.message.text}
//               type={this.state.message.type}
//               hideOnClick={true}
//               hideAfter={4}
//               onHide={() => this.setState({message: null})}/> : null}
//             <Switch>
//               <Route path="/trips" render={() => <ScreenTrips
//                 onError={message => this.setState({message})}
//                 onSuccess={message => this.setState({message})}
//               />}/>
//               <Route path="/customers" render={() => <ScreenCustomers
//                 onError={message => this.setState({message})}
//                 onSuccess={message => this.setState({message})}
//               />}/>
//               <Route path="/locations" render={() => <ScreenLocations
//                 onError={message => this.setState({message})}
//                 onSuccess={message => this.setState({message})}
//               />}/>
//             </Switch>
//           </div>
//         </div>
//       </Router>
//     );
//   }
// }
// export default App;
