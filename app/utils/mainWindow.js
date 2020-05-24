const _ = require('lodash');
const { BrowserWindow } = require('electron');
const path = require('path');

module.exports = (options = {}) => {
  _.defaultsDeep(options, {
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

  let win = new BrowserWindow(options);
  win.on('closed', () => {
    win = null;
  });
  return win;
};
