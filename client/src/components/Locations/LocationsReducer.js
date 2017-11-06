import {ActionType} from "./LocationsConst";
import _ from "lodash";

const initialState = {
  listLocations: {},
  showLoading: true
};

export const LocationsReducer = (state = initialState, action) => {
  switch (action.type) {

    case ActionType.LOADED_LOCATIONS:
      return {
        ...state, listLocations: _.keyBy(action.payload.locations, location=>location.id), showLoading: false
      };

    case ActionType.ADD_LOCATION:
      return {
        ...state, listLocations: {...state.listLocations, [action.payload.location.id]: action.payload.location}
      };

    case ActionType.EDIT_LOCATION:
      return {
        ...state, listLocations: {...state.listLocations, [action.payload.location.id]: action.payload.location}
      };

    case ActionType.DELETE_LOCATION:
      return{
        ...state, listLocations: _.omit(state.listLocations, action.payload.id)
      };

    default:
      return state;
  }
};