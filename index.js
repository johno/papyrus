'use strict'

const path = require('path')
const electron = require('electron')
const isPresent = require('is-present')

const css = require('./css')
const stripCss = require('./strip-css')
const windows = []

const style = css()

electron.app.on('ready', () => {
  const screen = electron.screen
  const size = screen.getPrimaryDisplay().workAreaSize

  let win = new electron.BrowserWindow({
    title: 'Papyrus',
    width: size.width/2,
    height: size.height/2,
    titleBarStyle: 'hidden-inset'
  })

  const defUrl = path.join('file://', __dirname, 'index.html')
  win.loadURL(defUrl)

  win.webContents.executeJavaScript(stripCss(style))
  
  win.on('closed', () => {
    const i = windows.indexOf(win)
    if (i !== -1) windows.splice(i, 1)
    win = null
  })

  windows.push(win)
})
