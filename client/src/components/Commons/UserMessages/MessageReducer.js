const ActionType = {
  SET_MESSAGE: "Message/SET_MESSAGE",
  SET_ERROR: "Message/SET_ERROR",
  CLEAR_MESSAGE: "Message/CLEAR_MESSAGE"
};

const initialState = null;

export const setMessage = (message, type) =>({
  type: ActionType.SET_MESSAGE,
  payload: {
    message,
    type
  }
});

export const setError = (message, type) =>({
  type: ActionType.SET_ERROR,
  payload: {
    message,
    type
  }
});

export const clearMessage = (message, type) =>({
  type: ActionType.CLEAR_MESSAGE,
  payload: {
    message: null,
    type: null
  }
});

export const MessagesReducer = (state = initialState, action) =>{
  switch (action.type){
    case ActionType.SET_MESSAGE:
      return {...state, message: action.payload.message, type: action.payload.type};
    case ActionType.SET_ERROR:
      return {...state, message: action.payload.message, type: action.payload.type};
    case ActionType.CLEAR_MESSAGE:
      return null;
    default:
      return state;
  }
};
