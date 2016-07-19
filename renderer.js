const electron = require('electron')
const yo = require('yo-yo')
const normalizeUrl = require('normalize-url')

const css = require('./css')
const stripCss = require('./strip-css')

const style = css()

module.exports = () => {
  window.tabs = []

  electron.ipcRenderer.on('appmenu', (ev, type) => {
    let tab = yo`
      <input id="cmd"
        style="position: fixed; bottom: 0; left: 0; right: 0; width: 100%; background-color: black; color: white; padding: 1rem;"
        placeholder=":go johno.in"
      />`

    document.body.appendChild(tab)
    tab = document.getElementById('cmd')
    tab.focus()

    tab.addEventListener('keyup', ev => {
      if (ev.keyCode === 13) {
        const url = tab.value.replace(/:go /, '')
        const newTab = yo`<webview class="papyrus-tab" src="${normalizeUrl(url)}" style="height: 100%"></webview>`
        newTab.addEventListener('dom-ready', () => {
          let prev = document.querySelectorAll('.papyrus-tab')
          const papyrusInit = document.getElementById('papyrus-init')
          papyrusInit && papyrusInit.parentNode.removeChild(papyrusInit)

          if (prev.length > 1) {
            prev = prev[0]
            prev && prev.parentNode.removeChild(prev)
          }

          tab.parentNode.removeChild(tab)
        })

        document.body.appendChild(newTab)
      }
    })
  })
}
