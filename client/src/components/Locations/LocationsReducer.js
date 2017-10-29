import {ActionType} from "./LocationsConst";

const initialState = {
  listLocations: [],
  showLoading: true
};

export const showLocations = locations => ({type: ActionType.LOADED_LOCATIONS, payload: {locations}});
export const addLocation = location => ({type: ActionType.ADD_LOCATION, payload: {location}});
export const editLocation = location => ({type: ActionType.EDIT_LOCATION, payload: {location}});
export const deleteLocation = (id, location) => ({type: ActionType.DELETE_LOCATION, payload: id});

export const LocationsReducer = (state = initialState, action) => {
  switch (action.type) {

    case ActionType.LOADED_LOCATIONS:
      return {
        ...state, listLocations: action.payload.locations, showLoading: false
      };

    case ActionType.ADD_LOCATION:
      let newLocations = state.listLocations.concat([]);
      newLocations.push(action.payload.location);
      return {
        ...state, listLocations: newLocations
      };

    case ActionType.EDIT_LOCATION:
      let editLocations = state.listLocations.concat([]);
      let index = editLocations.findIndex(item => item.id === action.payload.location.id);
      console.log(action.payload.location.id);
      editLocations.splice(index, 1, action.payload.location);
      return {
        ...state, listLocations: editLocations
      };

    case ActionType.DELETE_LOCATION:
      let newLocationsList = state.listLocations.concat([]);
      let index1 = newLocationsList.findIndex(item => item.id === action.payload.id);
      newLocationsList.splice(index1, 1);
      return{
        ...state, listLocations: newLocationsList
      };

    default:
      return state;
  }
};