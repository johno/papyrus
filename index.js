'use strict'

const path = require('path')
const electron = require('electron')
const isPresent = require('is-present')

const Menu = electron.Menu
const windows = []

electron.app.on('ready', () => {
  const screen = electron.screen
  const size = screen.getPrimaryDisplay().workAreaSize

  let win = new electron.BrowserWindow({
    title: 'Papyrus',
    width: size.width/2,
    height: size.height/2,
    titleBarStyle: 'hidden-inset'
  })

  Menu.setApplicationMenu(Menu.buildFromTemplate([
    {
      label: 'File',
      submenu: [{
        label: 'New Tab',
        accelerator: 'CmdOrCtrl+T',
        click: (item, focusedWindow) => {
          if (focusedWindow) focusedWindow.webContents.send('appmenu', 'file:new-tab')
        }
      }, {
        label: 'Close Tab',
        accelerator: 'CmdOrCtrl+W',
        click: (item, focusedWindow) => {
          if (focusedWindow) focusedWindow.webContents.send('appmenu', 'file:close-tab')
        }
      }, {
        label: 'Toggle Developer Tools',
        accelerator: 'Alt+Command+I',
        click: (item, focusedWindow) => {
          if (focusedWindow) focusedWindow.toggleDevTools()
        }
      }]
    }
  ]))

  const defUrl = path.join('file://', __dirname, 'index.html')
  win.loadURL(defUrl)
  
  win.on('closed', () => {
    const i = windows.indexOf(win)
    if (i !== -1) windows.splice(i, 1)
    win = null
  })

  windows.push(win)
})
