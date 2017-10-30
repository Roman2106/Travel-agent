import {clearMessage, setMessage} from "./MessageReducer";

export const MessagesService = {
  showMessage: (message, type)=>{
    return dispatch =>{
      dispatch(setMessage(message, type));
    }
  },

  delMessage: ()=>{
    return dispatch =>{
      dispatch(clearMessage());
    }
  }
};
