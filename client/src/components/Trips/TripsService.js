import {getAll, add, update, remove} from "../../api/api";
import {showTrips, addTrip, editTrip, deleteTrip} from "./TripsReducer";
import {deleteCustomerTripsId} from "../Customers/CustomersReducer";
import {setError, setMessage} from "../Сommons/UserMessages/MessageReducer";

export const TripsService = {
  getTrips: () => {
    return dispatch => {
      getAll("trips").then(trips => {
        setTimeout(() => [
          dispatch(showTrips(trips)),
          dispatch(setMessage(`Data was successfully loaded.`, "success"))
        ], 1200)
      }).catch(error => dispatch(setError(error.message, "danger")));
    };
  },

  onSaveTrip: trip => {
    return dispatch => {
      const promise = trip.id
        ? update("trips", trip.id, trip).then(trip => [
          dispatch(editTrip(trip)), dispatch(setMessage(`${trip.tripName} was successfully edited.`, "success"))
        ])
        : add("trips", trip).then(trip => [
          dispatch(addTrip(trip)), dispatch(setMessage(`${trip.tripName} was successfully add.`, "success"))
        ]);
      promise.catch(error =>
        dispatch(setError(error.message, "danger"))
      )
    }
  },

  onDeleteTrip: (id, tripName) => {
    return dispatch => {
      remove("trips", id).then(id => [
        dispatch(deleteTrip(id)), dispatch(setMessage(`${tripName} was successfully deleted.`, "success")),
        dispatch(deleteCustomerTripsId(id))
      ]).catch(error => dispatch(setError(error.message, "danger")));
    }
  }
};
