const electron = require('electron')
const yo = require('yo-yo')

module.exports = () => {
  window.tabs = []

  electron.ipcRenderer.on('appmenu', (ev, type) => {
    alert(type)
  })
}
