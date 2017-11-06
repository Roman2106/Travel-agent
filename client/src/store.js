import {createStore, combineReducers, applyMiddleware} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import {TripsReducer} from "./components/Trips/TripsReducer";
import {LocationsReducer} from "./components/Locations/LocationsReducer";
import {CustomersReducer} from "./components/Customers/CustomersReducer";
import {MessagesReducer} from "./components/Сommons/UserMessages/MessageReducer";
import {enableBatching} from 'redux-batched-actions';
import thunk from "redux-thunk";

const CombinedReducer = combineReducers({
  trips: TripsReducer,
  customers: CustomersReducer,
  locations: LocationsReducer,
  messages: MessagesReducer
});

export const store =
  createStore(enableBatching(CombinedReducer), composeWithDevTools(applyMiddleware(thunk)));