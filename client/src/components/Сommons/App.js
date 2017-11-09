import React from "react";
import {connect, Provider} from "react-redux";
import {AppRouter} from "./AppRouter";
import {store} from "../../store";
import {TripsActionCreators} from "../Trips/TripsActionCreators";
import {LocationActionCreators} from "../Locations/LocationActionCreators";
import {MessagesService} from "./UserMessages/MessageService";
import {CustomersActionCreators} from "../Customers/CustomersActionCreators";
import "../../index.css";

const actionCreators = {
  ...LocationActionCreators,
  ...TripsActionCreators,
  ...CustomersActionCreators,
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
