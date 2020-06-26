/* eslint global-require: off, no-console: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `yarn build` or `yarn build-main`, this file is compiled to
 * `./app/main.prod.js` using webpack. This gives us some performance wins.
 */
import path from 'path';
import fs from 'fs';
import { app, BrowserWindow, ipcMain } from 'electron';
import { up, down } from './server/data/migrations/20200130161232_emails';
import db from './server/data/dbConfig';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import MenuBuilder from './menu';
import server from './server/api/server';
import { IpcServer } from 'ipc-express';
import * as Users from './server/api/users/user-model';
import * as SA from './server/api/sentiment_analysis/sa-model';

const exec = require('child_process').execFile;
const pyPort = require('child_process').spawn;
let pyProc;

const ipc = new IpcServer(ipcMain);

// export default class AppUpdater {
//   constructor() {
//     log.transports.file.level = 'info';
//     // autoUpdater.logger = log;
//     // autoUpdater.checkForUpdatesAndNotify();
//   }
// }

const createPyProc = () => {
  if (process.env.NODE_ENV === 'production') {
    pyProc = exec(path.join(app.getAppPath(), '..', 'zero_app/zero_app.exe'));
    if (pyProc != null) {
      console.log('child process success');
    }
  } else {
    pyProc = pyPort('python', [
      path.join(__dirname, 'search_app/zero_app.py'),
      4242
    ]);
    if (pyProc != null) {
      console.log('child process success');
    }
  }
};

let mainWindow: BrowserWindow | null = null;
// Path to users database file
const dbUserDataPath = path.join(app.getPath('userData'), 'prodemails.db3');

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
  try {
    // check if database does not exist
    if (!fs.existsSync(dbUserDataPath)) {
      console.log('file is not here');
      console.log(path.join(app.getAppPath(), '..', 'prodemails.db3'));
      // check if electron's APPDATA path does not exist
      if (!fs.existsSync(app.getPath('userData'))) {
        console.log('Making dir: ', app.getPath('userData'));
        fs.mkdirSync(app.getPath('userData'));
      }
      // copy database template to APPDATA location
      fs.copyFileSync(
        path.join(app.getAppPath(), '..', 'prodemails.db3'),
        path.join(dbUserDataPath)
      );
    } else {
      // query database to make sure it has tables
      Users.findUser(1)
        .then(id => {
          console.log('do nothing');
        })
        .catch(err => {
          // overwrite prodemails.db3 with the database template
          fs.copyFileSync(
            path.join(app.getAppPath(), '..', 'prodemails.db3'),
            path.join(dbUserDataPath)
          );
        });
      SA.findById(1)
        .then(sa => {
          console.log('do nothing');
        })
        .catch(err => {
          fs.copyFileSync(
            path.join(app.getAppPath(), '..', 'prodemails.db3'),
            path.join(dbUserDataPath)
          );
        });
    }
  } catch (error) {
    console.log(error);
  }
}

if (
  process.env.NODE_ENV === 'development' ||
  process.env.DEBUG_PROD === 'true'
) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];

  return Promise.all(
    extensions.map(name => installer.default(installer[name], forceDownload))
  ).catch(console.log);
};

const createWindow = async () => {
  if (
    process.env.NODE_ENV === 'development' ||
    process.env.DEBUG_PROD === 'true'
  ) {
    await installExtensions();
  }

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728,
    webPreferences:
      process.env.NODE_ENV === 'development' || process.env.E2E_BUILD === 'true'
        ? {
            nodeIntegration: true
          }
        : {
            preload: path.join(__dirname, 'dist/renderer.prod.js')
          }
  });

  ipc.listen(server);
  mainWindow.loadURL(`file://${__dirname}/app.html`, { userAgent: 'Chrome' });

  // @TODO: Use 'ready-to-show' event
  //        https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event
  mainWindow.webContents.on('did-finish-load', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
      mainWindow.focus();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  // new AppUpdater();
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
    pyProc.kill();
  }
});

app.on('ready', createWindow);
app.on('ready', createPyProc);

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow();
});
