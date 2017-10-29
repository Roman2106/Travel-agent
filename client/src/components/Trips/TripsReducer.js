import {ActionType} from "./TripsConst";

const initialState = {
  listTrips: [],
  listLocations: [],
  showLoading: true
};

export const showTrips = trips => ({type: ActionType.LOADED_TRIPS, payload: {trips}});
export const addTrip = trip => ({type: ActionType.ADD_TRIP, payload: {trip}});
export const editTrip = trip => ({type: ActionType.EDIT_TRIP, payload: {trip}});
export const deleteTrip = (id, trip) => ({type: ActionType.DELETE_TRIP, payload: id});

export const TripsReducer = (state = initialState, action) => {
  switch (action.type) {

    case ActionType.LOADED_TRIPS:
      return {
        ...state, listTrips: action.payload.trips, showLoading: false
      };

    case ActionType.ADD_TRIP:
      let newTrips = state.listTrips.concat([]);
      newTrips.push(action.payload.trip);
      return {
        ...state, listTrips: newTrips
      };

    case ActionType.EDIT_TRIP:
      let editTrips = state.listTrips.concat([]);
      // console.log(action.payload.trip.id);
      let index = editTrips.findIndex(item => item.id === action.payload.trip.id);
      editTrips.splice(index, 1, action.payload.trip);
      return {
        ...state, listTrips: editTrips
      };

    case ActionType.DELETE_TRIP:
      let newTripsList = state.listTrips.concat([]);
      let index1 = newTripsList.findIndex(item => item.id === action.payload.id);
      newTripsList.splice(index1, 1);
      return{
        ...state, listTrips: newTripsList
      };

    default:
      return state;
  }
};


// case ActionType.LOADED_TRIPS: {
//   return {...state, listTrips: action.payload.trips}
// }
// case ActionType.ADD_TRIP:
// return {
//   ...state,
//   trips: state.trips.concat({...action.payload.trip})
// };
// case ActionType.DELETE_TRIP: {
//   const index = state.trips.findIndex(trip => trip.id === action.payload.tripId);
//   return {
//     ...state,
//     trips: [
//       ...state.trips.slice(0, index),
//       ...state.trips.slice(index + 1)
//     ]
//   };
// }
// case ActionType.EDIT_TRIP: {
//   const index = state.trips.findIndex(trip => trip.id === action.payload.trip.id);
//   return {
//     ...state,
//     trips: [
//       ...state.trips.slice(0, index),
//       action.payload.trips,
//       ...state.trips.slice(index + 1)
//     ]
//   };
// }
//
// case ActionType.SET_LOADING: {
//   return {...state, isLoading: action.payload.isLoading}
// }
