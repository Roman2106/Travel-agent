import {ActionType} from "./TripsConst";
import clone from "clone";
import _ from "lodash";

const initialState = {
  listTrips: [],
  showLoading: true
};

export const showTrips = trips => ({type: ActionType.LOADED_TRIPS, payload: {trips}});
export const addTrip = trip => ({type: ActionType.ADD_TRIP, payload: {trip}});
export const editTrip = trip => ({type: ActionType.EDIT_TRIP, payload: {trip}});
export const deleteTrip = (id, trip) => ({type: ActionType.DELETE_TRIP, payload: id});

export const TripsReducer = (state = initialState, action) => {
  switch (action.type) {

    case ActionType.LOADED_TRIPS:
      let newlistTrips = clone(state.listTrips);
      let customerWithId = _.keyBy(action.payload.trips, trip => trip.id);
      newlistTrips = customerWithId;
      return {
        ...state, listTrips: customerWithId, showLoading: false
      };

    case ActionType.ADD_TRIP:
      let newTrips = clone(state.listTrips);
      let newTripsArr = Object.keys(newTrips).reduce((arr, key) => ([...arr, { ...newTrips[key] }]), []);
      newTripsArr.push(action.payload.trip);
      return {
        ...state, listTrips: newTripsArr
      };

    case ActionType.EDIT_TRIP:
      let editTrips = clone(state.listTrips);
      let editTripsArr = Object.keys(editTrips).reduce((arr, key) => ([...arr, { ...editTrips[key] }]), []);
      let index = editTripsArr.findIndex(item => item.id === action.payload.trip.id);
      editTripsArr.splice(index, 1, action.payload.trip);
      return {
        ...state, listTrips: editTripsArr
      };

    case ActionType.DELETE_TRIP:
      let newTripsList = clone(state.listTrips);
      let newTripsListArr = Object.keys(newTripsList).reduce((arr, key) => ([...arr, { ...newTripsList[key] }]), []);
      let index1 = newTripsListArr.findIndex(item => item.id === action.payload.id);
      newTripsListArr.splice(index1, 1);
      return {
        ...state, listTrips: newTripsListArr
      };

    default:
      return state;
  }
};

