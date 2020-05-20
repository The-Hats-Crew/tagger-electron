const url = 'https://tagger-be-dev.herokuapp.com/';
import {IpcClient} from "ipc-express";
import {ipcRenderer} from "electron"
const ipc = new IpcClient(ipcRenderer)
export const SET_ANALYTICS_BAR = "SET_ANALYTICS_BAR";
export const SET_ANALYTICS_BAR_CONTACT = 'SET_ANALYTICS_BAR_CONTACT';

export const setAnalyticsBar = () => dispatch => {
    dispatch({
        type: SET_ANALYTICS_BAR
    });
};

export function setAnalyticsBarContact(email){
    return function (dispatch){
        return ipc
                .post(`/emails/analytics`, {address:email})
                .then(res => {
                    dispatch({
                        type: SET_ANALYTICS_BAR_CONTACT,
                        payload: {meta:res.data, address:email}
                    })
                })
                .catch(err => console.log(err))
    }
}
