import {getAll, add, update, remove} from "../../api/api";
import {setError, setMessage} from "../Сommons/UserMessages/MessageReducer";
import {batchActions} from 'redux-batched-actions';
import {ActionType} from "./LocationsConst";

export const showLocations = locations => ({type: ActionType.LOADED_LOCATIONS, payload: {locations}});
export const addLocation = location => ({type: ActionType.ADD_LOCATION, payload: {location}});
export const editLocation = location => ({type: ActionType.EDIT_LOCATION, payload: {location}});
export const deleteLocation = (id, location) => ({type: ActionType.DELETE_LOCATION, payload: id});

export const LocationService = {

  getLocations: () => {
    return dispatch => {
      getAll("locations").then(locations => {
        setTimeout(() => [
          dispatch(showLocations(locations))
        ], 1200);
      }).catch(error=>dispatch(setError(error.message, "danger")));
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
  }

};