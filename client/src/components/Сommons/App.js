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
  connect(mapStateToProps, dispatch => bindActionCreators(dispatch, actionCreators))(AppRouter);

export const App = () =>(
  <div className="app">
    <Provider store = {store}>
      <ConnectedAppRouter/>
    </Provider>
  </div>
);
