const electron = require('electron')
const yo = require('yo-yo')

const css = require('./css')
const stripCss = require('./strip-css')

const style = css()

module.exports = () => {
  window.tabs = []

  electron.ipcRenderer.on('appmenu', (ev, type) => {
    const tab = yo`<webview src="http://johnotander.com" preload="./strip-css.js"></webview`

    tab.addEventListener('dom-ready', () => {
      stripCss(style)
    })

    document.body.appendChild(tab)
  })
}
