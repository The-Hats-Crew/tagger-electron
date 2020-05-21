import {IpcClient} from 'ipc-express';
import {ipcRenderer} from 'electron';

const ipc = new IpcClient(ipcRenderer);

module.exports = ipc;
