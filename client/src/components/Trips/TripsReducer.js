import {ActionType} from "./TripsConst";

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
      return {
        ...state, listTrips: action.payload.trips, showLoading: false
      };

    case ActionType.ADD_TRIP:
      let newTrips = state.listTrips.concat([]);
      newTrips.push(action.payload.trip);
      return {
        ...state, listTrips: newTrips
      };

    case ActionType.EDIT_TRIP:
      let editTrips = state.listTrips.concat([]);
      let index = editTrips.findIndex(item => item.id === action.payload.trip.id);
      editTrips.splice(index, 1, action.payload.trip);
      return {
        ...state, listTrips: editTrips
      };

    case ActionType.DELETE_TRIP:
      let newTripsList = state.listTrips.concat([]);
      let index1 = newTripsList.findIndex(item => item.id === action.payload.id);
      newTripsList.splice(index1, 1);
      return{
        ...state, listTrips: newTripsList
      };

    default:
      return state;
  }
};

