export const SET_EMAIL_OPERATION = 'SET_EMAIL_OPERATION';
export const DISCARD = 'DISCARD';
export const CHECKING_NEW_MAIL_START = "CHECKING_NEW_MAIL_START";
export const CHECKING_NEW_MAIL_SUCCESS = "CHECKING_NEW_MAIL_SUCCESS";
export const CHECKING_NEW_MAIL_FAILED = "CHECKING_NEW_MAIL_SUCCESS";

import {IpcClient} from 'ipc-express';
import {ipcRenderer} from 'electron';
const ipc = new IpcClient(ipcRenderer);


export const setEmailOperation = operation => dispatch => {
    dispatch({ type:SET_EMAIL_OPERATION, payload:operation });
}

export const discard = () => dispatch => {
    dispatch({ type:DISCARD })
}

export const checkNewMail = () => dispatch => {
  dispatch({type: CHECKING_NEW_MAIL_START});
  ipc.get("/emails")
    .then(res => {
      if(res.data === true){
        dispatch({type: CHECKING_NEW_MAIL_SUCCESS})
      } else {
        console.error("something went wrong")
        dispatch({type: CHECKING_NEW_MAIL_FAILED})
      }
    })
}
