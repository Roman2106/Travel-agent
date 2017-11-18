import {getAll, add, update, remove} from "../../api/api";
import {setError, setMessage} from "../Commons/UserMessages/MessageReducer";
import {batchActions} from 'redux-batched-actions';
import {ActionType} from "./TripsConst";

export const showTrips = trips => ({type: ActionType.LOADED_TRIPS, payload: {trips}});
export const addTrip = trip => ({type: ActionType.ADD_TRIP, payload: {trip}});
export const editTrip = trip => ({type: ActionType.EDIT_TRIP, payload: {trip}});
export const deleteTrip = (id, trip) => ({type: ActionType.DELETE_TRIP, payload: id});
export const changeSortOrder = field => ({type: ActionType.CHANGE_SORT_ORDER_TRIPS, payload: {field}});
export const removeClass = tripId =>({type: ActionType.REMOVE_CLASS, payload: {tripId}});

export const TripsActionCreators = {

  getTrips: () => {
    return dispatch => {
      getAll("trips").then(trips => {
        dispatch(showTrips(trips));
      }).catch(error => dispatch(setError(error.message, "danger")));
    };
  },

  onSaveTrip: trip => {
    return dispatch => {
      const promise = trip.id
        ? update("trips", trip.id, trip).then(trip =>
          dispatch(batchActions([editTrip(trip), setMessage(`${trip.tripName} was successfully edited.`, "success")]))
        )
        : add("trips", trip).then(trip =>
          dispatch(batchActions([addTrip(trip), setMessage(`${trip.tripName} was successfully add on the last page.`, "success")]))
        );
      promise.catch(error =>
        dispatch(setError(error.message, "danger"))
      )
    }
  },

  onDeleteTrip: (id, tripName) => {
    return dispatch => {
      remove("trips", id).then(id =>
        dispatch(batchActions([deleteTrip(id), setMessage(`${tripName} was successfully deleted.`, "success")]))
      ).catch(error => dispatch(setError(error.message, "danger")));
    }
  },

  onRemoveClass: tripId =>{
    return dispatch =>{
      dispatch(removeClass(tripId))
    }
  },

  onSortChangeTrips: field =>{
    return dispatch =>{
      dispatch(changeSortOrder(field))
    }
  }

};
