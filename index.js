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
    width: size.width/1.25,
    height: size.height/1.25,
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
        label: 'Vimmy',
        accelerator: 'Esc',
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
    },
  {
    label: 'Edit',
    submenu: [
      {
        label: 'Undo',
        accelerator: 'CmdOrCtrl+Z',
        role: 'undo'
      },
      {
        label: 'Redo',
        accelerator: 'Shift+CmdOrCtrl+Z',
        role: 'redo'
      },
      {
        type: 'separator'
      },
      {
        label: 'Cut',
        accelerator: 'CmdOrCtrl+X',
        role: 'cut'
      },
      {
        label: 'Copy',
        accelerator: 'CmdOrCtrl+C',
        role: 'copy'
      },
      {
        label: 'Paste',
        accelerator: 'CmdOrCtrl+V',
        role: 'paste'
      },
      {
        label: 'Select All',
        accelerator: 'CmdOrCtrl+A',
        role: 'selectall'
      }
    ]}
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
