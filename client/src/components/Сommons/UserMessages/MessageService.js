import {clearMessage} from "./MessageReducer";

export const MessagesService = {
  delMessage: ()=>{
    return dispatch =>{
      dispatch(clearMessage());
    }
  }
};
