const electron = require('electron')
const stripCss = require('./strip-css')
const windows = []

const style = `
  html, body {
    margin-top: 20px;
    font-size: 18px !important;
    color: tomato !important;
    background-color: rebeccapurple;
  }

  svg { width: 1rem; }

  h1 {
    font-size: 8rem !important;
  }
`

electron.app.on('ready', () => {
  const screen = electron.screen
  const size = screen.getPrimaryDisplay().workAreaSize

  let win = new electron.BrowserWindow({
    title: 'Papyrus',
    width: size.width/2,
    height: size.height/2,
    titleBarStyle: 'hidden-inset'
  })

  win.loadURL('http://mrmrs.cc')


  win.webContents.executeJavaScript(stripCss(style))
  
  win.on('closed', () => {
    const i = windows.indexOf(win)
    if (i !== -1) windows.splice(i, 1)
    win = null
  })

  windows.push(win)
})
