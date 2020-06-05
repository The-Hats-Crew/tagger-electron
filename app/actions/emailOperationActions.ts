export const SET_EMAIL_OPERATION = 'SET_EMAIL_OPERATION';
export const DISCARD = 'DISCARD';
export const CHECKING_NEW_MAIL_START = "CHECKING_NEW_MAIL_START";
export const CHECKING_NEW_MAIL_SUCCESS = "CHECKING_NEW_MAIL_SUCCESS";
export const CHECKING_NEW_MAIL_FAILED = "CHECKING_NEW_MAIL_SUCCESS";

import {SET_LAST_UID} from ".";

import {IpcClient} from 'ipc-express';
import {ipcRenderer} from 'electron';
const ipc = new IpcClient(ipcRenderer);


export const setEmailOperation = operation => dispatch => {
    dispatch({ type:SET_EMAIL_OPERATION, payload:operation });
}

export const discard = () => dispatch => {
    dispatch({ type:DISCARD })
}

export const checkNewMail = (lastMessageId = null, token) => dispatch => {
  dispatch({type: CHECKING_NEW_MAIL_START});
  ipc.post("/emails?lastMessageId=" + lastMessageId, {
    id_token: token
  })
    .then(res => {
      console.log("LAST UID*******", res.data)
      if(res.data.success){
        dispatch({type: CHECKING_NEW_MAIL_SUCCESS})
        dispatch({type: SET_LAST_UID, payload: res.data.lastUid})
      } else {
        console.error(res.data.error)
        dispatch({type: CHECKING_NEW_MAIL_FAILED})
        dispatch({type: SET_LAST_UID, payload: res.data.lastUid})
      }
    })
}
