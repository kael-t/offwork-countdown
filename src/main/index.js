import { app, BrowserWindow, ipcMain, globalShortcut } from 'electron' // eslint-disable-line

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\') // eslint-disable-line
}

let mainWindow;
const winURL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:9080'
  : `file://${__dirname}/index.html`;

function createWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 300,
    useContentSize: true,
    width: 300,
  });

  mainWindow.loadURL(winURL);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', () => {
  if (mainWindow == null) {
    createWindow();
  }
  globalShortcut.register('CommandOrControl+Shift+L', () => {
    const focusWin = BrowserWindow.getFocusedWindow();
    if (focusWin) {
      focusWin.toggleDevTools();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on('open-alert-dialog', (event, reachTime, setTime) => {
  const winURL = process.env.NODE_ENV === 'development'
    ? 'http://localhost:9080#alert'
    : `file://${__dirname}/index.html#alert`;
  let win = new BrowserWindow({
    height: 231,
    width: 424,
    frame: false,
    titleBarStyle: 'hidden',
    // resizable: false,
  });
  win.loadURL(`${winURL}?reach=${reachTime}`);
  win.on('closed', () => {
    win = null;
  });
  win.webContents.on('did-finish-load', () => {
    win.webContents.send('alert-message', setTime);
  });
  return win;
});
