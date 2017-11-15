import {ActionType} from "./LocationsConst";
import _ from "lodash";

const initialState = {
  listLocations: {},
  sortBy: "country",
  sortOrder: "asc",
  showLoading: true
};

export const LocationsReducer = (state = initialState, action) => {

  switch (action.type) {

    case ActionType.LOADED_LOCATIONS:
      return {
        ...state, listLocations: _.keyBy(action.payload.locations, location => location.id), showLoading: false
      };

    case ActionType.ADD_LOCATION:
      return {
        ...state, listLocations: {...state.listLocations, [action.payload.location.id]: {...action.payload.location, className: "updateItem"}}
      };

    case ActionType.EDIT_LOCATION:
      return {
        ...state, listLocations: {...state.listLocations, [action.payload.location.id]: {...action.payload.location, className: "updateItem"}}
      };

    case ActionType.DELETE_LOCATION:
      return {
        ...state, listLocations: _.omit(state.listLocations, action.payload.id)
      };

    case ActionType.REMOVE_CLASS_LOCATION:
      const location = state.listLocations[action.payload.locationId];
      const {className, ...other} = location;
      return {
        ...state, listLocations: {...state.listLocations, [action.payload.locationId]: {...other}}
      };

    case ActionType.CHANGE_SORT_ORDER_LOCATIONS:
      const sorted = Object.values(state.listLocations).sort((a, b) => {
        let c = a[action.payload.field].toLowerCase();
        let d = b[action.payload.field].toLowerCase();
        if (c < d) return -1;
        return 1;
      });
      const sortOrder = state.sortOrder === "asc" ? "desc" : "asc";
      const sortedNormalized = state.sortOrder === "desc" ?
        _.keyBy(sorted.reverse(), trip => trip.id) :
        _.keyBy(sorted, trip => trip.id);
      return {...state, sortBy: action.payload.field, sortOrder: sortOrder, listLocations: sortedNormalized};

    default:
      return state;
  }

};