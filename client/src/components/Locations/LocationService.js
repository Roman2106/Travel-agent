import {getAll, add, update, remove} from "../../api/api";
import {showLocations, addLocation, editLocation, deleteLocation} from "./LocationsReducer";
import {setError, setMessage} from "../Сommons/UserMessages/MessageReducer";

export const LocationService = {

  getLocations: () => {
    return dispatch => {
      getAll("locations").then(locations => {
        setTimeout(() => [
          dispatch(showLocations(locations)), dispatch(setMessage(`Data was successfully loaded.`, "success"))
        ], 1200);
      }).catch(error=>dispatch(setError(error.message, "danger")));
    }
  },

  onSaveLocation: location => {
    return dispatch => {
      const promise = location.id
        ? update("locations", location.id, location).then(location => [
          dispatch(editLocation(location)), dispatch(setMessage(`${location.country} - ${location.city} was successfully edited.`, "success"))
        ])
        : add("locations", location).then(location => [
          dispatch(addLocation(location)), dispatch(setMessage(`${location.country} - ${location.city} was successfully add.`, "success"))
        ]);
      promise.catch(error =>
        dispatch(setError(error.message, "danger"))
      )
    }
  },

  onDeleteLocation: (id, location) => {
    return dispatch => {
      remove("locations", id).then(id => [
        dispatch(deleteLocation(id)), dispatch(setMessage(`${location.country} - ${location.city} was successfully deleted.`, "success"))
      ]).catch(error => dispatch(setError(error.message, "danger")));
    }
  }

};