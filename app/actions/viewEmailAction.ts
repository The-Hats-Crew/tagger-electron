import axios from "axios";
import {ipcRenderer} from 'electron';
import {IpcClient} from 'ipc-express';
const ipc = new IpcClient(ipcRenderer)
const url = process.env.REACT_APP_BACKENDURL
    ? process.env.REACT_APP_BACKENDURL
    : "https://tagger-be-dev.herokuapp.com/";

export const VIEW_EMAIL = 'VIEW_EMAIL';
export const CLOSE_EMAIL = 'CLOSE_EMAIL';

export function viewEmail(id) {
    return function(dispatch){
        return ipc
                .get(url + `emails/email/${id}`)
                .then(res => {
                    dispatch({type:VIEW_EMAIL, payload: res.data[0]})
                })
                .catch(err => {
                    dispatch({type:VIEW_EMAIL, payload:err})
                })
    }
}

export const closeEmail = () => (dispatch) => {
    dispatch({type:CLOSE_EMAIL})
}
