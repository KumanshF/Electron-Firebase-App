const {app, BrowserWindow} = require('electron')
const path = require('path');
const url = require('url');

let win;

function createWindow () {
    // Create the browser window.
    win = new BrowserWindow({
      width: 800, 
      height: 600,
      frame: false,
      resizable: false,
      backgroundColor: '#384B5F'
    })

    /*win.loadFile('dist/chatApp/index.html')*/
    win.loadURL(url.format({
      protocol: 'file:',
      pathname: path.join(__dirname, './dist/chatApp/index.html'),
      slashes:  true,
      baseUrl: 'dist'
    }));
   
    win.on('closed', () => {
      win = null
    })

    win.once('ready-to-show', () => {
      win.show()
    })
}
  
app.on('ready', createWindow)


app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
})
  
app.on('activate', () => {
   if (win === null) {
     createWindow()
   }
})
 