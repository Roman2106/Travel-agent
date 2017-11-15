import {getAll, add, update, remove} from "../../api/api";
import {setError, setMessage} from "../Commons/UserMessages/MessageReducer";
import {batchActions} from 'redux-batched-actions';
import {ActionType} from "./LocationsConst";

export const showLocations = locations => ({type: ActionType.LOADED_LOCATIONS, payload: {locations}});
export const addLocation = location => ({type: ActionType.ADD_LOCATION, payload: {location}});
export const editLocation = location => ({type: ActionType.EDIT_LOCATION, payload: {location}});
export const deleteLocation = (id, location) => ({type: ActionType.DELETE_LOCATION, payload: id});
export const removeClassLocation = locationId => ({type: ActionType.REMOVE_CLASS_LOCATION, payload: {locationId}});
export const changeSortOrderLocations = field => ({type: ActionType.CHANGE_SORT_ORDER_LOCATIONS, payload: {field}});

export const LocationActionCreators = {

  getLocations: () => {
    return dispatch => {
      getAll("locations").then(locations => {
        dispatch(showLocations(locations))
      }).catch(error => dispatch(setError(error.message, "danger")));
    }
  },

  onSaveLocation: location => {
    return dispatch => {
      const promise = location.id
        ? update("locations", location.id, location).then(location =>
          dispatch(batchActions([editLocation(location), setMessage(`${location.country} - ${location.city} was successfully edited.`, "success")]))
        )
        : add("locations", location).then(location =>
          dispatch(batchActions([addLocation(location), setMessage(`${location.country} - ${location.city} was successfully add.`, "success")]))
        );
      promise.catch(error =>
        dispatch(setError(error.message, "danger"))
      )
    }
  },

  onDeleteLocation: (id, location) => {
    return dispatch => {
      remove("locations", id).then(id =>
        dispatch(batchActions([deleteLocation(id), setMessage(`${location.country} - ${location.city} was successfully deleted.`, "success")]))
      ).catch(error => dispatch(setError(error.message, "danger")));
    }
  },

  onRemoveClassLocation: locationId => {
    return dispatch => {
      dispatch(removeClassLocation(locationId))
    }
  },

  onChangeSortOrderLocations: field => {
    return dispatch => {
      dispatch(changeSortOrderLocations(field))
    }
  }

};