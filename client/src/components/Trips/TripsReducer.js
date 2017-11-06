import {ActionType} from "./TripsConst";
import _ from "lodash";

const initialState = {
  listTrips: {},
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
        ...state, listTrips: {...state.listTrips, [action.payload.trip.id] : action.payload.trip}
      };

    case ActionType.EDIT_TRIP:
      return {
        ...state, listTrips: {...state.listTrips, [action.payload.trip.id] : action.payload.trip}
      };

    case ActionType.DELETE_TRIP:
      return {
        ...state, listTrips: _.omit(state.listTrips, action.payload.id)
      };

    default:
      return state;
  }
};

