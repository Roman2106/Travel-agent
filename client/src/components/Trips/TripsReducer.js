import {ActionType} from "./TripsConst";
import _ from "lodash";

const initialState = {
  listTrips: {},
  sortBy: "tripName",
  sortOrder: "asc",
  showLoading: true
};

export const TripsReducer = (state = initialState, action) => {

  switch (action.type) {

    case ActionType.LOADED_TRIPS:
      return {
        ...state, listTrips: _.keyBy(action.payload.trips, trip => trip.id), showLoading: false
      };

    case ActionType.ADD_TRIP:
      return {
        ...state,
        listTrips: {...state.listTrips, [action.payload.trip.id]: {...action.payload.trip, className: "updateItem"}}
      };

    case ActionType.EDIT_TRIP:
      return {
        ...state, listTrips: {...state.listTrips, [action.payload.trip.id]: {...action.payload.trip, className: "updateItem"}}
      };

    case ActionType.DELETE_TRIP:
      return {
        ...state, listTrips: _.omit(state.listTrips, action.payload.id)
      };

    case ActionType.REMOVE_CLASS:
      const trip = state.listTrips[action.payload.tripId];
      const {className, ...other} = trip;
      return{
        ...state, listTrips: {...state.listTrips, [action.payload.tripId]: {...other}}
      };

    case ActionType.CHANGE_SORT_ORDER_TRIPS:
      const sorted = Object.values(state.listTrips).sort((a, b) => {
        let c = a[action.payload.field].toLowerCase();
        let d = b[action.payload.field].toLowerCase();
        if (c < d) return -1;
        return 1;
      });
      const sortOrder = state.sortOrder === "asc" ? "desc" : "asc";
      const sortedNormalized = state.sortOrder === "desc" ?
        _.keyBy(sorted.reverse(), trip => trip.id) :
        _.keyBy(sorted, trip => trip.id);
      return {...state, sortBy: action.payload.field, sortOrder: sortOrder, listTrips: sortedNormalized};

    default:
      return state;
  }

};

