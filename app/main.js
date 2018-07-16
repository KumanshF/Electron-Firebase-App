const electron = require('electron')
const path = require('path');
const url = require('url');

const {app, BrowserWindow, Menu} = electron;

let win;

function createWindow(){
  //create browser window
  win = new BrowserWindow({
    frame:false,
    width:800,
    heigth:600,
    backgroundColor:'#28197c'
  });

  //load html
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol:'file:',
    slashes: true
  }));


  win.on('closed', () => {
    win = null;
  });
}

//Run create window function
app.on('ready', createWindow);

//quit when all windows are closed
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
