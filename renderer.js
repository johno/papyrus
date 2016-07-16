const electron = require('electron')
const yo = require('yo-yo')

const css = require('./css')
const stripCss = require('./strip-css')

const style = css()

module.exports = () => {
  window.tabs = []

  electron.ipcRenderer.on('appmenu', (ev, type) => {
    const tab = yo`<webview src="http://johnotander.com" style="height: 100%"></webview>`

    tab.addEventListener('dom-ready', () => {
      tab.executeJavaScript(stripCss(style))
      const papyrusInit = document.getElementById('papyrus-init')
      papyrusInit.parentNode.removeChild(papyrusInit)
    })

    document.body.appendChild(tab)
  })
}
