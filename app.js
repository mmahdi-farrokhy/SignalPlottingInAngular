const {
  app,
  BrowserWindow
} = require('electron')

let appWindow

function createWindow() {
  appWindow = new BrowserWindow({
      width: 1500,
      height: 1500
  })
  appWindow.loadFile('dist/browser/index.html')

  appWindow.on('close', function () {
      appWindow = null
  })
}

app.whenReady().then(() => {
  createWindow()
})
