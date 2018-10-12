'use string'

import {app, BrowserWindow, net} from 'electron'
import devtools from './devtools'
import {setIpcMain,save_data} from './ipcMainEvents'

global.win //eslint-disable-line
if (process.env.NODE_ENV === 'development') {
  devtools()
}

app.on('before-quit', () => {
  console.log('saliendo..')
})

app.on('ready', () => {
  global.win = new BrowserWindow({
    width: 800,
    height: 600,
    title: 'Dcelis',
    center: true,
    maximizable: true,
    autoHideMenuBar:false, 
    show: false
  })

  setIpcMain(global.win)
  

  global.win.once('ready-to-show', () => {
    win.show()
  })

  global.win.on('move', () => {
    // const position = win.getPosition()
    // console.log(`la posiocion es ${position}`)
  })
  global.win.on('closed', () => {
    global.win = null
    save_data()
    app.quit()
  })

  global.win.loadURL(`file://${__dirname}/renderer/index.html`)
  global.win.toggleDevTools()
})

// app.quit()
