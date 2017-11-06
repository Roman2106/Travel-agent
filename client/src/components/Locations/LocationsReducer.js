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
      // let newLocations = state.listLocations.concat([]);
      // newLocations.push(action.payload.location);

      return {
        ...state, listLocations: {...state.listLocations, [action.payload.location.id]: action.payload.location}
      };

    case ActionType.EDIT_LOCATION:
      // let editLocations = state.listLocations.concat([]);
      // let index = editLocations.findIndex(item => item.id === action.payload.location.id);
      // console.log(action.payload.location.id);
      // editLocations.splice(index, 1, action.payload.location);
      return {
        ...state, listLocations: {...state.listLocations, [action.payload.location.id]: action.payload.location}
      };

    case ActionType.DELETE_LOCATION:
      // let newLocationsList = state.listLocations.concat([]);
      // let index1 = newLocationsList.findIndex(item => item.id === action.payload.id);
      // newLocationsList.splice(index1, 1);
      return{
        ...state, listLocations: _.omit(state.listLocations, action.payload.id)
      };

    default:
      return state;
  }
};